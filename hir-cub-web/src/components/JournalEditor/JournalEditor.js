import React, { useState, useRef, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { Input, BaseEditor } from '~/components/ui/formControls';
import { Button } from '~/components/ui';
import Loader from '../Loader';
import {
  createJournalEntry,
  updateJournalEntry,
  getJournalTags,
} from '~/requests/journalEntry';
import { getEventsRequest } from '~/requests/calendar';

import { ReactComponent as Notes } from '~/assets/svg/Notes.svg';
import { ReactComponent as Download } from '~/assets/svg/download.svg';

// helpers
import { trackGTM } from '~/utils';

// constants
import { MSG_GLOBAL, PermissionType } from 'src/consts';
import { TRACK_GTM, formatDateNormal, IsImpersonated } from '~/consts';
import { noteCategoryConsts } from './constants';
import { compareDate } from '~/consts/global';
import './styles.scss';
import { showErrorToast } from '../common';
import { usePermission } from '~/hooks';

function JournalEditor(props) {
  const MSG_REQUIRED = MSG_GLOBAL.REQUIRED;
  const editorRef = useRef(null);

  const { isImpersonationMode, isWriteAllowed } = usePermission(
    PermissionType.JournalEntry
  );
  const isImpersonation = IsImpersonated();

  const [entry, setEntry] = useState({});

  const [eventsList, setEventsList] = useState([]);
  const [tagsList, setTagsList] = useState(noteCategoryConsts);
  const [formValues, setFormValues] = useState({});
  const [isInvalidEditor, setInvalidEditor] = useState(false);

  const [tags, setTags] = useState([]);
  const [selectedEvent, setEvent] = useState([]);

  const [isLoadedEditor, setLoadedEditor] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const required = (value) => {
    return value ? undefined : MSG_REQUIRED;
  };

  const onHandleSubmit = (values) => {
    let data = { ...values };
    const editorValue = editorRef.current.getContent();

    setInvalidEditor(!editorValue);

    if (data.title && editorValue) {
      let selectedTags = [];
      tags.forEach((tag) => {
        selectedTags.push(tag.value);
      });

      data['description'] = editorValue;
      if (selectedEvent.value) {
        data['eventId'] = selectedEvent.value;
      }
      data['tags'] = selectedTags;

      setLoading(true);

      if (entry.id) {
        // update entry
        updateJournalEntry(data, entry.id)
          .then(() => {
            // journal is created
            setLoading(false);
            reRunAllAPIs();
          })
          .catch((err) => {
            console.error('err', err);
            setLoading(false);
            if (err[0]) {
              showErrorToast(err[0]);
            }
          });
      } else {
        // create entry
        createJournalEntry(data)
          .then((res) => {
            trackGTM(TRACK_GTM.CREATE_NOTE, {
              ...res,
              createdAt: formatDateNormal(res.createdAt),
            });
            setLoading(false);
            reRunAllAPIs();
          })
          .catch((err) => {
            console.error('err', err);
            setLoading(false);
            if (err[0]) {
              showErrorToast(err[0]);
            }
          });
      }
    }
  };

  const changeTags = (value) => {
    setTags(value);
  };

  const changeEvent = (value) => {
    setEvent(value);
  };

  const getEvents = () => {
    setLoading(true);
    // get all calendar events associated to all journal entries for current user
    getEventsRequest()
      .then((res) => {
        let list = [];

        let sortRes = res.sort((a, b) => {
          return compareDate(a.start, b.start, 0);
        });

        sortRes.forEach((item) => {
          list.push({ value: item.id, label: item.title });
        });

        setEventsList(list);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getTags = () => {
    // get all tags for all journal entries for current user
    getJournalTags()
      .then((res) => {
        let list = [];
        res.forEach((item) => {
          let array = noteCategoryConsts.filter((val) => val.label == item);
          if (array.length == 0) {
            list.push({ value: item, label: item });
          }
        });

        setTagsList([...noteCategoryConsts, ...list]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const onEditorChange = (value) => {
    setInvalidEditor(!value);
  };

  const reRunAllAPIs = () => {
    getEvents();
    getTags();
    props.reRunAPIs();
  };

  useEffect(() => {
    getEvents();
    getTags();
  }, []);

  useEffect(() => {
    if (!Object.values(props.entry)[0] || !isLoadedEditor) {
      return;
    }

    // set description
    const description = props.entry.description || '';
    const ele = editorRef.current;

    ele && ele.setContent(description, { format: 'html' });
  }, [props.entry, isLoadedEditor]);

  useEffect(() => {
    if (!Object.values(props.entry)[0]) {
      return;
    }

    // set entry
    setEntry(props.entry);

    // set title
    setFormValues({ title: props.entry.title });

    // select tags
    const tagTargets = tagsList.filter(
      (obj) => props.entry.tags.indexOf(obj.value) > -1
    );
    setTags(tagTargets.length > 0 ? tagTargets : []);

    // select Associated calendar event
    const eventTarget = eventsList.filter(
      (obj) => obj.value === props.entry.eventId
    );
    setEvent(eventTarget.length > 0 ? eventTarget[0] : []);
  }, [props.entry, tagsList, eventsList]);

  return (
    <div className="w-full journal-editor">
      <Form
        onSubmit={onHandleSubmit}
        initialValues={formValues}
        render={({ handleSubmit }) => {
          return (
            <form
              onSubmit={(event) => {
                setInvalidEditor(!editorRef.current.getContent());
                handleSubmit(event);
              }}
              className="journal-entry-form"
            >
              <div className="w-full mb-10">
                <Field
                  name="title"
                  placeholder="Enter title here"
                  component={Input}
                  validate={required}
                />
              </div>

              <div className="w-full mb-10">
                <div
                  className={`journal-entry-form__field ${
                    isInvalidEditor ? '--error' : ''
                  }`}
                >
                  <BaseEditor
                    editorRef={editorRef}
                    setLoaded={setLoadedEditor}
                    onEditorChange={onEditorChange}
                  />
                </div>
                {isInvalidEditor && (
                  <div className="error-msg">{MSG_REQUIRED}</div>
                )}
              </div>

              <div className="w-full journal-editor-row">
                <span className="journal-editor-row__title">
                  What did you write about?
                </span>
                <CreatableSelect
                  isMulti
                  name="tags"
                  options={tagsList}
                  value={tags}
                  onChange={changeTags}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder=""
                />
              </div>

              <div className="w-full journal-editor-row">
                <span className="journal-editor-row__title">
                  Does this relate to a calendar event?
                </span>
                <div className="journal-editor-row__wrapper">
                  <Select
                    name="eventId"
                    options={eventsList}
                    value={selectedEvent}
                    onChange={changeEvent}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isSearchable={false}
                    placeholder="Select an event from your calendar"
                  />
                </div>
              </div>

              <div className="w-full mt-30 journal-editor-action-buttons">
                <Button
                  type="button"
                  className="btn btn-full-blue"
                  onClick={props.handleBack}
                >
                  <Notes width={24} height={24} />
                  View All Notes
                </Button>
                {(!isImpersonation || isWriteAllowed) && (
                  <Button type="submit" className="btn btn-purpure">
                    <Download />
                    Save Note
                  </Button>
                )}
              </div>

              {isLoading && <Loader />}
            </form>
          );
        }}
      />
    </div>
  );
}

export default JournalEditor;
