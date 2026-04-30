import React, { useState } from 'react';
import Hero from '../components/Hero';
import CodeBlock from '../components/CodeBlock';
import { codexTopics } from '../data/learningData';

export default function CodexGuide(): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const topic = codexTopics[selectedIndex];

  return (
    <>
      <Hero
        title="Codex & Others"
        subtitle="OpenAI Codex CLI, GitHub Copilot, Windsurf, Bolt/Lovable 등 다양한 AI 코딩 도구를 비교하고 활용합니다."
      />

      <div className="container">
        <div className="sidebar-layout">
          <aside className="sidebar">
            <nav className="sidebar-menu">
              {codexTopics.map((t, i) => (
                <button
                  key={i}
                  className={`sidebar-item${selectedIndex === i ? ' active' : ''}`}
                  onClick={() => setSelectedIndex(i)}
                >
                  {t.title}
                </button>
              ))}
            </nav>
          </aside>
          <div className="sidebar-content">
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
        </div>
      </div>
    </>
  );
}
