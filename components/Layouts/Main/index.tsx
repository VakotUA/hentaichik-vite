import Header from '@components/Header'
import classNames from 'classnames'
import style from './style.module.scss'

export interface Props {
  style?: React.CSSProperties
  className?: string
  children: React.ReactNode
}

const LayoutMain: React.FC<Props> = (props) => {
  return (
    <div style={props.style} className={classNames(props.className, style.Layout)}>
      <Header />
      <div className={style.Children}>{props.children}</div>
    </div>
  )
}

export default LayoutMain
