import Filters from '@components/Filters'
import { Button } from '@components/UI/Button'
import { useGetRandomPostQuery } from '@modules/api/Post'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { AiFillPushpin, AiOutlineSync } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import style from './style.module.scss'

export interface Props {
  style?: React.CSSProperties
  className?: string
}

const Header: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const [click, setClick] = useState<boolean>(false)
  const { data, error, refetch } = useGetRandomPostQuery()

  if (error) console.error(error)

  useEffect(() => {
    if (data && click) {
      navigate(`/post/${data.id}`)
      setClick((prev) => !prev)
    }
  }, [data, navigate, click])

  return (
    <header style={props.style} className={classNames(props.className, style.Header)}>
      <Button className={style.Logo} onClick={() => navigate('/')}>
        H
      </Button>

      <Filters />

      <div className={style.User}>
        <Button
          onClick={() => {
            setClick((prev) => !prev)
            refetch()
          }}
        >
          <AiOutlineSync />
        </Button>
        <Button onClick={() => navigate('/favorite')}>
          <AiFillPushpin />
        </Button>
      </div>
    </header>
  )
}

export default Header
