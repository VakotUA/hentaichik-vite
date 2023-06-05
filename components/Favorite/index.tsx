import List from '@components/List'
import PostCard from '@components/PostCard'
import { useGetPostsByIDsQuery } from '@modules/api/Post'
import { Post } from '@modules/models/Post'
import { useAppSelector } from '@modules/store/hooks'
import { useEffect, useState } from 'react'

const Favorite: React.FC = () => {
  const favorite = useAppSelector((state) => state.favorite.value)
  const tags = useAppSelector((state) => state.tags.value)

  const [page, setPage] = useState<number>(1)
  const [posts, setPosts] = useState<Post[]>([])
  const [filtered, setFiltered] = useState<Post[]>([])

  const [fixedFavorite, setFixedFavorite] = useState<number[]>([])

  const { data, error, isLoading } = useGetPostsByIDsQuery(
    fixedFavorite.slice(page * 16 - 16, page * 16)
  )

  useEffect(() => {
    if (data) setPosts((prev) => [...prev, ...data])
  }, [data])

  useEffect(() => {
    // TODO: working filters
    // setFiltered(posts.filter(({ tag_string }) => tags.map((tag) => tag_string.includes(tag))))
    setFiltered(posts)
  }, [tags, posts])

  useEffect(() => {
    setFixedFavorite(favorite)
  }, [])

  if (error) console.error(error)

  if (isLoading) return <h3>Loading...</h3>

  if (!filtered.length) return <h3>{`Nothing here :(`}</h3>

  return (
    <List
      data={filtered}
      next={() => setPage((prev) => prev + 1)}
      render={(item: Post) => <PostCard post={item} />}
    />
  )
}

export default Favorite
