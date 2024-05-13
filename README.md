# Movie Recommendation Web Application

## Introduction

Browsing movies for the past hour but can't find anything to watch? Let AI do the work for you. Presenting our Movie Recommendation Web Application, a website where users can get movie suggestions tailored specifically to their preferences. Our service is based on a freemium model, where guest users can still access the search engine but only registered users can use our website to the fullest. This includes getting suggestions based on their watch history, preferred genre and likes/dislikes.

Here is a link to the video demo of our website: https://drive.google.com/file/d/1PcQGfui3PhkrjoZnRaEb_0OZaCXRnuOc/view?usp=sharing

## Installation Instructions

1. Download this repository from the new-filter-branch as that is the default branch in the repository.
2. Setup your own TMDB API key-token pair.
3. Run three terminals, one for the frontend, one for the backend and one for the machine learning model. 
4. In one terminal, go into the backend directory and run 

```
node database.js
```
5. In the other terminal, go into the frontend directory and run

```
npm start
```

#### GitHub Data Size Limitation

Due to GitHub's data size limitations, we are unable to push the complete dataset CSV file and the trained model (.pkl file) to the repository. Instead, we have provided a temporary file containing 5000 movies for demonstration purposes.

#### Model Training Process

To train the model, follow these steps:

1. Run `export_model.py`. This is a one-time process.
2. This script will generate two files:
   - `tfidf_vectorizer.pkl`
   - `cosine_sim_matrix.pkl`

These files are essential for the model training process.

#### Usage in `training.py`

When running the application using `training.py`, ensure that the generated files (`tfidf_vectorizer.pkl` and `cosine_sim_matrix.pkl`) are in the same directory. These files are utilized during the training process.



3. In the last terminal, go into the ml_model directory and run

```
python training.py
```
   
4. The website is now live and will return results to user queries. Any changes made to the frontend will automatically compile.

#### Run Unit Test Cases

For our test cases, we use the built in React testing library and Jest-DOM. To run our unit tests, follow the below instructions:

1. Install the necessary testing libraries
```
npm install react-scripts @testing-library/react @testing-library/jest-dom @testing-library/user-event react-router-dom react-test-renderer --save-dev
```

2. Make sure you are in the /frontend directory

3. Run the test cases
```
npm run test
```

You can view the test cases in 
```
/frontend/src/components/__tests__/components.test.js
```

## Configuration

## Datasets Used

The ML model is trained on the [TMDB Dataset](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies/code).

We are using the [TMDB API](https://developer.themoviedb.org/docs/getting-started) to support results for user queries.

We are using a PostgreSQL database hosted on AWS RDS on a VPC to store all user-related information.

## Credits

Project Leader

- Stav Kinreich

Team Members

1. Bhavik Ransubhe
2. Shyam Panigrahi
3. Erin Song
4. Nikhil Mukherjee

The CONTRIBUTION.md file can be found [here](CONTRIBUTION.md).

A big thank you to Prof. Juan and all the TAs of COMPSCI 520 for helping us complete this project.

## Future Works

1. This project can only be hosted on a local machine for the time being, so we plan on setting up a full fledged website that can be accessed by users online. We hope to host the website through AWS utilizing code-pipeline and code-deploy to pull and compile our code from GitHub and deploy our application on a beanstalk environment running on an EC2 instance. This will let us host our application on a website anyone can access. We can also host the website using other web services, such as Azure or .io.

2. We plan on introducing some of the website's functionalities as a Chrome extension, such as reading or writing reviews about a movie on the go.
