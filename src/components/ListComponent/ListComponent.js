// src/components/ListComponent/ListComponent.js
import React from 'react';
import './ListComponent.css';

const ListComponent = ({ 
  items = [], 
  renderItem, 
  keyExtractor,
  listClassName = 'list-component',
  emptyMessage = 'No items to display' 
}) => {

  // If no items are provided, show empty message
  if (!items.length) {
    return <div className="empty-list">{emptyMessage}</div>;
  }

  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={keyExtractor ? keyExtractor(item) : item.id}>
          {renderItem ? renderItem(item) : JSON.stringify(item)}
        </li>
      ))}
    </ul>
  );
};

export default ListComponent;