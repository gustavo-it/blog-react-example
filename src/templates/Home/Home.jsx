import './styles.css';
import { Component } from 'react';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    counter: 0,
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: '',
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    // console.log(nextPage);
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    console.log(nextPage, postsPerPage)
    posts.push(...nextPosts);

    this.setState({ posts: posts, page:nextPage });
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    // Se a condição for verdadeira
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase() // convertendo título em ltrs minúsculas
      .includes(searchValue.toLowerCase())
    })
    : posts;

    return (
      <section className='container'>
        {/* Convertendo em boolean com 2 sinais de negação */}
        {/* Se for uma string vazia = false; tem valor = true */}
        <div className='search-container'>

        
          { !!searchValue && (
              <h1>Search value: { searchValue }</h1>
          ) }

          < TextInput
          handleChange={this.handleChange}
          searchValue={searchValue}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={ filteredPosts } />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts</p>
        )}

        <div className='button-container'>
          { !searchValue && (
                      < Button 
                      text="Load more posts"
                      onClick={this.loadMorePosts}
                      value={searchValue}
                      disabled={noMorePosts}
                    />
          ) }
        </div>
      </section>
    )
  }
}

export default Home;
