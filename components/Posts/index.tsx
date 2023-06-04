import Post from '@components/Post'
import { useGetPostsQuery } from '@modules/api/Post'
import { Post as IPost } from '@modules/models/Post'
import { useAppSelector } from '@modules/store/hooks'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry from 'react-smart-masonry-layout'
import style from './style.module.scss'

const Posts: React.FC = () => {
  const tags = useAppSelector((state) => state.tags.value)

  const [page, setPage] = useState<number>(1)
  const [posts, setPosts] = useState<IPost[]>([])

  const { data, error } = useGetPostsQuery({
    tags: tags ? tags.join(' ') : '',
    limit: 32,
    page: page,
  })

  if (error) console.error(error)

  useEffect(() => {
    if (!data) return

    const filteredData = data
      // remove if no image
      .filter((post) => post.file_url || post.large_file_url || post.preview_file_url)
      // remove if mp4 or webm
      .filter((post) => post.file_ext != 'mp4' && post.file_ext != 'webm')

    setPosts((current) => [...current, ...filteredData])
  }, [data])

  useEffect(() => {
    setPosts([])
    setPage(1)
  }, [tags])

  return (
    <InfiniteScroll
      hasMore
      next={() => setPage(page + 1)}
      dataLength={posts.length}
      loader
      scrollableTarget="scrollableDiv"
    >
      <Masonry
        breakpoints={{
          300: 2,
          600: 3,
          900: 4,
          1200: 5,
          1500: 6,
          1800: 7,
          2100: 8,
          2400: 9,
          2700: 10,
          3000: 11,
          3300: 12,
        }}
        gutter="16px"
        className={style.Masonry}
        source={posts}
        render={(item) => <Post post={item} />}
      />
    </InfiniteScroll>
  )
}

export default Posts
