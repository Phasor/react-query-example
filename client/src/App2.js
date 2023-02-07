import './App.css';
import { useState } from 'react' 
import PostsList1 from './Postlist1';
import PostsList2 from './Postlist2';
import Post from './Post';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreatePost } from './CreatePost';
import { PostListPaginated } from './PostListPaginate';


function App2() {
    const [currentPage, setCurrentPage] = useState(<PostsList1/>)
    
    return(
        <div>
            <div onClick={() => setCurrentPage(<PostsList1/>)}>
                <button>Post List 1</button>
            </div>
            <div onClick={() => setCurrentPage(<PostsList2/>)}>
                <button>Post List 2</button>
            </div>
            <div onClick={() => setCurrentPage(<Post id={1}/>)}>
                <button>First Post</button>
            </div>
            <div onClick={() => setCurrentPage(<CreatePost/>)}>
                <button>New Post</button>
            </div>
            <div onClick={() => setCurrentPage(<PostListPaginated/>)}>
                <button>Post List Paginated</button>
            </div>
            <br/>
            {currentPage}
        </div>
    )
}

export default App2;
    