import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { DateSelector } from './dateSelector';
import { Textarea, Input, Checkbox } from '~/components/ui/formControls';
import Select from 'react-select';
import { expenseList, travelList } from '../constants';

function Tab(props) {
  const {
    title,
    rootName,
  } = props;

  const [listValue, setListValue] = useState(expenseList[0]);
  const [travelValue, setTravelValue] = useState(travelList[0]);

  const handleChange = (val) => {
    setListValue(val);
  };

  const handleTravel = (val) => {
    setTravelValue(val);
  };

  return (
    <div className="w-full">
      <p className="finance-block-graph__title">{title}</p>
      {rootName !== 'relatedTravel' ? (
        <div className="bg-white rounded-4 block-form">
          <DateSelector rootName={rootName} />
          <div className="py-10 px-20 rounded-4 block-form-item">
            <div className="font-semibold mb-10 track-other">
              Payment Made to
            </div>
            <div className="">
              <Field
                name={`${rootName}.paymentMadeTo`}
                component={Input}
                rows="5"
              ></Field>
            </div>
          </div>
          <div className="block-form-flex">
            <div className="py-10 px-20 rounded-4 block-form-item">
              <div className="font-semibold mb-10 track-other">
                Description of Expense
              </div>
              <div className="">
                <Select
                  name={`${rootName}.descriptionOfExpense`}
                  options={expenseList}
                  value={listValue}
                  onChange={handleChange}
                  className="filter-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-4 block-form">
          <DateSelector rootName={rootName} />
          <div className="block-form-flex">
            <div className="py-10 px-20 rounded-4 block-form-item">
              <div className="font-semibold mb-10 track-other">Destination</div>
              <div className="">
                <Field
                  name={`${rootName}.destination`}
                  component={Input}
                  rows="5"
                ></Field>
              </div>
            </div>
          </div>
          <div className="py-10 px-20 rounded-4 block-form-item">
            <div className="font-semibold mb-10 track-other">
              Reason for Travelling
            </div>
            <div className="">
              <Field
                name={`${rootName}.reasonForTravelling`}
                component={Input}
                rows="5"
              ></Field>
            </div>
          </div>
          <div className="block-form-flex">
            <div className="py-10 px-20 rounded-4 block-form-item">
              <div className="font-semibold mb-10 track-other">
                Travel Range
              </div>
              <div className="">
                <Select
                  name={`${rootName}.travelRange`}
                  options={travelList}
                  value={travelValue}
                  onChange={handleChange}
                  className="filter-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>
          <div className="block-form-flex">
            <div className="py-10 px-20 rounded-4 block-form-small">
              <div className="font-semibold mb-10 track-other">
                Meal Expenses – number of meals
              </div>
              <div className="">
                <Field
                  name={`${rootName}.mealExpenses`}
                  component={Input}
                  placeholder=""
                  rows="5"
                  type="number"
                ></Field>
              </div>
            </div>
            <div className="py-10 px-20 rounded-4 block-form-small">
              <div className="font-semibold mb-10 track-other">
                Detailed cost of meals
              </div>
              <div className="">
                <Field
                  name={`${rootName}.detailedCost`}
                  component={Input}
                  placeholder=""
                  rows="5"
                  type="number"
                ></Field>
              </div>
            </div>
          </div>
          <div className="block-form-flex">
            <div className="py-10 px-20 rounded-4 form-checkbox block-form-checkbox">
              <Field
                name={`${rootName}.vehicleUsed`}
                type="checkbox"
                component={Checkbox}
              >
                Vehicle used
              </Field>
            </div>
            <div className="py-10 px-20 rounded-4 block-form-small">
              <div className="font-semibold mb-10 track-other">km driven</div>
              <div className="">
                <Field
                  name={`${rootName}.kmDriven`}
                  component={Input}
                  placeholder=""
                  rows="5"
                  type="number"
                ></Field>
              </div>
            </div>
            <div className="py-10 px-20 rounded-4 block-form-small">
              <div className="font-semibold mb-10 track-other">
                Detailed costs incurred (gas, etc.)
              </div>
              <div className="">
                <Field
                  name={`${rootName}.detailedCostIncurred`}
                  component={Input}
                  placeholder=""
                  rows="5"
                  type="number"
                ></Field>
              </div>
            </div>
          </div>
          <div className="block-form-flex">
            <div className="py-10 px-20 rounded-4 block-form-small">
              <div className="font-semibold mb-10 track-other">
                Parking costs
              </div>
              <div className="">
                <Field
                  name={`${rootName}.parkingCosts`}
                  component={Input}
                  placeholder=""
                  rows="5"
                  type="number"
                ></Field>
              </div>
            </div>
            <div className="py-10 px-20 rounded-4 block-form-small">
              <div className="font-semibold mb-10 track-other">
                Hotel/ Other lodging
              </div>
              <div className="">
                <Field
                  name={`${rootName}.lodging`}
                  component={Input}
                  placeholder=""
                  rows="5"
                  type="number"
                ></Field>
              </div>
            </div>
          </div>
          <div className="block-form-flex">
            <div className="py-10 px-20 rounded-4 block-form-item">
              <div className="font-semibold mb-10 track-other">
                Reimbursements
              </div>
              <div className="">
                <Field
                  name={`${rootName}.reimbursements`}
                  component={Input}
                  placeholder=""
                  rows="5"
                  type="number"
                ></Field>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-4">
        <div className="block-form-flex">
          <div className="py-10 px-20 rounded-4 block-form-small">
            <div className="font-semibold mb-10 track-other">Amount</div>
            <div className="">
              <Field
                name={`${rootName}.amount`}
                component={Input}
                placeholder=""
                rows="5"
                type="number"
              ></Field>
            </div>
          </div>
          <div className="py-10 px-20 rounded-4 block-form-small">
            <div className="font-semibold mb-10 track-other">
              Reimbursed Amount
            </div>
            <div className="">
              <Field
                name={`${rootName}.reimbursedAmount`}
                component={Input}
                placeholder=""
                rows="5"
                type="number"
              ></Field>
            </div>
          </div>
          <div className="py-10 px-20 rounded-4 block-form-small">
            <div className="font-semibold mb-10 track-other">Net Cost</div>
            <div className="">
              <Field
                name={`${rootName}.netCost`}
                component={Input}
                placeholder=""
                rows="5"
                type="number"
                disabled
              ></Field>
            </div>
          </div>
        </div>
        <div className="block-form-item">
          <div className="py-10 px-20 rounded-4">
            <div className="font-semibold mb-10 track-other">
              Other details/Notes
            </div>
            <div className=" ">
              <Field
                name={`${rootName}.otherDetails`}
                component={Textarea}
                rows="5"
                resize="vertical"
              ></Field>
            </div>
          </div>
        </div>
        <div className="block-form-flex">
          {rootName === 'attendantCare' ? (
            <div className="py-10 px-20 rounded-4 form-checkbox">
              <Field
                name={`${rootName}.timeCare`}
                type="checkbox"
                component={Checkbox}
              >
                Full Time/ Part Time Care
              </Field>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="block-form-flex">
          {rootName !== 'other' && rootName !== 'related' ? (
            <div className="py-10 px-20 rounded-4">
              <Field
                name={`${rootName}.tax`}
                type="checkbox"
                component={Checkbox}
              >
                Tax
              </Field>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tab;
