import { Post } from '@modules/models/Post'

export const isMedia = (post?: Post): boolean =>
  !!post?.file_url || !!post?.large_file_url || !!post?.preview_file_url
