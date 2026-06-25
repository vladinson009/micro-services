import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
  const event = req.body;
  console.log(event);

  axios
    .post('http://localhost:4000/events', event)
    .catch((res) => console.log('ERR PORT 400'));
  axios
    .post('http://localhost:4001/events', event)
    .catch((res) => console.log('ERR PORT 4001'));
  axios
    .post('http://localhost:4002/events', event)
    .catch((res) => console.log('ERR PORT 4002'));
  axios
    .post('http://localhost:4003/events', event)
    .catch((res) => console.log('ERR PORT 4003'));

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Event bus on PORT: 4005');
});
