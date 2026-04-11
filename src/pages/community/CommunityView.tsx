import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { getPost, deletePost, getComments, createComment, deleteComment, incrementViews } from '../../services/communityService'

const CATEGORY_MAP: Record<string, string> = {
  notice: '공지', free: '자유', question: '질문',
  registration: '수강신청', review: '수강후기',
}

export default function CommunityView() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [commentLoading, setCommentLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      loadPost()
      loadComments()
      incrementViews(id)
    }
  }, [id])

  async function loadPost() {
    setLoading(true)
    const { data, error: err } = await getPost(id!)
    if (err) {
      setError(err.message)
    } else {
      setPost(data)
    }
    setLoading(false)
  }

  async function loadComments() {
    const { data } = await getComments(id!)
    setComments(data || [])
  }

  async function handleDelete() {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    const { error: err } = await deletePost(id!)
    if (err) {
      setError(err.message)
    } else {
      showToast('게시글이 삭제되었습니다.', 'info')
      navigate('/community')
    }
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!commentText.trim() || !user) return

    setCommentLoading(true)
    const authorName = user.user_metadata?.display_name || user.user_metadata?.full_name || user.email?.split('@')[0] || '익명'
    const { error: err } = await createComment({
      postId: id!,
      content: commentText.trim(),
      userId: user.id,
      authorName
    })

    if (err) {
      setError(err.message)
    } else {
      setCommentText('')
      showToast('댓글이 등록되었습니다.', 'success')
      loadComments()
    }
    setCommentLoading(false)
  }

  async function handleCommentDelete(commentId: string) {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return
    const { error: err } = await deleteComment(commentId)
    if (err) {
      setError(err.message)
    } else {
      loadComments()
    }
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="community-page">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
          <div className="loading-spinner" />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="community-page">
        <div className="community-content">
          <div className="community-empty">
            <p>게시글을 찾을 수 없습니다.</p>
            <Link to="/community" className="community-back-btn">목록으로 돌아가기</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="community-page">
      <div className="community-content">
        <Link to="/community" className="community-back-btn">← 목록으로</Link>

        {error && <div className="community-error">{error}</div>}

        <div className="community-detail">
          <div className="community-detail-header">
            <span className={`community-post-category community-post-category--${post.category}`}>
              {CATEGORY_MAP[post.category] || '자유'}
            </span>
            <h2 className="community-detail-title">{post.title}</h2>
            <div className="community-detail-meta">
              <span>{post.author_name}</span>
              <span>{formatDate(post.created_at)}</span>
              <span>조회 {post.views}</span>
              {user && user.id === post.user_id && (
                <button className="community-delete-btn" onClick={handleDelete}>삭제</button>
              )}
            </div>
          </div>

          <div className="community-detail-content">
            {post.content.split('\n').map((line: string, i: number) => (
              <p key={i}>{line || '\u00A0'}</p>
            ))}
          </div>

          <div className="community-comments">
            <h3>댓글 {comments.length}개</h3>

            {comments.map((comment: any) => (
              <div className="community-comment" key={comment.id}>
                <div className="community-comment-header">
                  <span className="community-comment-author">{comment.author_name}</span>
                  <span className="community-comment-date">{formatDate(comment.created_at)}</span>
                  {user && user.id === comment.user_id && (
                    <button className="community-comment-delete" onClick={() => handleCommentDelete(comment.id)}>
                      삭제
                    </button>
                  )}
                </div>
                <div className="community-comment-body">{comment.content}</div>
              </div>
            ))}

            {user ? (
              <form className="community-comment-form" onSubmit={handleCommentSubmit}>
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="댓글을 입력하세요"
                  rows={3}
                />
                <button type="submit" disabled={commentLoading || !commentText.trim()}>
                  {commentLoading ? '등록 중...' : '댓글 등록'}
                </button>
              </form>
            ) : (
              <div className="community-login-prompt">
                <Link to="/login">로그인</Link>하면 댓글을 작성할 수 있습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
