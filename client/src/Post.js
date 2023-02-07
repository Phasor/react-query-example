import { useQuery } from "@tanstack/react-query"
import { getPost } from "./api/posts"
import { getUser } from "./api/users"

export default function Post({ id }) {

    // in the below note our query key includes the post id so it's unique
    // also note the page is trying to render the users name, but the posts query only contains a userId
    // This is why we need to WAIT for the posts query to finish before we can make the user query
    // This is what the enabled: postQuery?.data?.userId != null does in the userQuery
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  })

    // use enabled to wait for the postQuery to finish before making the userQuery
  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery.data.userId),
  })

  if (postQuery.status === "loading") return <h1>Loading...</h1>
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>
  }

  return (
    <>
      <h1>
        {postQuery.data.title} <br />
        <small>
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data.name}
        </small>
      </h1>
      <p>{postQuery.data.body}</p>
    </>
  )
}