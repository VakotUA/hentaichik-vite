import { Button } from '@components/UI/Button'
import { Tag } from '@components/UI/Tag'
import { useGetPostQuery } from '@modules/api/Post'
import { useAppDispatch, useAppSelector } from '@modules/store/hooks'
import { favoriteActions } from '@modules/store/reducers/favorite'
import moment from 'moment'
import React, { useState } from 'react'
import { AiFillPushpin, AiOutlineDownload, AiOutlineLink, AiOutlinePushpin } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import style from './style.module.scss'

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, error } = useGetPostQuery(parseInt(id || ''))

  const dispatch = useAppDispatch()
  const favorite = useAppSelector((state) => state.favorite.value)

  const [loading, setLoading] = useState<boolean>(true)

  if (error) console.error(error)

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  if (!id || !data || error) {
    return <h3>{`Post is not exist :(`}</h3>
  }

  const isFavorite = favorite.includes(data.id)

  const smallImage = data.preview_file_url || data.file_url || data.large_file_url
  const largeImage = data.large_file_url || data.file_url || data.preview_file_url

  const inline: { label: string; value: React.ReactNode }[] = [
    {
      label: 'Created at:',
      value: moment(data.created_at).format('YYYY.MM.DD - HH:MM'),
    },
    {
      label: 'Resolution:',
      value: `${data.image_width}x${data.image_height}`,
    },
  ]

  const block: { label: string; value: React.ReactNode }[] = [
    {
      label: 'Artist(-s):',
      value: (
        <>
          {data.tag_string_artist.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={1} />
          ))}
        </>
      ),
    },
    {
      label: 'Character(-s):',
      value: (
        <>
          {data.tag_string_character.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={4} />
          ))}
        </>
      ),
    },
    {
      label: 'Copyright(-s):',
      value: (
        <>
          {data.tag_string_copyright.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={3} />
          ))}
        </>
      ),
    },
    {
      label: 'General tags:',
      value: (
        <>
          {data.tag_string_general.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={0} />
          ))}
        </>
      ),
    },
    {
      label: 'Meta tags:',
      value: (
        <>
          {data.tag_string_meta.split(' ').map((artist, index) => (
            <Tag key={index} tag={artist} colorIndex={5} />
          ))}
        </>
      ),
    },
  ]

  return (
    <div>
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
              <a href={data.source} target="_blank">
                <AiOutlineLink />
              </a>
            </Button>
            <Button
              className={style.Button}
              onClick={() =>
                isFavorite
                  ? dispatch(favoriteActions.removeFavorite(data.id))
                  : dispatch(favoriteActions.addFavorite(data.id))
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
    </div>
  )
}

export default PostPage
