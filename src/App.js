import './App.css';
import { Component } from 'react';
import { Posts } from './components/Posts';
import { loadPosts } from './utils/load-posts';

class App extends Component {
  state = {
    counter: 0,
    posts: []
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos});
  }


  render() {
    const { posts } = this.state;
    return (
      <section className='container'>
        <Posts posts={posts} />
      </section>
    )
  }
}

export default App;
