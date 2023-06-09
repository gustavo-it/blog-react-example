import { PostCard } from "../PostCard"
import './styles.css'


export const Posts = ({ posts }) => {
    return (
        <div className="posts">
        {posts.map(post => 
          (
            <PostCard
              id={post.id}
              title={post.title}
              body={post.body}
              cover={post.cover}
              key={post.id}
            />
          )
        )}
      </div>
    )
}