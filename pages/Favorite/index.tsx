import Post from '@components/Post'
import Posts from '@components/Posts'
import { useGetPostsByIDsQuery } from '@modules/api/Post'
import { Post as IPost } from '@modules/models/Post'
import { useAppSelector } from '@modules/store/hooks'
import { isMedia } from '@utils/isMedia'
import { useEffect, useState } from 'react'

const FavoritePage: React.FC = () => {
  const storeFavorite = useAppSelector((state) => state.favorite.value)

  const [page, setPage] = useState<number>(1)
  const [favorite, setFavorite] = useState<number[]>([])
  const { data: posts, error } = useGetPostsByIDsQuery(
    favorite.length / 32 >= page - 1 ? favorite.slice((page - 1) * 32, page * 32) : []
  )

  useEffect(() => setFavorite(storeFavorite), [])

  if (error) console.error(error)

  return (
    <Posts
      data={posts?.filter((post) => isMedia(post)) || []}
      next={() => setPage((prev) => prev + 1)}
      render={(post: IPost) => <Post post={post} />}
    />
  )
}

export default FavoritePage
