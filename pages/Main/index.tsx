import PostCard from '@components/Post'
import Posts from '@components/Posts'
import { useGetPostsQuery } from '@modules/api/Post'
import { Post as IPost } from '@modules/models/Post'
import { isMedia } from '@utils/isMedia'
import { useState } from 'react'

const MainPage: React.FC = () => {
  const [page, setPage] = useState<number>(1)

  const { data: posts, error } = useGetPostsQuery({
    tags: '',
    limit: 32,
    page: page,
  })

  if (error) console.error(error)

  return (
    <Posts
      data={posts?.filter((post) => isMedia(post)) || []}
      next={() => setPage((prev) => prev + 1)}
      render={(post: IPost) => <PostCard post={post} />}
    />
  )
}

export default MainPage
