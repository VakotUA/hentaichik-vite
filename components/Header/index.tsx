import Filters from '@components/Filters'
import { Button } from '@components/UI/Button'
import classNames from 'classnames'
import { AiFillPushpin } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import style from './style.module.scss'

export interface Props {
  style?: React.CSSProperties
  className?: string
}

const Header: React.FC<Props> = (props) => {
  const navigate = useNavigate()

  return (
    <header style={props.style} className={classNames(props.className, style.Header)}>
      <Button className={style.Logo} onClick={() => navigate('')}>
        H
      </Button>

      <Filters />

      <div className={style.User}>
        {/* <Button>
          <AiFillBell />
        </Button>
        <Button>
          <AiFillMessage />
        </Button> */}
        <Button onClick={() => navigate('favorite')}>
          <AiFillPushpin />
        </Button>
      </div>
    </header>
  )
}

export default Header
