import axios from 'axios';
import { useEffect, useState } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export interface Comment {
  id: string;
  content: string;
  status: 'approved' | 'rejected' | 'pending';
}

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

export default function PostList() {
  const [posts, setPosts] = useState({});

  async function fetchPosts() {
    const res = await axios.get('http://localhost:4002/posts');
    setPosts(res.data);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts as Post[]).map((post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>
            {post.title} {post.id}
          </h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}
