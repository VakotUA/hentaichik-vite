import classNames from 'classnames'
import style from './style.module.scss'

export interface Props extends React.HTMLProps<HTMLDivElement> {}

export const Modal: React.FC<Props> = ({ children, className, ...other }) => {
  return (
    <div className={classNames(style.Modal, className)} {...other}>
      <div className={style.Content} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
