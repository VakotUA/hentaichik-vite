import { formatString } from '@utils/formatString'
import { useNavigate } from 'react-router-dom'
import style from './style.module.scss'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tag: string
  colorIndex: number
}

export const Tag: React.FC<Props> = ({ tag, colorIndex, ...other }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/?tags=${tag}`)
  }

  return (
    <button
      className={style.Tag}
      style={{ color: `var(--tag-category-color-${colorIndex}, black)` }}
      onClick={handleClick}
      {...other}
    >
      {formatString(tag)}
    </button>
  )
}
