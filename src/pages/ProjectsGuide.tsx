import React, { useState, useEffect, useRef, useCallback } from 'react';
import Hero from '../components/Hero';
import CodeBlock from '../components/CodeBlock';
import { projectsTopics } from '../data/learningData';

const outcomes = [
  'AI와 협업하여 프로젝트를 설계하는 능력',
  'React + TypeScript 프론트엔드 구축',
  'Supabase 백엔드 연동 (인증, DB, 스토리지)',
  'GitHub Pages 배포 및 CI/CD 자동화',
  '포트폴리오용 프로젝트 문서화',
  '실무 수준의 웹 애플리케이션 완성',
];

export default function ProjectsGuide(): React.ReactElement {
  const [activeId, setActiveId] = useState<string>(projectsTopics[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el);
    } else {
      sectionRefs.current.delete(id);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      },
    );

    sectionRefs.current.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current.get(id) ?? document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Hero
        title="실전 프로젝트"
        subtitle="AI와 함께 프로젝트를 설계하고, 프론트엔드 구축, 백엔드 연동, 배포, 포트폴리오까지 완성합니다."
      />

      <div className="container">
        <div className="sidebar-layout">
          <aside className="sidebar">
          <nav className="sidebar-menu">
            {projectsTopics.map((t) => (
              <button
                key={t.id}
                className={`sidebar-item${activeId === t.id ? ' active' : ''}`}
                onClick={() => scrollTo(t.id)}
              >
                {t.title}
              </button>
            ))}
            <button
              className={`sidebar-item${activeId === 'outcomes' ? ' active' : ''}`}
              onClick={() => scrollTo('outcomes')}
            >
              학습 성과
            </button>
          </nav>
        </aside>

        <div className="sidebar-content">
          {projectsTopics.map((topic) => (
            <div
              key={topic.id}
              id={topic.id}
              ref={(el) => setRef(topic.id, el)}
              className="project-step"
            >
              <div className="topic-card">
                <div className="topic-card-header">
                  <div className="topic-card-icon">{topic.icon}</div>
                  <div className="topic-card-title">{topic.title}</div>
                </div>
                <div className="topic-card-body">
                  <p>{topic.description}</p>
                  {topic.content.map((section, idx) => (
                    <div key={idx}>
                      {section.subtitle && <h4>{section.subtitle}</h4>}
                      {section.text && <p>{section.text}</p>}
                      {section.items && (
                        <ul>
                          {section.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  {topic.code && (
                    <CodeBlock code={topic.code} language={topic.codeLang || 'text'} />
                  )}
                </div>
              </div>
            </div>
          ))}

          <div
            id="outcomes"
            ref={(el) => setRef('outcomes', el)}
            className="project-outcomes"
          >
            <div className="project-outcomes-title">
              🎯 학습 성과
            </div>
            <div className="project-outcomes-grid">
              {outcomes.map((item, i) => (
                <div key={i} className="project-outcomes-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
