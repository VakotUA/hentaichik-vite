import List from '@components/List'
import Post from '@components/Post'
import { useGetPostsQuery } from '@modules/api/Post'
import { Post as IPost } from '@modules/models/Post'
import { useAppSelector } from '@modules/store/hooks'
import { useEffect, useState } from 'react'

// BUG: posts not loaded on page or tags update sometimes
const Posts: React.FC = () => {
  const tags = useAppSelector((state) => state.tags.value)

  const [page, setPage] = useState<number>(1)
  const [posts, setPosts] = useState<IPost[]>([])

  const { data, error, isLoading } = useGetPostsQuery({
    tags: tags ? tags.join(' ') : '',
    limit: 32,
    page: page,
  })

  useEffect(() => {
    if (data)
      setPosts((current) => [
        ...current,
        ...data
          // remove if no file
          .filter((post) => post.file_url || post.large_file_url || post.preview_file_url),
      ])
  }, [data])

  useEffect(() => {
    setPosts([])
    setPage(1)
  }, [tags])

  if (error) console.error(error)

  if (isLoading) return <h3 style={{ marginTop: 80, padding: 16 }}>Loading...</h3>

  return (
    <List
      data={posts}
      next={() => setPage((prev) => prev + 1)}
      render={(item: IPost) => <Post post={item} />}
    />
  )
}

export default Posts
