import React from 'react';
import { Field } from 'react-final-form';
import { Radio } from '~/components/ui/formControls';
import { painTypeList } from '../constants';

function PainType() {
  return (
    <div className="bg-white py-10 px-20 rounded-4 mb-20 rounded-4">
      <div className="text-center font-semibold mb-10">Describe the pain.</div>
      {painTypeList.map((type, idx) => {
        return (
          <div className="mb-10">
            <Field
              type="radio"
              name="pain.type"
              value={String(idx + 1)}
              component={Radio}
            >
              {type}
            </Field>
          </div>
        );
      })}
    </div>
  );
}

export default PainType;
