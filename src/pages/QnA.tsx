import React, { useState } from 'react';
import Hero from '../components/Hero';
import { faqData } from '../data/learningData';
import { FiChevronDown } from 'react-icons/fi';

export default function QnA(): React.ReactElement {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (i: number): void => setExpandedIndex(expandedIndex === i ? null : i);

  return (
    <>
      <Hero
        title="자주 묻는 질문"
        subtitle="바이브코딩 학습 중 자주 묻는 질문과 답변을 모았습니다. 궁금한 점을 찾아보세요."
      />

      <div className="main-section" style={{ maxWidth: 860, margin: '0 auto' }}>
        {faqData.map((faq, i) => {
          const open = expandedIndex === i;
          return (
            <div className="faq-item" key={i}>
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{faq.question}</span>
                <span className={`faq-icon${open ? ' open' : ''}`}>
                  <FiChevronDown />
                </span>
              </button>
              <div className={`faq-answer${open ? ' open' : ''}`}>
                <div className="faq-answer-inner">{faq.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
