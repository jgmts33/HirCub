import React from 'react';
import './styles.scss';

function SimplyItemsList(props) {
  const { items } = props;
  if (!items || items.length === 0) {
    return <i>Ask us anything and we will answer as soon as we can.</i>;
  }
  return (
    <ul className="items-list simply-items-list">
      {items.map(item => (
        <li key={item.id} className="question">
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default SimplyItemsList;
