import { Post as IPost } from '@modules/models/Post'
import classNames from 'classnames'
import { useState } from 'react'
import { AiOutlineArrowsAlt } from 'react-icons/ai'
import style from './style.module.scss'

export interface Props {
  post: IPost
  style?: React.CSSProperties
  className?: string
}

const Post: React.FC<Props> = (props) => {
  const { post } = props

  const [loading, setLoading] = useState<boolean>(true)

  const smallImage = post.preview_file_url || post.file_url || post.large_file_url
  const largeImage = post.large_file_url || post.file_url || post.preview_file_url

  return (
    <a
      target="_blank"
      style={props.style}
      href={largeImage}
      download={`${post.id}.${post.file_ext}`}
      className={classNames(props.className, style.Post)}
    >
      <div className={style.Image} style={{ aspectRatio: post.image_width / post.image_height }}>
        {loading && <img src={smallImage} alt="small_cover" />}
        <img src={largeImage} alt="cover" onLoad={() => setLoading(false)} />

        <div className={style.Focus}>
          <AiOutlineArrowsAlt />
        </div>
      </div>

      {/* <div className={style.Menu}>
        <Button className={style.Button}>
          <a href={largeImage} download={`${post.id}.${post.file_ext}`}>
            <AiOutlineDownload />
          </a>
        </Button>
        <Button className={style.Button}>
          <AiOutlinePushpin />
        </Button>
      </div> */}
    </a>
  )
}

export default Post
