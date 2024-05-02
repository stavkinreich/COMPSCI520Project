const emailjs = require('@emailjs/browser');
let express = require('express');
let bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
let pg = require('pg');
const { searchMovies } = require('./search-dbs');
const PORT = 3001;

let pool = new pg.Pool({
    port: 7777,
    password: '1!Password',
    database: 'COMPSCI520DATABASE',
    host: 'compsci520databaseid.c7wqy4kmqkle.us-east-1.rds.amazonaws.com',
    user: 'COMPSCI520USR',
    ssl: {
                rejectUnauthorized: false
            }
});

let app = express();
app.use(express.json());

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
const myfunction = async function(token) {
    return new Promise(resolve => {
        pool.connect(async (err, db, done) => {
                  try {
                    const result = await db.query("SELECT email FROM \"UserToken\" WHERE token2 = $1", [token]);
                    if(result.rows.length === 1) {
                        resolve(result.rows[0]);
                    }
                  } catch (error) {
                    console.error('Error executing query:', error);
                     resolve({email: "error"});
                  }
                  done();
        });
    });
}

const getUserInfo = async function(email) {
    return new Promise(resolve => {
        pool.connect(async (err, db, done) => {
            try {
                const result = await db.query("SELECT email, password, validated, preflang, prefmov, prefgen, prefmovid FROM \"UserInfo\" WHERE email = $1", [email]);
                resolve(result);
            } catch (error) {
                console.error('Error executing query:', error);
                resolve({error: "error"});
            }
            done();
        });
    });
}

app.post('/api/changePref', async (req, res) => {
    const email = req.body.userName;
    const prefMovId = req.body.prefMovId;
    const prefMov = req.body.prefMov;
    const prefLang = req.body.prefLang;
    const prefGen = req.body.prefGen;
     pool.connect((err, db, done) => {
            if(err) {
                response.status(404).send({message: 0})
            }
            else {
                db.query("UPDATE \"UserInfo\" SET prefMovId = $2, prefMov = $3, prefLang = $4, prefGen = $5 WHERE email = $1",[email, prefMovId, prefMov, prefLang, prefGen], (err, table) => {
                    if (err) {
                        res.status(404).send({message: 1})
                    }
                    else {
                        res.status(200).send({message: 2})
                    }
                })
            }
            done();
        });
});

app.post('/api/loginUser', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const getInfo = await getUserInfo(email);
    if(getInfo.error === "error") {
        res.status(404).send({message: 0});
    }
    else if(getInfo.rows.length === 1) {
        if(getInfo.rows[0].password !== password) {
            res.status(404).send({message: 1});
        }
        else if(!getInfo.rows[0].validated) {
            res.status(404).send({message: 2});
        }
        else {
            res.status(200).send({message: 3, retObj: getInfo.rows[0]});
        }
    }
    else if(getInfo.rows.length === 0) {
        res.status(404).send({message: 1});
    }
});

app.post('/api/VerifyUser', async (req, res) => {
    const token = req.body.token;
    const result = await myfunction(token);
    if(result.email === "error") {
        res.status(404).send({message: 0});
    }
    else {
        pool.connect(async (err, db, done) => {
            if(err) {
                res.status(404).send({message: 0})
            }
            else {
                db.query("UPDATE \"UserInfo\" SET validated = true WHERE email = $1", [result.email], (err, table) => {
                    if (err) {
                        res.status(404).send({message: 1})
                    }
                    else {
                        res.status(200).send({message: 2})
                    }
                });
            }
            done();
        });
    }
});

app.post('/api/send-verification-email', (req, res) => {
    const email = req.body.email;
    const token = String.fromCharCode(97 + Math.floor(Math.random() * 26)) + crypto.randomBytes(30).toString('hex');
    var request = new Request('http://localhost:3001/api/RegistrationToken', {
                    method: 'POST',
                    headers: new Headers({'Content-Type': 'application/json'}),
                    body: JSON.stringify({email: email, token: token})
                })
                fetch(request)
                    .then(function(response) {
                        response.json()
                            .then(function(data) {
                                if(data.message === 0) {
                                    res.status(404).send({message: "trouble connecting"})
                                }
                                else if(data.message === 1) {
                                    res.status(404).send({message: "not created entry"})
                                }
                                else {
                                    res.status(200).send({message: "email send", token: token})
                                }
                            })
                    })
    });

app.post('/api/RegistrationToken', function(request, response) {
    pool.connect((err, db, done) => {
        if(err) {
            response.status(404).send({message: 0})
        }
        else {
            db.query("INSERT INTO \"UserToken\" (email, token2) VALUES($1, $2)",[request.body.email, request.body.token], (err, table) => {
                if (err) {
                    response.status(404).send({message: 1})
                }
                else {
                    response.status(200).send({message: 2})
                }
            })
        }
        done();
    });
});


app.post('/api/newUser', function(request, response) {
    pool.connect((err, db, done) => {
        if(err) {
            response.status(404).send({message: 0})
        }
        else {
            db.query("INSERT INTO \"UserInfo\" (email, password, name) VALUES($1, $2, $3)",[request.body.email, request.body.password, request.body.name], (err, table) => {
                if (err) {
                    response.status(404).send({message: 1})
                }
                else {
                    response.status(200).send({message: 2})
                }
            })
        }
        done();
    });
});

app.listen(PORT, () => console.log('Listening on port' + PORT));

app.get('/search-dbs', async (req, res) => {
    const {query} = req.query;
    if(!query) {
        return res.status(400).send({message: 'Query needed'});
    }

    try {
        const movies = await searchMovies(query);
        res.json(movies);
    } catch (error) {
        res.status(500).send({message: 'Failed to fetch films', error: error.message})
    }
});


