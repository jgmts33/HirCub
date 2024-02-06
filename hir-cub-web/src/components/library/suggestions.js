import React, { useState } from 'react';
import ActionList from '~/components/shared/actionList';
import CollapsiblePanel from '../ui/collapsiblePanel';
import './styles.scss';

function Suggestions(props) {
  const {
    type,
    title,
    userSuggestions,
    programs,
    setSuggestionStatus,
    setProgramStatus,
    useCollapse,
  } = props;

  const [collapse, setCollapse] = useState(false);

  const renderList = () => {
    return (
      <div className="library-items-list">
        <ActionList
          type={type}
          items={userSuggestions}
          renderLine={(item) => (
            <a href={item.link} target="_blank">
              {item.title}
            </a>
          )}
          programItems={programs}
          renderProgramLine={(item) => (
            <span
              key={item.id}
              className={`program ${item.active ? 'program-active' : ''}`}
            >
              {item.name}
            </span>
          )}
          changeSuggestionStatus={setSuggestionStatus}
          changeProgramStatus={setProgramStatus}
        />
      </div>
    );
  };

  return (
    <div className="suggestion-group">
      {useCollapse ? (
        <CollapsiblePanel
          title={title}
          collapse={collapse}
          setCollapse={setCollapse}
        >
          {renderList()}
        </CollapsiblePanel>
      ) : (
        <>
          <div className="suggestion-group-title">{title}</div>
          {renderList()}
        </>
      )}
    </div>
  );
}

export default Suggestions;
