import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import MobileDrawer from './components/MobileDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminGuard from './components/AdminGuard';

const Home = lazy(() => import('./pages/Home'));
const VibeCodingBasics = lazy(() => import('./pages/VibeCodingBasics'));
const CursorGuide = lazy(() => import('./pages/CursorGuide'));
const ClaudeCodeGuide = lazy(() => import('./pages/ClaudeCodeGuide'));
const CodexGuide = lazy(() => import('./pages/CodexGuide'));
const ProjectsGuide = lazy(() => import('./pages/ProjectsGuide'));
const QnA = lazy(() => import('./pages/QnA'));
const Education = lazy(() => import('./pages/Education'));
const Login = lazy(() => import('./pages/Login'));
const CommunityList = lazy(() => import('./pages/community/CommunityList'));
const CommunityWrite = lazy(() => import('./pages/community/CommunityWrite'));
const CommunityView = lazy(() => import('./pages/community/CommunityView'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop(): null {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LoadingFallback(): React.ReactElement {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'var(--text-secondary)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 0.75rem'
        }} />
        <p style={{ margin: 0, fontSize: '0.9rem' }}>Loading...</p>
      </div>
    </div>
  );
}

function App(): React.ReactElement {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <SearchModal />
      <MobileDrawer />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basics" element={<VibeCodingBasics />} />
          <Route path="/cursor" element={<CursorGuide />} />
          <Route path="/claude-code" element={<ClaudeCodeGuide />} />
          <Route path="/codex" element={<CodexGuide />} />
          <Route path="/projects" element={<ProjectsGuide />} />
          <Route path="/qna" element={<QnA />} />
          <Route path="/education" element={<Education />} />
          <Route path="/login" element={<Login />} />
          <Route path="/community" element={<CommunityList />} />
          <Route path="/community/write" element={
            <ProtectedRoute><CommunityWrite /></ProtectedRoute>
          } />
          <Route path="/community/:id" element={<CommunityView />} />
          <Route path="/admin/*" element={
            <AdminGuard><AdminDashboard /></AdminGuard>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
