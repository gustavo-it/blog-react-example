import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    return post.title.toLowerCase()
    .includes(searchValue.toLowerCase())
  })
  : posts;

  const hanleLoadPosts = useCallback(async (page, postsPerPage) => {
  const postsAndPhotos = await loadPosts();
    
  setPosts(postsAndPhotos.slice(page, postsPerPage));
  setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    hanleLoadPosts(0, postsPerPage);
  }, [hanleLoadPosts, postsPerPage])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts((posts) => posts);
    setPage(nextPage);
  }

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value)
  }

  return (
    <section className='container'>
    <div className='search-container'>

    
      { !!searchValue && (
          <h1>Search value: { searchValue }</h1>
      ) }

      < TextInput
      handleChange={handleChange}
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
                  onClick={loadMorePosts}
                  value={searchValue}
                  disabled={noMorePosts}
                />
      ) }
    </div>
  </section>
)
}

export default Home;
