import { Button } from '@components/UI/Button'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import style from './style.module.scss'

export interface IOption {
  label: React.ReactNode
  value: string
  style?: React.CSSProperties
}

export interface Props {
  options: IOption[]
  value: string[]
  render?: (label: React.ReactNode) => React.ReactNode
  className?: string
  dropdownStyle?: React.CSSProperties
  style?: React.CSSProperties
  dropdownClassName?: string
  loading?: boolean
  limit?: number

  onInput?: (value: string) => void
  onSelect?: (selected: string[]) => void
}

export const Select: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [selected, setSelected] = useState<IOption[]>([])
  const [available, setAvailable] = useState<IOption[]>([])

  const handleRemove = (option: IOption) => {
    setSelected((prev) => prev.filter(({ value }) => value !== option.value))
    setAvailable((prev) => [...prev, option])

    props.onSelect &&
      props.onSelect(
        selected.filter(({ value }) => value !== option.value).map(({ value }) => value)
      )
  }

  const handleAdd = (option: IOption) => {
    setAvailable((prev) => prev.filter(({ value }) => value !== option.value))
    setSelected((prev) => [...prev, option])

    props.onSelect && props.onSelect([...selected, option].map((option) => option.value))
  }

  useEffect(() => {
    setSelected((prev) =>
      props.value.map((value) => {
        const existed = prev.find((option) => option.value === value)
        return existed ? existed : { label: value, value }
      })
    )
  }, [props.value])

  useEffect(() => {
    setAvailable(props.options.filter((option) => !props.value.includes(option.value)))
  }, [props.options, props.value])

  return (
    <div style={props.style} className={classNames(style.Wrapper, props.className)}>
      <div className={style.Search}>
        <input
          onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.onInput && props.onInput(event.target.value)
          }
          type="text"
          placeholder="Search"
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && (
          <Button onClick={() => setIsOpen(false)}>
            <AiOutlineClose />
          </Button>
        )}
      </div>

      <div
        style={props.dropdownStyle}
        className={classNames(props.dropdownClassName, style.Dropdown, { [style.Hidden]: !isOpen })}
      >
        <div>
          <h4>Selected - click to Remove</h4>
          <ul className={style.List}>
            <SelectList
              render={(label) => <span>{props.render ? props.render(label) : label}</span>}
              options={selected}
              onSelect={handleRemove}
            />
          </ul>
        </div>

        <div>
          <h4>Available - click to Select</h4>
          <ul className={style.List}>
            {props.limit && props.limit <= selected.length ? (
              <li>
                <span>Limit of {props.limit} exceeded</span>
              </li>
            ) : (
              <SelectList
                render={(label) => <span>{props.render ? props.render(label) : label}</span>}
                options={available}
                loading={props.loading}
                onSelect={handleAdd}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

const SelectList: React.FC<{
  options: IOption[]
  loading?: boolean
  onSelect: (option: IOption) => void
  render: (label: React.ReactNode) => React.ReactNode
}> = ({ options, loading, onSelect, render }) => {
  if (loading) {
    return <li>{render('Loading...')}</li>
  }

  if (!options || !options.length) {
    return <li>{render('Empty')}</li>
  }

  return (
    <>
      {options.map((option) => (
        <li key={option.value} style={option.style} onClick={() => onSelect(option)}>
          {render(option.label)}
        </li>
      ))}
    </>
  )
}
