import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../../config/supabase';
import '../../styles/admin.css';

type Tab = 'members' | 'content' | 'stats';
const PER_PAGE = 10;

interface MemberRow {
  id: string;
  display_name: string | null;
  email: string | null;
  provider: string | null;
  role: string | null;
  created_at: string | null;
  last_sign_in_at: string | null;
  visited_sites: string[] | null;
}

interface PostRow {
  id: string;
  title: string;
  author_name: string | null;
  category: string | null;
  created_at: string;
  views: number;
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('members');

  /* ── Stats ── */
  const [stats, setStats] = useState({ members: 0, posts: 0, comments: 0 });

  /* ── Members ── */
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [memberSearch, setMemberSearch] = useState('');
  const [memberPage, setMemberPage] = useState(1);
  const [memberLoading, setMemberLoading] = useState(false);

  /* ── Content ── */
  const [contentType, setContentType] = useState<'posts' | 'comments'>('posts');
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [contentSearch, setContentSearch] = useState('');
  const [contentPage, setContentPage] = useState(1);
  const [contentLoading, setContentLoading] = useState(false);

  /* ── Load Stats ── */
  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const [m, p, c] = await Promise.all([
        supabase.from('user_profiles').select('id', { count: 'exact', head: true }).contains('visited_sites', [window.location.hostname]),
        supabase.from('vibe_board_posts').select('id', { count: 'exact', head: true }),
        supabase.from('vibe_board_comments').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        members: m.count || 0,
        posts: p.count || 0,
        comments: c.count || 0,
      });
    })();
  }, []);

  /* ── Load Members ── */
  const loadMembers = useCallback(async () => {
    if (!supabase) return;
    setMemberLoading(true);
    const { data } = await supabase
      .from('user_profiles')
      .select('id, display_name, email, provider, role, created_at, last_sign_in_at, visited_sites')
      .order('created_at', { ascending: false });
    setMembers((data || []) as MemberRow[]);
    setMemberLoading(false);
  }, []);

  useEffect(() => { if (tab === 'members') loadMembers(); }, [tab, loadMembers]);

  const filteredMembers = useMemo(() => {
    if (!memberSearch.trim()) return members;
    const q = memberSearch.trim().toLowerCase();
    return members.filter(
      (m) =>
        (m.display_name || '').toLowerCase().includes(q) ||
        (m.email || '').toLowerCase().includes(q)
    );
  }, [members, memberSearch]);

  const pagedMembers = useMemo(() => {
    const start = (memberPage - 1) * PER_PAGE;
    return filteredMembers.slice(start, start + PER_PAGE);
  }, [filteredMembers, memberPage]);

  const memberTotalPages = Math.max(1, Math.ceil(filteredMembers.length / PER_PAGE));

  /* ── Load Content ── */
  const loadContent = useCallback(async () => {
    if (!supabase) return;
    setContentLoading(true);
    const table = contentType === 'posts' ? 'vibe_board_posts' : 'vibe_board_comments';
    const { data } = await supabase
      .from(table)
      .select('id, title, author_name, category, created_at, views')
      .order('created_at', { ascending: false });
    setPosts((data || []) as PostRow[]);
    setContentLoading(false);
  }, [contentType]);

  useEffect(() => { if (tab === 'content') loadContent(); }, [tab, contentType, loadContent]);

  const filteredContent = useMemo(() => {
    if (!contentSearch.trim()) return posts;
    const q = contentSearch.trim().toLowerCase();
    return posts.filter((p) => (p.title || '').toLowerCase().includes(q));
  }, [posts, contentSearch]);

  const pagedContent = useMemo(() => {
    const start = (contentPage - 1) * PER_PAGE;
    return filteredContent.slice(start, start + PER_PAGE);
  }, [filteredContent, contentPage]);

  const contentTotalPages = Math.max(1, Math.ceil(filteredContent.length / PER_PAGE));

  const handleDeletePost = async (id: string) => {
    if (!supabase) return;
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const table = contentType === 'posts' ? 'vibe_board_posts' : 'vibe_board_comments';
    await supabase.from(table).delete().eq('id', id);
    loadContent();
  };

  const fmt = (d: string | null) => {
    if (!d) return '-';
    return new Date(d).toLocaleDateString();
  };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'members', label: '회원관리', icon: '👥' },
    { key: 'content', label: '콘텐츠관리', icon: '📝' },
    { key: 'stats', label: '통계', icon: '📊' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h3>ADMIN</h3>
        <ul className="admin-nav">
          {tabs.map((t) => (
            <li key={t.key}>
              <button
                className={`admin-nav-item${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                <span>{t.icon}</span> {t.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <div className="admin-header">
          <h1>관리자 대시보드</h1>
        </div>

        {/* Stats Cards */}
        <div className="admin-dashboard-stats">
          <div className="admin-stat-card-v2">
            <div className="stat-label">총 회원수</div>
            <div className="stat-value">{stats.members.toLocaleString()}</div>
          </div>
          <div className="admin-stat-card-v2">
            <div className="stat-label">게시글</div>
            <div className="stat-value">{stats.posts.toLocaleString()}</div>
          </div>
          <div className="admin-stat-card-v2">
            <div className="stat-label">댓글</div>
            <div className="stat-value">{stats.comments.toLocaleString()}</div>
          </div>
        </div>

        {/* ── Members Tab ── */}
        {tab === 'members' && (
          <>
            <div className="admin-toolbar-v2">
              <input
                type="text"
                placeholder="이름 또는 이메일 검색..."
                value={memberSearch}
                onChange={(e) => { setMemberSearch(e.target.value); setMemberPage(1); }}
              />
            </div>
            <div className="admin-table-wrapper">
              {memberLoading ? (
                <div className="admin-empty"><div className="loading-spinner" /></div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>가입수단</th>
                      <th>역할</th>
                      <th>가입일</th>
                      <th>최근 로그인</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedMembers.length === 0 ? (
                      <tr><td colSpan={6} className="admin-empty">회원이 없습니다.</td></tr>
                    ) : pagedMembers.map((m) => (
                      <tr key={m.id}>
                        <td>{m.display_name || '-'}</td>
                        <td>{m.email || '-'}</td>
                        <td>{m.provider || 'email'}</td>
                        <td>
                          <span className={`badge ${m.role === 'admin' ? 'badge-admin' : 'badge-member'}`}>
                            {m.role || 'member'}
                          </span>
                        </td>
                        <td>{fmt(m.created_at)}</td>
                        <td>{fmt(m.last_sign_in_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {memberTotalPages > 1 && (
              <div className="admin-pagination">
                <button disabled={memberPage <= 1} onClick={() => setMemberPage(memberPage - 1)}>이전</button>
                <span>{memberPage} / {memberTotalPages}</span>
                <button disabled={memberPage >= memberTotalPages} onClick={() => setMemberPage(memberPage + 1)}>다음</button>
              </div>
            )}
          </>
        )}

        {/* ── Content Tab ── */}
        {tab === 'content' && (
          <>
            <div className="admin-toolbar-v2">
              <select value={contentType} onChange={(e) => { setContentType(e.target.value as 'posts' | 'comments'); setContentPage(1); }}>
                <option value="posts">게시글 (vibe_board_posts)</option>
                <option value="comments">댓글 (vibe_board_comments)</option>
              </select>
              <input
                type="text"
                placeholder="제목 검색..."
                value={contentSearch}
                onChange={(e) => { setContentSearch(e.target.value); setContentPage(1); }}
              />
            </div>
            <div className="admin-table-wrapper">
              {contentLoading ? (
                <div className="admin-empty"><div className="loading-spinner" /></div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>작성자</th>
                      <th>카테고리</th>
                      <th>조회</th>
                      <th>작성일</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedContent.length === 0 ? (
                      <tr><td colSpan={6} className="admin-empty">데이터가 없습니다.</td></tr>
                    ) : pagedContent.map((p) => (
                      <tr key={p.id}>
                        <td>{p.title}</td>
                        <td>{p.author_name || '-'}</td>
                        <td>{p.category || '-'}</td>
                        <td>{p.views ?? 0}</td>
                        <td>{fmt(p.created_at)}</td>
                        <td>
                          <button className="admin-btn-delete" onClick={() => handleDeletePost(p.id)}>삭제</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {contentTotalPages > 1 && (
              <div className="admin-pagination">
                <button disabled={contentPage <= 1} onClick={() => setContentPage(contentPage - 1)}>이전</button>
                <span>{contentPage} / {contentTotalPages}</span>
                <button disabled={contentPage >= contentTotalPages} onClick={() => setContentPage(contentPage + 1)}>다음</button>
              </div>
            )}
          </>
        )}

        {/* ── Stats Tab ── */}
        {tab === 'stats' && (
          <div className="admin-table-wrapper" style={{ padding: 32 }}>
            <h2 style={{ marginBottom: 24 }}>사이트 통계 요약</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>항목</th>
                  <th>수량</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>총 회원수</td><td><strong>{stats.members.toLocaleString()}</strong></td></tr>
                <tr><td>게시글 수</td><td><strong>{stats.posts.toLocaleString()}</strong></td></tr>
                <tr><td>댓글 수</td><td><strong>{stats.comments.toLocaleString()}</strong></td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
