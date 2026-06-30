import express from 'express';
import cors from 'cors';
import axios from 'axios';

type Posts = {
    [key: string]: {
        id: string;
        title: string;
        comments: {
            id: string;
            content: string;
            status: 'pending' | 'rejected' | 'approved';
        }[];
    };
};

const posts: Posts = {};

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({});
});

app.listen(4002, async () => {
    console.log('query on PORT: 4002');

    try {
        const res = await axios.get('http://event-bus-srv:4005/events');

        for (let event of res.data) {
            console.log('Processing event:', event.type);
            handleEvent(event.type, event.data);
        }
    } catch (error) {}
});

function handleEvent(type: any, data: any) {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }
    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find((comment) => comment.id === id);
        if (comment) {
            comment.status = status;
            comment.content = content;
        }
    }
}
