import { Tag } from '@components/Tag'
import { Button } from '@components/UI/Button'
import { Post as IPost } from '@modules/models/Post'
import { useAppDispatch, useAppSelector } from '@modules/store/hooks'
import { favoriteActions } from '@modules/store/reducers/favorite'
import moment from 'moment'
import { useState } from 'react'
import { AiFillPushpin, AiOutlineDownload, AiOutlineLink, AiOutlinePushpin } from 'react-icons/ai'
import style from './style.module.scss'

interface Props {
  post: IPost
}

const Post: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch()
  const favorite = useAppSelector((state) => state.favorite.value)

  const isFavorite = favorite.includes(post.id)

  const [loading, setLoading] = useState<boolean>(true)

  const smallImage = post.preview_file_url || post.file_url || post.large_file_url
  const largeImage = post.large_file_url || post.file_url || post.preview_file_url

  const inline: { label: string; value: React.ReactNode }[] = [
    {
      label: 'Created at:',
      value: moment(post.created_at).format('YYYY.MM.DD - HH:MM'),
    },
    {
      label: 'Resolution:',
      value: `${post.image_width}x${post.image_height}`,
    },
  ]

  const block: { label: string; value: React.ReactNode }[] = [
    {
      label: 'Artist(-s):',
      value: (
        <>
          {post.tag_string_artist.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={1} />
          ))}
        </>
      ),
    },
    {
      label: 'Character(-s):',
      value: (
        <>
          {post.tag_string_character.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={4} />
          ))}
        </>
      ),
    },
    {
      label: 'Copyright(-s):',
      value: (
        <>
          {post.tag_string_copyright.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={3} />
          ))}
        </>
      ),
    },
    {
      label: 'General tags:',
      value: (
        <>
          {post.tag_string_general.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={0} />
          ))}
        </>
      ),
    },
    {
      label: 'Meta tags:',
      value: (
        <>
          {post.tag_string_meta.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={5} />
          ))}
        </>
      ),
    },
  ]

  return (
    <>
      <div className={style.Post} style={{ outline: `${isFavorite ? '4px' : 0} solid gold` }}>
        <div className={style.Image}>
          {loading && <img src={smallImage} alt="small_cover" />}
          <img src={largeImage} alt="cover" onLoad={() => setLoading(false)} />
        </div>

        <div className={style.Description}>
          <div className={style.Controls}>
            <Button className={style.Button}>
              <a href={largeImage} target="_blank">
                <AiOutlineDownload />
              </a>
            </Button>
            <Button className={style.Button}>
              <a href={post.source} target="_blank">
                <AiOutlineLink />
              </a>
            </Button>
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

          <div className={style.Info}>
            {inline.map((item, index) => (
              <div key={index} className={style.Inline}>
                <span className={style.Title}>{item.label}</span>
                <span className={style.Value}>{item.value}</span>
              </div>
            ))}

            {block.map((item, index) => (
              <div key={index} className={style.Block}>
                <span className={style.Title}>{item.label}</span>
                <span className={style.Value}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: 100 }}>
        <h1>TODO: add something here to</h1>
      </div>
    </>
  )
}

export default Post
