import React, { useState, useMemo } from 'react';
import { financeTabList } from '../constants';
import Tab from '../Tabs/tab';
import './styles.scss';

function FinanceTrackerTabs(props) {
  const [currentTab, setCurrentTab] = useState(null);

  const handleToggleTag = (title, rootName) => {
    let newTitle = title;
    if (currentTab && currentTab === title) {
      newTitle = null;
    }
    setCurrentTab(newTitle);
    props.setCurrentCard(newTitle);
  };

  const renderTab = useMemo(() => {
    const idx = financeTabList.findIndex((tab) => tab.title === currentTab);
    if (idx == -1) {
      return null;
    }
    const tab = financeTabList[idx];
    return (
      <Tab
        title={tab.title}
        symptomTitle={tab.symptomTitle}
        rootName={tab.rootName}
        tabId={idx + 1}
        typeId={tab.typeId}
      // suggestionConditions={card.suggestionConditions}
      // shouldShowSuggestions={shouldShowSuggestions}
      />
    );
  }, [currentTab]);

  return (
    <div className="finance-group">
      <hr className="finance-tracker_separator" />
      <div className="w-full finance-block-group-btn --custom">
        {financeTabList.map((data) => {
          const title = data.title;
          const rootName = data.rootName;
          const classNameBtn =
            title === currentTab ? '-white-btn' : '-purpose-btn';

          return (
            <button
              key={title}
              type="button"
              className={`btn uppercase ${classNameBtn}`}
              onClick={() => handleToggleTag(title, rootName)}
            >
              {title}
            </button>
          );
        })}
      </div>
      {renderTab}
    </div>
  );
}

export default FinanceTrackerTabs;