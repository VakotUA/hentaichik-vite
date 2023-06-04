import classNames from 'classnames'
import style from './style.module.scss'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<Props> = ({ className, children, ...other }) => {
  return (
    <button {...other} className={classNames(className, style.Button)}>
      {children}
    </button>
  )
}
