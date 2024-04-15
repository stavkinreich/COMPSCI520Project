let express = require('express');
let bodyParser = require('body-parser');
let pg = require('pg');
const PORT = 3001;

let pool = new pg.Pool({
    port: 5432,
    password: 'Packdown12!',
    database: 'MyDatabase',
    host: 'localhost',
    user: 'postgres'
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.post('/api/newUser', function(request, response) {
    pool.connect((err, db, done) => {
        if(err) {
            response.status(404).send({message: 0})
        }
        else {
            db.query("INSERT INTO \"UserInfo\" (username, password, name) VALUES($1, $2, $3)",[request.body.email, request.body.password, request.body.name], (err, table) => {
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


