import express from 'express';

const app = express();

app.use(express.json());

//middleware

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome!' });
});
app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API' });
});

export default app;
