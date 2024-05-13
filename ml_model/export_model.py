import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import lil_matrix
import numpy as np
import time

print(f"Model start time :{time.time()}")

data = pd.read_csv("./dataset/temp.csv")

# Content-Based Filtering: Features
features = ["title", "overview", "tagline", "genres"]
content_data = data[features]
content_data = content_data.fillna("")
content_data["combined_features"] = content_data.apply(lambda row: ' '.join(row[features]), axis=1)

# Function to compute cosine similarity in batches
def compute_cosine_similarity_in_batches(tfidf_matrix, batch_size=1000):
    num_items = tfidf_matrix.shape[0]
    num_batches = int(np.ceil(num_items / batch_size))
    
    cosine_sim = lil_matrix((num_items, num_items), dtype=np.float32)
    
    for i in range(num_batches):
        start_idx = i * batch_size
        end_idx = min((i + 1) * batch_size, num_items)
        batch_tfidf_matrix = tfidf_matrix[start_idx:end_idx]
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

# Export the model
# Save the TF-IDF vectorizer
with open('tfidf_vectorizer.pkl', 'wb') as file:
    pickle.dump(tfidf_vectorizer, file)

# Save the cosine similarity matrix
with open('cosine_sim_matrix.pkl', 'wb') as file:
    pickle.dump(cosine_sim, file)

print(f"Model start time :{time.time()}")
