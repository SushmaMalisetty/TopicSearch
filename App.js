import React, { useState } from 'react';
import './style.css';

const topicsData = [
  { id: 1, name: "Thermodynamics", category: "Physics" },
  { id: 2, name: "Calculus", category: "Mathematics" },
  { id: 3, name: "Photosynthesis", category: "Biology" },
  { id: 4, name: "Electromagnetism", category: "Physics" },
  { id: 5, name: "Organic Chemistry", category: "Chemistry" }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? <mark key={i}>{part}</mark> : part
        )}
      </>
    );
  };

  const filteredTopics = topicsData.filter(topic => {
    const matchesSearchTerm = topic.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="app-container">
      <h1>TopicSearch</h1>
      <input
        type="text"
        placeholder="Search topics..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="dropdown-container">
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          <option value="All">All Categories</option>
          <option value="Physics">Physics</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Biology">Biology</option>
          <option value="Chemistry">Chemistry</option>
        </select>
      </div>

      <div className="topics-container">
        {filteredTopics.length > 0 ? (
          filteredTopics.map(topic => (
            <div key={topic.id} className={`topic-card ${topic.category.toLowerCase()}`}>
              <h3>{getHighlightedText(topic.name, searchTerm)}</h3>
              <p>{topic.category}</p>
            </div>
          ))
        ) : (
          <p className="no-topics">No topics found</p>
        )}
      </div>
    </div>
  );
}

export default App;
