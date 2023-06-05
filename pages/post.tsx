import Post from '@components/Post'
import { useGetPostQuery } from '@modules/api/Post'
import React from 'react'
import { useParams } from 'react-router-dom'

const SinglePostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, error } = useGetPostQuery(parseInt(id || ''))

  if (error) console.error(error)

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  if (!id || !data || error) {
    return <h3>{`Post is not exist :(`}</h3>
  }

  return (
    <section>
      <Post post={data} />
    </section>
  )
}

export default SinglePostPage
