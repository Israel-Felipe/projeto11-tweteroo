import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];
let avatar;

app.post('/sign-up', (req, res) => {
    const user = req.body;
    avatar = req.body.avatar;

    usuarios.push(user);
    res.send("OK");
})

app.post('/tweets', (req, res) => {
    const newTweet = {
        username: req.body.username,
        avatar,
        tweet: req.body.tweet
    }

    tweets.push(newTweet);
    res.send("OK");
})

app.get('/tweets', (req, res) => {

    const dezTweets = tweets.slice(-10)
    res.send(dezTweets)
})


app.get('/sign-up', (req, res) => {

    res.send(usuario)
})

app.listen(5000, () => console.log('Server listening on port 5000'));
