import pickle
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = pd.read_csv("./dataset/temp.csv")
    
with open('tfidf_vectorizer.pkl', 'rb') as file:
    tfidf_vectorizer = pickle.load(file)

with open('cosine_sim_matrix.pkl', 'rb') as file:
    cosine_sim = pickle.load(file)

# Function to get content-based recommendations
def get_content_based_recommendations(movie_title, num_recommendations=5):
    idx = data[data["title"] == movie_title].index[0]
    sim_scores = list(enumerate(cosine_sim[idx].toarray().flatten()))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)    
    similar_movies = sim_scores[1:num_recommendations+1]
    
    return [data.iloc[movie[0]]["title"] for movie in similar_movies]

# Function to get collaborative recommendations
def get_collaborative_recommendations(genre_preference, language_preference, favorite_movies, num_recommendations=5):
    filtered_movies = data[data['genres'].apply(lambda x: isinstance(x, str) and any(genre in x for genre in genre_preference)) &
                          data['spoken_languages'].apply(lambda x: isinstance(x, str) and any(lang in x for lang in language_preference))]
    
    filtered_movies = filtered_movies[~filtered_movies['title'].isin(favorite_movies)]
    
    sorted_movies = filtered_movies.sort_values(by='popularity', ascending=False)
    return sorted_movies['title'].head(num_recommendations).tolist()

# Function to get hybrid recommendations
def get_hybrid_recommendations(genre_preference, language_preference, favorite_movies):
    collab_rec = get_collaborative_recommendations(genre_preference, language_preference, favorite_movies)
    
    content_rec = [get_content_based_recommendations(movie) for movie in collab_rec]
    content_rec = [item for sublist in content_rec for item in sublist]  # Flatten the list
    all_recommendations = list(set(collab_rec + content_rec))
    
    return get_data_by_titles(all_recommendations, data)

# Function to search for titles and return corresponding ids
def get_data_by_titles(titles, dataframe):
    data_list = []
    for title in titles:
        matching_rows = dataframe.loc[dataframe['title'] == title]
        
        if not matching_rows.empty:
            for _, row in matching_rows.iterrows():
                data_list.append({
                    'poster_path': row['poster_path'],
                    'title': row['title'],
                    'overview': row['overview'],
                    'id': row['id']
                })
    return data_list

@app.route('/submit-preferences', methods=['POST'])
def submit_preferences():
    data = request.json
    selected_genres = data['selectedGenres']
    selected_languages = data['selectedLanguages']
    selected_movies = data['selectedMovies']

    processed_data = get_hybrid_recommendations(selected_genres, selected_languages, selected_movies)
    return jsonify(processed_data)

# Example usage:
# user_genre_preference = ["Action", "Adventure"]
# user_language_preference = ["English", "French"]
# user_favorite_movies = ["Inception"]

# recommendations = get_hybrid_recommendations(user_genre_preference, user_language_preference, user_favorite_movies)
# print("Hybrid Recommendations:")
# print(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=3001)