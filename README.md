# Movie Recommendation Web Application

## Introduction

Browsing movies for the past hour but can't find anything to watch? Let AI do the work for you. Presenting our Movie Recommendation Web Application, a website where users can get movie suggestions tailored specifically to their preferences. Our service is based on a freemium model, where guest users can still access the search engine but only registered users can use our website to the fullest. This includes getting suggestions based on their watch history, preferred genre and likes/dislikes. They can also leave reviews if they so wish to help other users.

## Installation Instructions

1. Download this repository.
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

6. In the last terminal, go into the ml_model directory and run

```
python training.py
```
   
7. The website is now live and will return results to user queries. Any changes made to the frontend will automatically compile.

## Configuration

## Datasets Used

The ML model is trained on the [TMDB Dataset](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies/code).

We are using the [TMDB API](https://developer.themoviedb.org/docs/getting-started) to support results for user queries.

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
