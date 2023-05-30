import './styles.css'

export const PostCard = (props) => {
    // ({post})
    // ({ title, cover, body, id })
    // const { post } = propst;
    return (
        <div className='post'>
            <img key={props.cover.id} src={props.cover} alt={props.title} />
                <div key={props.id} className='post-content'>
                    <h1>{props.title}</h1>
                    <p>{props.body}</p>
                </div>
        </div>
    )
}