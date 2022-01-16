import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({message: 'hello'})
});

app.listen(3000, () => {
    console.log('running')
});