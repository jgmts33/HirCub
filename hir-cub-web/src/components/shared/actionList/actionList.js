import React from 'react';
import Sublist from './sublist';
import './styles.scss';

function ActionList(props) {
  const {
    type,
    items,
    renderLine,
    programItems,
    renderProgramLine,
    changeSuggestionStatus,
    changeProgramStatus,
  } = props;
  return (
    <ul className="items-list">
      <Sublist
        type={type}
        items={items}
        renderLine={renderLine}
        changeStatus={changeSuggestionStatus}
      />
      <Sublist
        type={type}
        items={programItems}
        renderLine={renderProgramLine}
        changeStatus={changeProgramStatus}
      />
    </ul>
  );
}

export default ActionList;
