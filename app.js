import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;

    if (!username || !avatar) {
        res.status(400).send({
            erro: 'Todos os campos são obrigatórios!'
        });
        return;
    }

    usuarios.push({username, avatar});
    res.status(201).send('OK');
})

app.post('/tweets', (req, res) => {

    const username = req.headers.user;
    const avatar =  usuarios.find(usuario => usuario.username === username).avatar;
    const tweet = req.body.tweet;

    if (!tweet || !username) {
        res.status(400).send({
            erro: 'Todos os campos são obrigatórios!'
        });
        return;
    }

    tweets.push({username, avatar, tweet});
    res.status(201).send('OK');
})

app.get('/tweets', (req, res) => {
    const { page: pageStr = '1' } = req.query;
    const page = Number(pageStr);

    if (page < 1) {
        res.status(400).send({
            erro: 'Página não existente'
        })
        return;
    }

    const ultimosDezTweets = [...tweets].splice((page*10 - 10), 10);
    
    res.send(ultimosDezTweets);
});


app.get('/tweets:username', (req, res) => {
    const username = req.params.username;

    if (!usuarios.find(usuario => usuario.username === username)) {
        res.status(400).send({
            erro: 'Usuario não encontrado!'
    })
}

    const tweetsUser = tweets.filter(tweet => tweet.username === username)
    res.send(tweetsUser.reverse())
})

app.listen(5000, () => console.log('Server listening on port 5000'));