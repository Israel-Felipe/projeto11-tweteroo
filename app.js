import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const usuarios = [
    {
        username: 'bobesponja', 
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info'
    }
];

const tweets = [
    {
        username: 'bobesponja',
        tweet: 'eu amo o hub'
    }
];

app.post('/sign-up', (req, res) => {
    const usuario = req.body

    usuarios.push(usuario);
    res.send("OK");
})

app.post('/tweets', (req, res) => {
    const tweet = req.body

    tweets.push(tweet);
    res.send("OK");
})

app.get('/sign-up', (req, res) => {

    res.send(usuarios)
})

app.get('/tweets', (req, res) => {

    res.send(tweets)
})

app.listen(5000, () => console.log('Server listening on port 5000'));
