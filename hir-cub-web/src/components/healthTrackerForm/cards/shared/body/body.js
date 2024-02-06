import React, { useState, useEffect } from 'react';
import { Field } from 'react-final-form';
import useFormState from '~/utils/formState';
import BodySideSelector from './bodySideSelector';
import BodyPartSelector from './bodyPartSelector';
import './body.scss';

function Body(props) {
  const { rootName } = props;
  const { values } = useFormState();
  const [isMale, setIsMale] = useState(true);
  function changeGender() {
    localStorage.setItem('isMale', isMale ? '0' : '1');
    setIsMale(!isMale);
  }
  useEffect(() => {
    const storedIsMale = localStorage.getItem('isMale');
    setIsMale(storedIsMale === '1');
    localStorage.setItem('isMale', storedIsMale === '1' ? '1' : '0');
  }, []);
  return (
    <React.Fragment>
      <div className="text-center">
        <div className="font-semibold text-lg">
          {values[rootName].isFront ? 'Front' : 'Back'} View
        </div>
        Click on the body parts that hurt
      </div>
      <div className="my-10 text-center body">
        <span className="relative display-inline-block">
          <img
            src={`/img/${isMale ? 'male' : 'female'}-${
              values[rootName].isFront ? 'front' : 'back'
            }.png`}
          />
          <Field name={`${rootName}.bodyPart`} component={BodyPartSelector} />
        </span>
      </div>
      <Field name={`${rootName}.isFront`} component={BodySideSelector} />
      <div
        className="my-10 text-center text-lg body-pain_swtcher"
        onClick={changeGender}
        role="button"
        tabIndex="0"
      >
        <i className="fas fa-angle-left" />
        Change gender
        <i className="fas fa-angle-right" />
      </div>
    </React.Fragment>
  );
}

export default Body;
