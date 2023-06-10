import LayoutMain from '@components/Layouts/Main'
import { useAppSelector } from '@modules/store/hooks'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const Page: React.FC<{ page: React.ReactNode }> = ({ page }) => {
  const tags = useAppSelector((state) => state.tags.value)
  const [lastTags, setLastTags] = useState<string>('')

  // Restore scroll on [tags] change
  useEffect(() => {
    if (tags.join(';') === lastTags) return
    setLastTags(tags.join(';'))
    window.scrollTo(0, 0)
  }, [tags])

  // Restore scroll on [page] change
  useEffect(() => window.scrollTo(0, 0), [page])

  return (
    <LayoutMain>
      {page}
      <Outlet />
    </LayoutMain>
  )
}

export default Page
