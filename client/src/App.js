import './App.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
const { v4: uuidv4 } = require('uuid');


const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
]

function wait(duration){
  return new Promise(resolve => setTimeout(resolve, duration));
}

function App() {
  console.log(POSTS)
  const queryClient = useQueryClient()
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => { return wait(1000).then(() => [...POSTS])},
  })


  // make sure you do not miss the RETURN statement in the mutationFn! The mutationFn expects a promise to be returned
  const newPostMutation = useMutation({
    mutationFn: title => {
     return wait(1000).then(() => POSTS.push({ id: uuidv4(), title}),
    )
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["posts"])
  }
  })

  if (postQuery.isLoading) return <h1>Loading</h1>
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>


  return (
    <div>
      <h1>React Query!</h1>
      {postQuery.data.map((post) => {
        return <div key={post.id}>{post.title}</div>
      })
      }

      <button disabled={newPostMutation.isLoading} onClick={() => newPostMutation.mutate("New Post")}>New Post</button>
      
    </div>
  );
}

export default App;
