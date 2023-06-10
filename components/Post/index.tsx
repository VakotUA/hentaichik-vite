import { Button } from '@components/UI/Button'
import { Post as IPost } from '@modules/models/Post'
import { useAppDispatch, useAppSelector } from '@modules/store/hooks'
import { favoriteActions } from '@modules/store/reducers/favorite'
import { isVideo } from '@utils/isVideo'
import classNames from 'classnames'
import { useState } from 'react'
import { AiFillPushpin, AiOutlineArrowsAlt, AiOutlinePushpin } from 'react-icons/ai'
import { NavLink, generatePath } from 'react-router-dom'
import style from './style.module.scss'
export interface Props {
  post: IPost
  style?: React.CSSProperties
  className?: string
}

const Post: React.FC<Props> = (props) => {
  const { post } = props

  const dispatch = useAppDispatch()
  const favorite = useAppSelector((state) => state.favorite.value)
  const isFavorite = favorite.includes(post.id)

  const [loading, setLoading] = useState<boolean>(true)

  const smallImage = post.preview_file_url || post.file_url || post.large_file_url
  const largeImage = post.large_file_url || post.file_url || post.preview_file_url

  return (
    <div
      style={props.style}
      className={classNames(props.className, style.Post, {
        [style.Selected]: isFavorite,
      })}
    >
      <NavLink
        to={generatePath('post/:id', { id: String(post.id) })}
        className={style.Image}
        style={{
          aspectRatio: post.image_width / post.image_height,
          border: isVideo(post) ? '4px solid #2fc64388' : 'none',
        }}
      >
        {loading && <img src={smallImage} alt="small_cover" />}
        <img src={largeImage} alt="cover" onLoad={() => setLoading(false)} />

        <div className={style.Focus}>
          <AiOutlineArrowsAlt />
        </div>
      </NavLink>

      <div className={style.Menu}>
        <h4>
          {post.image_width}x{post.image_height}
        </h4>
        <Button
          className={style.Button}
          onClick={() =>
            isFavorite
              ? dispatch(favoriteActions.removeFavorite(post.id))
              : dispatch(favoriteActions.addFavorite(post.id))
          }
        >
          {isFavorite ? <AiFillPushpin /> : <AiOutlinePushpin />}
        </Button>
      </div>
    </div>
  )
}

export default Post
