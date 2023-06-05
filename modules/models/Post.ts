interface MediaAsset {
  id: number
  duration: number | null
  file_ext: string
  file_key: string
  file_size: number
  image_height: number
  image_width: number
  is_public: boolean
  md5: string
  pixel_hash: string
  status: string
  created_at: Date | string | null
  updated_at: Date | string | null
}

export interface Post {
  id: number
  uploader_id: number
  approver_id: number
  tag_string: string
  tag_string_general: string
  tag_string_artist: string
  tag_string_copyright: string
  tag_string_character: string
  tag_string_meta: string
  rating: string | null
  parent_id: number | null
  source: string
  md5: string
  file_url: string
  large_file_url: string
  preview_file_url: string
  file_ext: string
  file_size: number
  image_width: number
  score: number
  fav_count: number
  fav_count_general: number
  fav_count_artist: number
  fav_count_copyright: number
  fav_count_character: number
  fav_count_meta: number
  last_comment_bumped_at: Date | string | null
  last_noted_at: Date | string | null
  has_children: boolean
  image_height: number
  created_at: Date | string
  updated_at: Date | string
}
