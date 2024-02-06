import React, { useState, useEffect, useMemo } from 'react';

import '../../reports/ReportsBlock/ReportsBlock.scss';
import { problemCardList } from '../constants';
import Card from '../cards/card';
import { DateTimeSelectors } from '../cards/shared';
import './styles.scss';

function Problems(props) {
  const { shouldShowSuggestions } = props;
  const [openCard, setOpenCard] = useState(null);
  const [browserWidth, setBrowserWidth] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentRootName, setCurrentRootName] = useState('');

  const minutesInterval = 10;

  const handleToggleCard = (title, rootName) => {
    let newTitle = title;
    if (currentCard && currentCard === title) {
      newTitle = null;
    }
    setCurrentCard(newTitle);
    setCurrentRootName(newTitle ? rootName : 'pain');
    props.setCurrentCard(newTitle);
  };

  const renderCard = useMemo(() => {
    const idx = problemCardList.findIndex((card) => card.title === currentCard);
    if (idx == -1) {
      return null;
    }
    const card = problemCardList[idx];
    return (
      <Card
        title={card.title}
        symptomTitle={card.symptomTitle}
        rootName={card.rootName}
        tabId={idx + 1}
        typeId={card.typeId}
        minScaleText={card.scaleText.min}
        maxScaleText={card.scaleText.max}
        minutesInterval={minutesInterval}
        openCard={openCard}
        setOpenCard={setOpenCard}
        browserWidth={browserWidth}
        suggestionConditions={card.suggestionConditions}
        shouldShowSuggestions={shouldShowSuggestions}
        description={card.description}
      />
    );
  }, [currentCard, browserWidth, openCard, shouldShowSuggestions]);

  useEffect(() => {
    function handleResize() {
      const width = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
      setBrowserWidth(width);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="problems-group">
      <hr className="health-tracker_separator" />
      <DateTimeSelectors
        rootName={currentRootName}
        minutesInterval={minutesInterval}
      />
      <div className="w-full reports-block-group-btn --custom">
        {problemCardList.map((data) => {
          const title = data.title;
          const rootName = data.rootName;
          const classNameBtn =
            title === currentCard ? '-white-btn' : '-purpose-btn';

          return (
            <button
              key={title}
              type="button"
              className={`btn uppercase ${classNameBtn}`}
              onClick={() => handleToggleCard(title, rootName)}
            >
              {title}
            </button>
          );
        })}
      </div>
      {renderCard}
    </div>
  );
}

export default Problems;
