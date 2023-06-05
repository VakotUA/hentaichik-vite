import List from '@components/List'
import PostCard from '@components/PostCard'
import { useGetPostsQuery } from '@modules/api/Post'
import { Post } from '@modules/models/Post'
import { useAppSelector } from '@modules/store/hooks'
import { useEffect, useState } from 'react'

const Posts: React.FC = () => {
  const tags = useAppSelector((state) => state.tags.value)

  const [page, setPage] = useState<number>(1)
  const [posts, setPosts] = useState<Post[]>([])

  const [tagsString, setTagsString] = useState<string>('')

  const { data, error, isLoading } = useGetPostsQuery({
    tags: tagsString,
    limit: 32,
    page: page,
  })

  useEffect(() => {
    if (!data) return

    setPosts((prevPosts) => [
      ...prevPosts,
      ...data.filter((post: Post) => post.file_url || post.large_file_url || post.preview_file_url),
    ])
  }, [data])

  useEffect(() => {
    if ((tags ? tags.join(' ') : '') == tagsString) return

    setTagsString(tags ? tags.join(' ') : '')
    setPosts([])
    setPage(1)
  }, [tags])

  if (error) console.error(error)

  if (isLoading) return <h3>Loading...</h3>

  return (
    <List
      data={posts}
      next={() => setPage((prev) => prev + 1)}
      render={(item: Post) => <PostCard post={item} />}
    />
  )
}

export default Posts
