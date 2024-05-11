import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import lil_matrix
import numpy as np
import time

print(time.time())

# Load the dataset 
data = pd.read_csv("./dataset/temp.csv")

# Content-Based Filtering: Features
features = ["title", "overview", "tagline", "genres"]
content_data = data[features]

# Fill missing values with empty string
content_data = content_data.fillna("")

# Combine features into a single string
content_data["combined_features"] = content_data.apply(lambda row: ' '.join(row[features]), axis=1)

# Function to compute cosine similarity in batches
def compute_cosine_similarity_in_batches(tfidf_matrix, batch_size=1000):
    num_items = tfidf_matrix.shape[0]
    num_batches = int(np.ceil(num_items / batch_size))
    
    # Initialize an empty lil_matrix to store cosine similarities
    cosine_sim = lil_matrix((num_items, num_items), dtype=np.float32)
    
    for i in range(num_batches):
        start_idx = i * batch_size
        end_idx = min((i + 1) * batch_size, num_items)
        batch_tfidf_matrix = tfidf_matrix[start_idx:end_idx]
        
        # Compute cosine similarities for the current batch
        batch_cosine_sim = cosine_similarity(batch_tfidf_matrix, tfidf_matrix)
        cosine_sim[start_idx:end_idx] = batch_cosine_sim
        
        print(f"Computed batch {i+1}/{num_batches}")
    
    return cosine_sim

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(content_data["combined_features"])

# Calculate cosine similarity in batches
try:
    cosine_sim = compute_cosine_similarity_in_batches(tfidf_matrix)
except MemoryError:
    print("Memory Error: Unable to compute cosine similarity matrix. Try reducing batch size or using sparse matrix representation.")
    exit(1)

# Function to get content-based recommendations
def get_content_based_recommendations(movie_title, num_recommendations=5):
    # Get index of the movie in the dataset
    idx = data[data["title"] == movie_title].index[0]
    
    # Calculate similarity scores with other movies
    sim_scores = list(enumerate(cosine_sim[idx].toarray().flatten()))
    
    # Sort the movies based on similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Get top similar movies (excluding the user's favorite)
    similar_movies = sim_scores[1:num_recommendations+1]
    
    # Return recommended movie titles
    return [data.iloc[movie[0]]["title"] for movie in similar_movies]

# Function to get collaborative recommendations
def get_collaborative_recommendations(genre_preference, language_preference, favorite_movies, num_recommendations=5):
    # Filter movies based on genre and language preferences
    filtered_movies = data[data['genres'].apply(lambda x: isinstance(x, str) and any(genre in x for genre in genre_preference)) &
                          data['spoken_languages'].apply(lambda x: isinstance(x, str) and any(lang in x for lang in language_preference))]
    
    # Filter out the user's favorite movies
    filtered_movies = filtered_movies[~filtered_movies['title'].isin(favorite_movies)]
    
    # Sort movies by some collaborative filtering score (e.g., popularity or average ratings)
    sorted_movies = filtered_movies.sort_values(by='popularity', ascending=False)
    
    # Return top N recommendations
    return sorted_movies['title'].head(num_recommendations).tolist()


# Function to get hybrid recommendations
def get_hybrid_recommendations(genre_preference, language_preference, favorite_movies):
    # Get collaborative recommendations
    collab_rec = get_collaborative_recommendations(genre_preference, language_preference, favorite_movies)
    
    # Get content-based recommendations for each favorite movie
    content_rec = [get_content_based_recommendations(movie) for movie in collab_rec]
    content_rec = [item for sublist in content_rec for item in sublist]  # Flatten the list
    
    # Combine both types of recommendations
    all_recommendations = list(set(collab_rec + content_rec))
    
    return all_recommendations

# Example usage:
user_genre_preference = ["Action", "Adventure"]
user_language_preference = ["English", "French"]
user_favorite_movies = ["Inception"]

recommendations = get_hybrid_recommendations(user_genre_preference, user_language_preference, user_favorite_movies)
print("Hybrid Recommendations:")
print(recommendations)

# Export the model
# Save the TF-IDF vectorizer
with open('tfidf_vectorizer.pkl', 'wb') as file:
    pickle.dump(tfidf_vectorizer, file)

# Save the cosine similarity matrix
with open('cosine_sim_matrix.pkl', 'wb') as file:
    pickle.dump(cosine_sim, file)


print(time.time())