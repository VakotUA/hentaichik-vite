import { IOption, Select } from '@components/UI/Select'
import { useGetTagsQuery } from '@modules/api/Tag'
import useDebounce from '@modules/hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '@modules/store/hooks'
import { tagsActions } from '@modules/store/reducers/tags'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import style from './style.module.scss'

const Filter: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const tags = useAppSelector((state) => state.tags.value)
  const [search, setSearch] = useState<string>('')

  const debouncedSearch = useDebounce(search, 300)

  const { data, error, isLoading } = useGetTagsQuery(debouncedSearch)

  if (error) console.error(error)

  useEffect(() => {
    const { search } = location
    const params = new URLSearchParams(search)
    const tags = params.get('tags')?.split(';') || []
    dispatch(tagsActions.setTags(tags))
    window.scrollTo(0, 0)
  }, [location, dispatch])

  const handleSelect = (selected: string[]) => {
    const tagsQueryParam = selected.join(';')
    const currentPath = location.pathname
    const newUrl = selected.length === 0 ? currentPath : `${currentPath}?tags=${tagsQueryParam}`
    navigate(newUrl)
  }

  const options: IOption[] | undefined = data?.map((tag) => ({
    label: tag.name,
    value: tag.name,
    style: {
      border: `2px solid var(--tag-category-color-${tag.category})`,
      color: `var(--tag-category-color-${tag.category})`,
      backgroundColor: 'white',
    },
  }))

  return (
    <Select
      limit={2}
      loading={isLoading}
      className={style.Select}
      options={options || []}
      value={tags}
      onInput={(value) => setSearch(value)}
      onSelect={handleSelect}
      dropdownClassName={style.Dropdown}
    />
  )
}

export default Filter
