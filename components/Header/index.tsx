import Filters from '@components/Filters'
import { Button } from '@components/UI/Button'
import classNames from 'classnames'
import { AiFillBell, AiFillMessage, AiFillPushpin } from 'react-icons/ai'
import style from './style.module.scss'

export interface Props {
  style?: React.CSSProperties
  className?: string
}

const Header: React.FC<Props> = (props) => {
  return (
    <header style={props.style} className={classNames(props.className, style.Header)}>
      <div className={style.Logo}>H</div>

      <Filters />

      <div className={style.User}>
        <Button>
          <AiFillBell />
        </Button>
        <Button>
          <AiFillMessage />
        </Button>
        <Button>
          <AiFillPushpin />
        </Button>
      </div>
    </header>
  )
}

export default Header
