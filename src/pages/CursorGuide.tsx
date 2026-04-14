import React, { useState } from 'react';
import Hero from '../components/Hero';
import CodeBlock from '../components/CodeBlock';
import { cursorTopics } from '../data/learningData';

export default function CursorGuide(): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const topic = cursorTopics[selectedIndex];

  return (
    <>
      <Hero
        title="AI Cursor"
        subtitle="Cursor IDE의 Tab 자동완성, Cmd+K 인라인 편집, Chat/Composer, Rules 설정을 마스터합니다."
      />

      <div className="sub-nav">
        <div className="sub-nav-inner">
          {cursorTopics.map((t, i) => (
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
