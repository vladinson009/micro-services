import { useState, type SubmitEvent } from 'react';
import axios from 'axios';
export default function PostCreate() {
  const [title, setTitle] = useState('');

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    await axios.post('http://posts.com/posts', {
      title,
    });
    setTitle('');
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
