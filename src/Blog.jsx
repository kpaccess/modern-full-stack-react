import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { CreatePost } from './components/CreatePost'
import { PostList } from './components/PostList'
import { PostFilter } from './components/PostFilter'
import { PostSorting } from './components/PostSorting'
import { getPosts } from './api/posts.js'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts = postsQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Flter by:
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => sortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <br />
      <PostList posts={posts} />
    </div>
  )
}
