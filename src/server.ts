import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ message: 'hello' }));

app.get('/teste', (req, res) => {
  res.status(200).json({ message: 'teste' });
});

app.listen(3000, () => {
  console.log('running');
});
