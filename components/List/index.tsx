import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry from 'react-smart-masonry-layout'
import style from './style.module.scss'

export interface Props {
  data: any[]
  render: (item: any) => React.ReactNode
  next: (...args: any) => void
}

// BUG: posts not loaded on page or tags update sometimes
const Posts: React.FC<Props> = ({ data, render, next }) => {
  useEffect(() => {
    next()
  }, [])

  return (
    <InfiniteScroll
      hasMore
      next={next}
      dataLength={data.length || 0}
      loader={<h3>Loading...</h3>}
      endMessage={<h3>That's all</h3>}
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
        source={data}
        render={(item) => render(item)}
      />
    </InfiniteScroll>
  )
}

export default Posts
