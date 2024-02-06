import React, { useState, useMemo } from 'react';
import SimplyItemsList from '~/components/shared/simplyItemsList';
import './styles.scss';

function QuestionsList(props) {
  const { items } = props;
  const [showFullList, setShowFullList] = useState(false);
  const displayedItems = useMemo(() => {
    return showFullList ? items : items.slice(0, 4);
  }, [items, showFullList]);
  return (
    <div>
      <i>
        This is to help you keep track of questions you may have for your health
        care team. View all of your questions{' '}
        <span
          className="question-list_show-all"
          onClick={() => setShowFullList(true)}
          role="button"
          tabIndex="0"
        >
          here
        </span>
      </i>
      <div className="question-list_list-container">
        <SimplyItemsList items={displayedItems} />
      </div>
    </div>
  );
}

export default QuestionsList;
