import React, { useState } from 'react';
import Hero from '../components/Hero';
import CodeBlock from '../components/CodeBlock';
import { projectsTopics } from '../data/learningData';

export default function ProjectsGuide(): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const topic = projectsTopics[selectedIndex];

  return (
    <>
      <Hero
        title="실전 프로젝트"
        subtitle="AI와 함께 프로젝트를 설계하고, 프론트엔드 구축, 백엔드 연동, 배포, 포트폴리오까지 완성합니다."
      />

      <div className="sub-nav">
        <div className="sub-nav-inner">
          {projectsTopics.map((t, i) => (
            <button
              key={i}
              className={`sub-nav-tab${selectedIndex === i ? ' active' : ''}`}
              onClick={() => setSelectedIndex(i)}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      <div className="main-section">
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
                    {section.items.map((item, j) => <li key={j}>{item}</li>)}
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
    </>
  );
}
