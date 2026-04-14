import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { searchData } from '../data/learningData';
import type { SearchItem } from '../data/learningData';

export default function SearchModal(): React.ReactElement | null {
  const { searchOpen, setSearchOpen } = useTheme();
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const results: SearchItem[] = query.length > 0
    ? searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (item: SearchItem): void => {
    setSearchOpen(false);
    navigate(item.path);
  };

  return (
    <div className="search-overlay" onClick={() => setSearchOpen(false)}>
      <div className="search-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="search-input-wrap">
          <FiSearch size={20} />
          <input
            ref={inputRef}
            className="search-input"
            placeholder="검색어를 입력하세요... (ESC로 닫기)"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </div>
        <div className="search-results">
          {query.length > 0 && results.length === 0 && (
            <div className="search-empty">검색 결과가 없습니다</div>
          )}
          {results.map((item, i) => (
            <div
              key={i}
              className="search-result-item"
              onClick={() => handleSelect(item)}
            >
              <div className="result-icon">{item.icon}</div>
              <div className="result-text">
                <div className="result-title">{item.title}</div>
                <div className="result-category">{item.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
