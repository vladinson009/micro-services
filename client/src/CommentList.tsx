import { useEffect, useState } from 'react';

import axios from 'axios';

export default function CommentList({ postId }: { postId: string }) {
  const [comments, setComments] = useState<{ id: string; content: string }[]>([]);

  async function fetchData() {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}
