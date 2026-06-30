import PostCreate from './PostCreate';
import PostList from './PostList';

function App() {
  return (
    <div className="container">
      <h2>Create Post!!!</h2>
      <PostCreate />
      <hr />
      <h2>Posts</h2>
      <PostList />
    </div>
  );
}

export default App;
