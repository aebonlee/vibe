import { supabase } from '../config/supabase'

const noSupabase = { data: null, error: { message: 'Supabase가 설정되지 않았습니다.' } }

export async function getPosts(page = 1, pageSize = 10, category: string | null = null) {
  if (!supabase) return { ...noSupabase, count: 0 }

  let query = supabase
    .from('vibe_board_posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error, count } = await query
  return { data, error, count }
}

export async function getPost(id: string) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('vibe_board_posts')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function incrementViews(id: string) {
  if (!supabase) return
  await supabase.rpc('increment_vibe_post_views', { post_uuid: id })
}

export async function createPost({ title, content, category, userId, authorName }: {
  title: string; content: string; category: string; userId: string; authorName: string
}) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('vibe_board_posts')
    .insert([{ title, content, category, user_id: userId, author_name: authorName }])
    .select()
    .single()
  return { data, error }
}

export async function deletePost(id: string) {
  if (!supabase) return noSupabase
  const { error } = await supabase
    .from('vibe_board_posts')
    .delete()
    .eq('id', id)
  return { error }
}

export async function getComments(postId: string) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('vibe_board_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  return { data, error }
}

export async function createComment({ postId, content, userId, authorName }: {
  postId: string; content: string; userId: string; authorName: string
}) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('vibe_board_comments')
    .insert([{ post_id: postId, content, user_id: userId, author_name: authorName }])
    .select()
    .single()
  return { data, error }
}

export async function deleteComment(id: string) {
  if (!supabase) return noSupabase
  const { error } = await supabase
    .from('vibe_board_comments')
    .delete()
    .eq('id', id)
  return { error }
}
