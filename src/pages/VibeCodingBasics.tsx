import React, { useState } from 'react';
import Hero from '../components/Hero';
import CodeBlock from '../components/CodeBlock';
import { basicsTopics } from '../data/learningData';

export default function VibeCodingBasics(): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const topic = basicsTopics[selectedIndex];

  return (
    <>
      <Hero
        title="바이브코딩 기초"
        subtitle="바이브코딩의 개념, AI 코딩 도구, 프롬프트 엔지니어링 등 핵심 기초를 체계적으로 학습합니다."
      />

      <div className="sub-nav">
        <div className="sub-nav-inner">
          {basicsTopics.map((t, i) => (
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
              <CodeBlock code={topic.code} language={topic.codeLang || 'javascript'} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
