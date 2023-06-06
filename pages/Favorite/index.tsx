import Post from '@components/Post'
import Posts from '@components/Posts'
import { useGetPostsByIDsQuery } from '@modules/api/Post'
import { Post as IPost } from '@modules/models/Post'
import { useAppSelector } from '@modules/store/hooks'
import React, { useEffect, useState } from 'react'

const FavoritePage: React.FC = () => {
  const favorite = useAppSelector((state) => state.favorite.value)
  const tags = useAppSelector((state) => state.tags.value)

  const [page, setPage] = useState<number>(1)
  const [posts, setPosts] = useState<IPost[]>([])
  const [filtered, setFiltered] = useState<IPost[]>([])

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

  return (
    <Posts
      data={filtered}
      next={() => setPage((prev) => prev + 1)}
      render={(item: IPost) => <Post post={item} />}
    />
  )
}

export default FavoritePage
