import React from 'react';
import Hero from '../components/Hero';
import { educationData } from '../data/learningData';
import { FiCheck, FiMail, FiPhone, FiMessageSquare, FiClock } from 'react-icons/fi';

export default function Education(): React.ReactElement {
  return (
    <>
      <Hero
        title="교육과정"
        subtitle="입문부터 고급까지 체계적인 커리큘럼으로 바이브코딩을 단계별로 학습하세요."
      />

      <div className="main-section">
        <div className="card-grid">
          {educationData.map((course, i) => (
            <div className="edu-card" key={i}>
              <div className="edu-card-header">
                <div className="edu-card-level">{course.level}</div>
                <div className="edu-card-title">{course.title}</div>
              </div>
              <div className="edu-card-body">
                <p className="edu-card-desc">{course.description}</p>
                <ul className="edu-card-topics">
                  {course.topics.map((topic, j) => (
                    <li key={j}>
                      <FiCheck size={14} color="var(--primary)" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="edu-contact-box">
          <h3 className="edu-contact-title">교육 문의</h3>
          <p className="edu-contact-desc">
            교육 과정에 대한 자세한 문의는 아래 연락처로 연락주세요.
          </p>
          <div className="edu-contact-list">
            <div className="edu-contact-item">
              <FiMail size={18} />
              <span>aebon@dreamitbiz.com</span>
            </div>
            <div className="edu-contact-item">
              <FiPhone size={18} />
              <span>010-3700-0629</span>
            </div>
            <div className="edu-contact-item">
              <FiMessageSquare size={18} />
              <span>카카오톡: aebon</span>
            </div>
            <div className="edu-contact-item">
              <FiClock size={18} />
              <span>평일: 09:00 ~ 18:00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
