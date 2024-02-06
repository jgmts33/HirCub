import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  setAbleToImpersonate,
  setImpersonationMode,
} from '~/actions/permissions';
import { useAppDispatch } from '~/appState';
import {
  getImpersonateRequest,
  postImpersonateEmailRequest,
} from '~/requests/sharedAccess';
import Loader from '../Loader';
import './styles.scss';

const PatientEntries = forwardRef((props, ref) => {
  const titleList = [
    { key: 'email', value: 'Email' },
    { key: 'name', value: 'Name' },
    { key: 'editor', value: '' },
  ];
  const dispatch = useAppDispatch();
  const [entries, setEntries] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getEntries = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);

    getImpersonateRequest()
      .then((res) => {
        setEntries(res);
        dispatch(setAbleToImpersonate(true));
        setLoading(false);
      })
      .catch((err) => {
        console.error('err', err);
        setLoading(false);
      });
  };

  useImperativeHandle(ref, () => ({
    reRunAPIs() {
      getEntries();
    },
  }));

  useEffect(() => {
    getEntries();
  }, []);

  const onImpersonate = (item) => {
    postImpersonateEmailRequest(item.email)
      .then((res) => {
        const { authToken } = res;
        localStorage.setItem('authToken', authToken);
        dispatch(setImpersonationMode(true, item));

        setLoading(false);

        window.location.href = '/welcome';
      })
      .catch((err) => {
        console.error('err', err);
        setLoading(false);
      });
  };

  const renderEditButtons = (parent, style) => {
    return (
      <div className={`flex ${style || ''}`}>
        <div className="patient-entries-edit-style">
          <div
            className="patient-entries-button"
            onClick={() => onImpersonate(parent)}
            role="button"
            tabIndex={0}
          >
            Click to Impersonate
          </div>
        </div>
      </div>
    );
  };

  const renderPatientRow = (parent) => {
    return titleList.map((item) => (
      <div
        className={`patient-entries-item-container patient-entries-item-${item.key}`}
        key={`patient-item-${item.key}`}
      >
        <div className="patient-entries-item-title">{item.value}</div>
        <div className="patient-entries-item-value">
          {item.key == 'editor' ? renderEditButtons(parent) : parent[item.key]}
        </div>
      </div>
    ));
  };

  return (
    <div className="patient-entries">
      <hr />
      <h2 className="patient-entries-title">My patients</h2>

      <div className="patient-entries-list">
        <div className="patient-entries-header show-flex mt-30">
          {titleList.map((item, idx) => (
            <div
              key={`header-${item.key}`}
              className={`patient-entries-header-${item.key} flex`}
            >
              {item.value}
            </div>
          ))}
        </div>

        {entries && entries[0] ? (
          <>
            {entries.map((entry, index) => (
              <div
                className="patient-entries-row-sep"
                key={`patient-row-${index}`}
              >
                {renderPatientRow(entry)}
              </div>
            ))}
          </>
        ) : (
          !isLoading && (
            <div className="patient-entries-list__no-result">
              No Results Found
            </div>
          )
        )}
      </div>

      {isLoading && <Loader />}
    </div>
  );
});

export default PatientEntries;
