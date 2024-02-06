import React, { useState, useRef, useEffect } from 'react';

import JournalEntries from '~/components/JournalEntries';
import JournalEditor from '~/components/JournalEditor';
import { getJournalEntry } from '~/requests/journalEntry';

function Journal() {
  const [defaultEntryId, setDefaultEntryId] = useState(null);
  const [isAddNote, setAddNote] = useState(false);
  const [entry, setEntry] = useState({});
  const [isFirstRender, setFirstRender] = useState(false);
  const childRef = useRef();

  const selectEntry = (entry) => {
    setEntry(entry);
    setAddNote(true);
  };

  const reRunAPIs = () => {
    setAddNote(false);
    childRef.current.reRunAPIs();
    window.history.pushState(null, '', '/notes');
  };

  const handleNotePageChange = () => {
    const pathParams = window.location.pathname.split(['/']);
    const urlPath = pathParams[1];

    setDefaultEntryId(pathParams[2]);
    if (!pathParams[2]) {
      clearEntry();
    }
    setAddNote(!!['add-note', 'note'].includes(urlPath));
  };

  useEffect(() => {
    window.addEventListener('popstate', () => {
      handleNotePageChange();
    });

    if (!isFirstRender) {
      handleNotePageChange();
      setFirstRender(true);
    }
  }, []);

  const clearEntry = () => {
    setEntry({});
    setDefaultEntryId(null);
  };

  useEffect(() => {
    if (isAddNote) {
      const entryId = (entry && entry.id) || defaultEntryId;

      if (entryId) {
        (async () => {
          const entryRes = await getJournalEntry(entryId);
          setDefaultEntryId(null);
          setEntry(entryRes);
        })();
        if (window.location.pathname !== `/note/${entryId}`) {
          window.history.pushState(null, '', `/note/${entryId}`);
        }
      } else {
        setEntry({});
        if (window.location.pathname !== '/add-note') {
          window.history.pushState(null, '', '/add-note');
        }
      }
    }
  }, [isAddNote]);

  const handleBack = () => {
    setAddNote(false);
    clearEntry();
    window.history.pushState(null, '', '/notes');
  };

  const handleAddNote = () => {
    clearEntry();
    setAddNote(true);
    window.history.pushState(null, '', '/notes');
  };

  return (
    <div className="health-tracker-page md-pb-50 lg-pb-30 sm-pb-20 relative">
      <div className="container">
        {isAddNote
          ? (
            <JournalEditor
              key={entry && entry.id}
              entry={entry}
              reRunAPIs={reRunAPIs}
              handleBack={handleBack}
            />
          )
          : (
            <JournalEntries
              handleAddNote={handleAddNote}
              selectEntry={selectEntry}
              ref={childRef}
            />
          )
        }
      </div>
    </div>
  );
}

export default Journal;
