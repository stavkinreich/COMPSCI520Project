import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import joblib

# Step 1: Data Preprocessing
def preprocess_data(df):
    # Your preprocessing steps here
    return df

# Step 2: Train Collaborative Filtering Model
def train_collaborative_model(df):
    # Pivot table for collaborative filtering
    pivot_table = df.pivot_table(index='title', columns='genres', values='vote_average').fillna(0)
    
    # Fit nearest neighbors model
    nn_model = NearestNeighbors(metric='cosine', algorithm='brute')
    nn_model.fit(pivot_table.values)
    
    # Save the model
    joblib.dump(nn_model, 'collaborative_model.pkl')

# Step 3: Train Content-Based Model
def train_content_based_model(df):
    # TF-IDF Vectorization on 'overview' column
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df['overview'])
    
    # Save the model and vectorizer
    joblib.dump(tfidf, 'tfidf_vectorizer.pkl')
    joblib.dump(tfidf_matrix, 'content_based_model.pkl')


data = pd.read_csv('./dataset/temp.csv')

# Preprocess data
data = preprocess_data(data)

# Train collaborative model
train_collaborative_model(data)

# Train content-based model
train_content_based_model(data)
