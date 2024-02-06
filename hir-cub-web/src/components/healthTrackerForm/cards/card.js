import React, { useState } from 'react';
import { Intensity, Concern } from './shared';
import SymptomDescriptionModal from '~/components/modals/symptomDescriptionModal';
import './styles.scss';
import { ReactComponent as FastFact } from '~/assets/svg/fast-fact.svg';
import { ReactComponent as FastFactHover } from '~/assets/svg/fast-fact-hover.svg';

function Card(props) {
  const {
    title,
    symptomTitle,
    rootName,
    typeId,
    minScaleText,
    maxScaleText,
    suggestionConditions,
    shouldShowSuggestions,
    description,
  } = props;

  const [isSymptom, setIsSymptom] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleSymptom = () => {
    setIsSymptom(true);
  };

  const handleOverSymptom = () => {
    setIsHover(true);
  };

  const handleLeaveSymptom = () => {
    setIsHover(false);
  };

  function handleCloseSymptom() {
    setIsSymptom(false);
  }

  return (
    <div className="w-full">
      <p className="reports-block-graph__title symptom-title">
        {symptomTitle}
        <span className="symptom-text" >
          {isHover ? (
            <FastFactHover
              className="fast-fact"
              onClick={handleSymptom}
              onMouseOver={handleOverSymptom}
              onMouseLeave={handleLeaveSymptom}
            />
          ) : (
            <FastFact
              className="fast-fact"
              onClick={handleSymptom}
              onMouseOver={handleOverSymptom}
              onMouseLeave={handleLeaveSymptom}
            />
          )}
          <font>{isHover === true ? 'FAST FACTS' : ''}</font>
        </span>
      </p>
      {
        rootName != 'wellBeing' ? (
          <Intensity
            title={title}
            typeId={typeId}
            rootName={rootName}
            minScale={minScaleText}
            maxScale={maxScaleText}
            suggestionConditions={suggestionConditions}
            shouldShowSuggestions={shouldShowSuggestions}
          />
        ) : (
          <Intensity
            title={title}
            typeId={typeId}
            rootName={rootName}
            minScale={minScaleText}
            maxScale={maxScaleText}
          />
        )
      }
      {rootName != 'wellBeing' ? <Concern rootName={rootName} /> : <></>}

      <SymptomDescriptionModal
        isOpen={isSymptom}
        close={handleCloseSymptom}
        title={title}
        description={description}
      />
    </div >
  );
}

export default Card;
