import LayoutMain from '@components/Layouts/Main'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'

const Page: React.FC<{ page: React.ReactNode }> = ({ page }) => {
  return (
    <React.Fragment>
      <ScrollRestoration getKey={(location) => location.key} />
      <LayoutMain>{page}</LayoutMain>
    </React.Fragment>
  )
}

export default Page
