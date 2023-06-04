export interface Tag {
  id: number
  name: string
  category: number
  post_count: number
  is_locked: boolean
  is_deprecated: boolean
  created_at: Date | string
  updated_at: Date | string
}
