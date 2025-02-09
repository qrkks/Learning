import { useParams } from "react-router-dom"

function Blog() {
    const { blogId: id } = useParams();
    return (
        <div>
            <h2>博客 ID: {id}</h2>
        </div>
    )
}

export default Blog
