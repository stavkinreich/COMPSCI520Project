**Readme Instructions**

### Model Training Data

The model has been trained on a large dataset containing 1 million movies. You can find the dataset [here](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies/code).

### GitHub Data Size Limitation

Due to GitHub's data size limitations, we are unable to push the complete dataset CSV file and the trained model (.pkl file) to the repository. Instead, we have provided a temporary file containing 5000 movies for demonstration purposes.

### Model Training Process

To train the model, follow these steps:

1. Run `export_model.py`. This is a one-time process.
2. This script will generate two files:
   - `tfidf_vectorizer.pkl`
   - `cosine_sim_matrix.pkl`

These files are essential for the model training process.

### Usage in `training.py`

When running the application using `training.py`, ensure that the generated files (`tfidf_vectorizer.pkl` and `cosine_sim_matrix.pkl`) are in the same directory. These files are utilized during the training process.
