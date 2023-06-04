import { Post } from '@modules/models/Post'

export const isVideo = ({ file_ext: extention }: Post): boolean =>
  ['mov', 'mkv', 'mp4', 'm4v', 'gif', 'avi', 'webm'].includes(extention.toLowerCase())
