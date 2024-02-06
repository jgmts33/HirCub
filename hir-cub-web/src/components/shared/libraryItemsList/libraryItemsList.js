import React from 'react';
import ActionList from '~/components/shared/actionList';
import './styles.scss';

function LibraryItemsList(props) {
  const { type, items, programItems, setSuggestionStatus } = props;
  if (!items) {
    return null;
  }
  return (
    <ActionList
      type={type}
      items={items}
      renderLine={item => (
        <a href={item.link} target="_blank">
          {item.title}
        </a>
      )}
      programItems={programItems}
      renderProgramLine={item => (
        <span
          key={item.id}
          className={`program ${item.active ? 'active' : ''}`}
        >
          {item.name}
        </span>
      )}
      changeStatus={setSuggestionStatus}
    />
  );
}

export default LibraryItemsList;
