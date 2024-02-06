import React from 'react';
import { Field } from 'react-final-form';
import { Radio } from '~/components/ui/formControls';

function Period() {
  return (
    <div className="flex ms-xs-flex-wrap justify-center mt-10">
      <div className="px-15 ms-xs-w-full ms-xs-mb-15">
        <Field type="radio" name="period" value="1" component={Radio}>
          Day
        </Field>
      </div>
      <div className="px-15 ms-xs-w-full ms-xs-mb-15">
        <Field type="radio" name="period" value="2" component={Radio}>
          Week
        </Field>
      </div>
      <div className="px-15 ms-xs-w-full ms-xs-mb-15">
        <Field type="radio" name="period" value="3" component={Radio}>
          Month
        </Field>
      </div>
    </div>
  );
}

export default Period;
