import React, { useState } from 'react';
import Hero from '../components/Hero';
import CodeBlock from '../components/CodeBlock';
import { claudeCodeTopics } from '../data/learningData';

export default function ClaudeCodeGuide(): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const topic = claudeCodeTopics[selectedIndex];

  return (
    <>
      <Hero
        title="Claude Code"
        subtitle="CLI 기반 에이전틱 코딩, CLAUDE.md 활용, MCP 서버 연동, 프로젝트 관리까지 깊이 있게 학습합니다."
      />

      <div className="sub-nav">
        <div className="sub-nav-inner">
          {claudeCodeTopics.map((t, i) => (
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
              <CodeBlock code={topic.code} language={topic.codeLang || 'bash'} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
