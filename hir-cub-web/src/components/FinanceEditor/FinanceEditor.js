import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import moment from 'moment';

import { Input, DayPicker } from '~/components/ui/formControls';
import { Button } from '~/components/ui';
import {
  createFinanceRecord,
  updateFinanceRecord,
  getFinanceCategories,
} from '~/requests/financeRecord';
import { getEventsRequest } from '~/requests/calendar';
import './styles.scss';

// helpers
import { trackGTM } from '~/utils';

// constants
import { TRACK_GTM } from '~/consts';
import { formatDateNormal } from '~/consts/formatDateTime';
import { formatDateString } from '~/consts/formatDateTime';
import Loader from '../Loader';
import HelpBox from '../HelpBox';

function FinanceEditor(props) {
  const [finance, setFinance] = useState({});

  const [eventsList, setEventsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [formValues, setFormValues] = useState({});

  const [categories, setCategories] = useState([]);
  const [selectedEvent, setEvent] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    if (isLoading) {
      return;
    }
    let data = { ...values };
    if (categories.length > 0) {
      setLoading(true);
      let selectedCategories = [];
      categories.forEach((cat) => {
        selectedCategories.push(cat.value);
      });

      if (selectedEvent.value) {
        data['eventId'] = selectedEvent.value;
      }
      data['categories'] = selectedCategories;

      if (finance.id) {
        // update finance
        updateFinanceRecord(data, finance.id).then((res) => {
          // finance is created
          reRunAllAPIs();
        });
      } else {
        // create finance
        createFinanceRecord(data).then((res) => {
          // finance is created
          trackGTM(TRACK_GTM.CREATE_EXPENSES, {
            ...res,
            date: formatDateNormal(res.date),
          });
          reRunAllAPIs();
        });
      }
    }
  };

  const changeCategories = (value) => {
    setCategories(value);
  };

  const changeEvent = (value) => {
    setEvent(value);
  };

  const populateEntry = (item) => {
    if (Object.values(item).length > 0) {
      // set finance
      setFinance(item);

      // set Location
      setFormValues({
        ...formValues,
        date: formatDateNormal(item.date),
        location: item.location,
        amount: item.amount,
      });

      // select categories
      const categories = categoriesList.filter(
        (obj) => item.categories.indexOf(obj.value) > -1
      );
      setCategories(categories.length > 0 ? categories : []);

      // select Associated calendar event
      const eventTarget = eventsList.filter(
        (obj) => obj.value === item.eventId
      );
      setEvent(eventTarget.length > 0 ? eventTarget[0] : []);
    }
  };

  const getEvents = () => {
    // get all calendar events associated to all finance entries for current user
    getEventsRequest().then((res) => {
      let list = [];
      res.forEach((item) => {
        list.push({ value: item.id, label: item.title });
      });

      setEventsList(list);
      setLoading(false);
    });
  };

  const getCategories = () => {
    getFinanceCategories().then((res) => {
      let list = [];
      res.forEach((item) => {
        list.push({ value: item, label: item });
      });

      setCategoriesList(list);
    });
  };

  const reRunAllAPIs = () => {
    setLoading(true);
    getEvents();
    getCategories();
    props.reRunAPIs();
  };

  useEffect(() => {
    setLoading(true);
    getEvents();
    getCategories();
  }, []);

  useEffect(() => {
    // populate selected entry information
    populateEntry(props.finance);
  }, [props.finance]);

  return (
    <div className="w-full finance-editor">
      <HelpBox
        title="&nbsp;"
        firstLine="How to use this tool? Examples of using this tool? Find answers in our help section"
        hash="/help#finance"
      />

      <div className="mt-30 finance-title-wrapper" id="my-finance">
        <span className="finance-title">My finances</span>
      </div>

      <Form onSubmit={handleSubmit} initialValues={formValues}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="finance-entry-form">
            <div className="w-full finance-editor-row">
              <span className="finance-span">Category</span>
              <CreatableSelect
                isMulti
                name="categories"
                options={categoriesList}
                value={categories}
                onChange={changeCategories}
                className="fiance-multi-select"
                classNamePrefix="select"
                placeholder="Planning for my care visit"
              />
            </div>

            <div className="w-full finance-editor-row">
              <span className="finance-span">Location</span>
              <Field
                className="finance-input"
                name="location"
                placeholder="Input location"
                type="text"
                component={Input}
              />
            </div>

            <div className="w-full finance-editor-row">
              <span className="finance-span">Amount</span>
              <Field
                className="finance-input"
                name="amount"
                placeholder="Input amount"
                type="number"
                component={Input}
              />
            </div>

            <div className="w-full finance-editor-row">
              <span className="finance-span">Date</span>
              <Field
                name="date"
                className="input-datapicker date"
                placeholder="Please select date"
                currentDate={moment().format(formatDateString)}
                component={DayPicker}
              />
            </div>

            <div className="w-full finance-editor-row">
              <span className="finance-span">Associated calendar event</span>
              <Select
                name="eventId"
                options={eventsList}
                value={selectedEvent}
                onChange={changeEvent}
                className="fiance-multi-select"
                classNamePrefix="select"
                isSearchable={false}
                placeholder="Please select event"
              />
            </div>

            <div className="m-xs-mt-10 m-xs-auto mt-30">
              <Button type="submit" kind="purpure">
                {finance.id ? 'Update' : 'Submit'}
              </Button>
            </div>
          </form>
        )}
      </Form>
      {isLoading && <Loader />}
    </div>
  );
}

export default FinanceEditor;
