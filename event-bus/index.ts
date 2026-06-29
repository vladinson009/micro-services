import express from 'express';
import axios from 'axios';

const events = [] as any[];

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    console.log(event);

    axios
        .post('http://posts-clusterip-srv:4000/events', event)
        .catch((res) => console.log('ERR PORT 400'));
    axios
        .post('http://comments-srv :4001/events', event)
        .catch((res) => console.log('ERR PORT 4001'));
    axios
        .post('http://query-srv:4002/events', event)
        .catch((res) => console.log('ERR PORT 4002'));
    axios
        .post('http://moderation-srv:4003/events', event)
        .catch((res) => console.log('ERR PORT 4003'));

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Event bus on PORT: 4005');
});
