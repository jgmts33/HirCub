import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { Form, Field } from 'react-final-form';
import Select from 'react-select';
import { Input, DayPicker } from '~/components/ui/formControls';
import { Button } from '~/components/ui';
import Loader from '../Loader';
import {
  getJournalEntries,
  getJournalTags,
  removeJournalEntry,
  searchJournalEntries,
} from '~/requests/journalEntry';
import { usePermission } from '~/hooks';

import { ReactComponent as Edit } from '~/assets/svg/edit.svg';

// constants
import {
  TRACK_GTM,
  PermissionType,
  convertDate,
  formatDateNormal,
} from '~/consts';
import {
  itemsLoadPerClick,
  defaultFormvalues,
  optionsTruncate,
} from './constants';
import {
  checkDateIsBetween,
  checkDateIsAfter,
  checkDateIsBefore,
  compareDate,
} from '~/consts/global';

import './styles.scss';
import '../DashboardWelcome/style.scss';

// helpers
import { truncate } from 'lodash';
import useAppState from '~/appState';
import { trackGTM } from '~/utils';
import { noteCategoryConsts } from '../JournalEditor/constants';
import ConfirmModal from '../modals/confirmModal';
import HelpBox from '../HelpBox';
import { showErrorToast } from '../common';

const JournalEntriesComponent = forwardRef((props, ref) => {
  const {
    global: { userId },
  } = useAppState();

  const { isImpersonationMode, isWriteAllowed } = usePermission(
    PermissionType.JournalEntry
  );

  const isEditAllowed = !isImpersonationMode || isWriteAllowed;

  const [entries, setEntries] = useState([]);
  const [backupEntries, setBackUpEntries] = useState([]);
  const [showedEntries, setShowedEntries] = useState([]);
  const [tagsList, setTagsList] = useState(noteCategoryConsts);
  const [tag, setTag] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [formValues, setFormValue] = useState(defaultFormvalues);

  const [listReadMore, setListReadMore] = useState({});
  const [deleteId, setDeleteId] = useState('');
  const [isShowModal, setShowModal] = useState(false);

  const changeTag = (value) => {
    setTag(value);
  };

  const handleSubmit = useCallback(
    (formValues) => {
      let filter = { ...formValues };

      if (tag && tag.value) {
        filter.tag = tag.value;
      }

      if (Object.values(filter).length > 0) {
        if (filter.search) {
          setLoading(true);
          // needs to do search query
          searchJournalEntries(filter.search).then((res) => {
            let records = res.sort((a, b) => {
              return compareDate(a.createdAt, b.createdAt, 0);
            });

            filterEntries(records, filter);
            setLoading(false);
          });
        } else {
          let records = [...backupEntries];

          filterEntries(records, filter);
        }
      } else {
        setEntries(backupEntries);
      }
    },
    [backupEntries, tag]
  );

  const filterEntries = (records, filter) => {
    // need to apply filter
    if (filter.tag) {
      // filter tags
      records = records.filter((obj) => obj.tags.indexOf(filter.tag) > -1);
    }

    if (filter.startDate && filter.endDate) {
      records = records.filter((obj) =>
        checkDateIsBetween(filter.startDate, filter.endDate, obj.createdAt)
      );
    } else {
      if (filter.startDate) {
        records = records.filter((obj) =>
          checkDateIsAfter(filter.startDate, obj.createdAt)
        );
      }

      if (filter.endDate) {
        records = records.filter((obj) =>
          checkDateIsBefore(filter.endDate, obj.createdAt)
        );
      }
    }

    setEntries(records);
  };

  const getEntries = () => {
    // get all entries
    setLoading(true);
    getJournalEntries()
      .then((res) => {
        trackGTM(TRACK_GTM.ACCESS_NOTES, {
          userId,
          numberOfNotes: res.length,
        });
        let records = res.sort((a, b) => {
          return compareDate(a.createdAt, b.createdAt, 0);
        });

        setBackUpEntries(records);
        setEntries(records);
        setLoading(false);
      })
      .catch((err) => {
        console.error('err', err);
        setLoading(false);
      });
  };

  const getTags = () => {
    // get all tags for all journal entries for current user
    getJournalTags().then((res) => {
      let list = [];
      res.forEach((item) => {
        let array = noteCategoryConsts.filter((val) => val.label == item);
        if (array.length == 0) {
          list.push({ value: item, label: item });
        }
      });

      setTagsList([...noteCategoryConsts, ...list]);
    });
  };

  const handleLoadMore = (e) => {
    e.preventDefault();

    const length = showedEntries.length;
    setShowedEntries([
      ...showedEntries,
      ...entries.slice(length, length + itemsLoadPerClick),
    ]);
  };

  const handleChangeDate = (value, key) => {
    setFormValue({
      ...formValues,
      [key]: value,
    });
  };

  const handleClickTitle = (e, entry) => {
    e.preventDefault();
    props.selectEntry(entry);
  };

  const handleReadMore = (e, index) => {
    e.preventDefault();
    setListReadMore({
      ...listReadMore,
      [index]: !listReadMore[index],
    });
  };

  useImperativeHandle(ref, () => ({
    reRunAPIs() {
      getEntries();
      getTags();
    },
  }));

  useEffect(() => {
    getEntries();
    getTags();
  }, []);

  useEffect(() => {
    getEntries();
    getTags();
  }, [isImpersonationMode]);

  useEffect(() => {
    setShowedEntries(entries.slice(0, itemsLoadPerClick));
  }, [entries]);

  const deleteRecord = (item) => {
    setDeleteId(item.id);
    setShowModal(true);
  };

  function handleConfirmDelete() {
    setDeleteId('');
    setShowModal(false);
    setLoading(true);
    removeJournalEntry(deleteId)
      .then((res) => {
        getEntries();
      })
      .catch((err) => {
        setLoading(false);
        if (err[0]) {
          showErrorToast(err[0]);
        }
      });
  }

  function handleCloseDelete() {
    setDeleteId('');
    setShowModal(false);
  }

  const renderDescription = (description, index) => {
    const isReadMore = listReadMore[index];
    const text = isReadMore ? 'Read Less' : 'Read More';
    const { length, separator } = optionsTruncate;
    const charEnd = description[length];
    let truncateValue = '';

    if (!charEnd) {
      truncateValue = description;
    } else if (charEnd === ' ') {
      truncateValue = truncate(description, {
        ...optionsTruncate,
        length: length + separator.length,
      });
    } else {
      const indexNextSpace = description.slice(length).indexOf(' ');

      if (indexNextSpace !== -1) {
        truncateValue = truncate(description, {
          ...optionsTruncate,
          length: length + indexNextSpace + separator.length,
        });
      } else {
        truncateValue = description;
      }
    }

    if (!description) {
      return null;
    }

    return (
      <div className="journal-entry__description">
        <div
          dangerouslySetInnerHTML={{
            __html: isReadMore ? description : truncateValue,
          }}
        />
        {truncateValue && truncateValue !== description && (
          <>
            &nbsp;
            <a href="#" onClick={(e) => handleReadMore(e, index)}>
              {text}
            </a>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="w-full journal-entries">
      <HelpBox
        title="My Notes"
        firstLine="How to use this tool? Find answers in our help section"
        hash="/help#journal"
      />

      <p>
        Use this tool to keep notes or as a personal journal. Notes can be
        assigned to any of the listed categories, or you can create your own.
        Search by date, category, or keywords. You can also associate a note to
        a specific calendar event (like an upcoming healthcare visit)
      </p>

      <hr className="horizontal-line"></hr>

      <Form onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="journal-entry-form">
            <p className="journal-entry-form__left-title mr-10">
              Sort entries by:
            </p>
            <div className="journal-entry-form__left sort-item">
              <div className="input-datapicker-group input-start-date mr-10">
                <Field
                  name="startDate"
                  className="input-datapicker date"
                  placeholder="Start Date"
                  currentDate={formatDateNormal()}
                  component={DayPicker}
                  input={{
                    value: formValues.startDate,
                    onChange: (value) => handleChangeDate(value, 'startDate'),
                  }}
                  dayPickerProps={{
                    disabledDays: {
                      after: convertDate(formValues.endDate),
                    },
                  }}
                />
              </div>

              <div className="input-datapicker-group input-end-date mr-10">
                <Field
                  name="endDate"
                  className="input-datapicker date"
                  placeholder="End Date"
                  currentDate={formatDateNormal()}
                  component={DayPicker}
                  input={{
                    value: formValues.endDate,
                    onChange: (value) => handleChangeDate(value, 'endDate'),
                  }}
                  dayPickerProps={{
                    disabledDays: {
                      before: convertDate(formValues.startDate),
                    },
                  }}
                />
              </div>

              <div className="input-datapicker-group input-tag mr-10">
                <Select
                  isClearable
                  name="tag"
                  options={tagsList}
                  value={tag}
                  placeholder="Category"
                  onChange={changeTag}
                  className="filter-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div className="journal-entry-form__left">
              <div className="input-datapicker-group input-search mr-10">
                <i className="fa fa-search search-icon" />
                <Field
                  type="text"
                  name="search"
                  placeholder="Search.."
                  className="journal-search-input"
                  component={Input}
                />
              </div>

              <div className="m-xs-mt-10 m-xs-auto mr-10">
                <Button type="submit" className="btn -blue-btn">
                  Search
                </Button>
              </div>
            </div>

            {isEditAllowed && (
              <div className="journal-entry-form__right">
                <Button
                  type="button"
                  className="btn btn-purpure"
                  onClick={props.handleAddNote}
                >
                  <Edit />
                  Add New Note
                </Button>
              </div>
            )}
          </form>
        )}
      </Form>

      <div className="journal-entries-list">
        {entries && entries[0] ? (
          <>
            {showedEntries.map((entry, index) => (
              <div
                className="journal-entry"
                key={entry.id}
                role="button"
                tabIndex="0"
              >
                <div className="journal-entry__date flex">
                  <div>
                    {formatDateNormal(entry.createdAt)}
                    {entry.tags.map((tag) => ` | ${tag}`)}
                  </div>
                  {isEditAllowed && (
                    <i
                      className="fas fa-trash text-dark-blue font-15 cursor-pointer"
                      onClick={() => {
                        deleteRecord(entry);
                      }}
                      role="button"
                      tabIndex={0}
                    />
                  )}
                </div>
                {isEditAllowed ? (
                  <a
                    href="#"
                    className="journal-entry__title"
                    onClick={(e) => handleClickTitle(e, entry)}
                  >
                    {entry.title || ''}
                  </a>
                ) : (
                  <div className="journal-entry__title_normal">
                    {entry.title || ''}
                  </div>
                )}
                {renderDescription(entry.description || '', index)}
              </div>
            ))}
            {entries.length > showedEntries.length && (
              <div className="journal-entry__load-more">
                <a href="#" onClick={(e) => handleLoadMore(e)}>
                  Load more Previous Notes
                  <i className="fa fa-angle-down" />
                </a>
              </div>
            )}
          </>
        ) : (
          !isLoading && (
            <div className="journal-entries-list__no-result">
              No Results Found
            </div>
          )
        )}
      </div>

      {isLoading && <Loader />}

      <ConfirmModal
        title="Please confirm"
        message={'Are you sure you want to delete this item?'}
        isOpen={isShowModal}
        confirm={handleConfirmDelete}
        close={handleCloseDelete}
      />
    </div>
  );
});

export default JournalEntriesComponent;
