import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry from 'react-smart-masonry-layout'
import style from './style.module.scss'

export interface Props {
  data: any[]
  render: (item: any) => React.ReactNode
  next: (...args: any) => void
}

const List: React.FC<Props> = ({ data, render, next }) => {
  return (
    <InfiniteScroll hasMore next={next} dataLength={data.length || 0} loader>
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

export default List
