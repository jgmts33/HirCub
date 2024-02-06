import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Form, Field } from 'react-final-form';
import {
  createMedicationRequest,
  getMedicationRequest,
  updateMedicationRequest,
  removeMedicationRequest,
} from '~/requests/medication';
import { Button } from '~/components/ui';
import { Input, DayPicker } from '~/components/ui/formControls';
import ConfirmModal from '../modals/confirmModal';
import { CSVLink } from 'react-csv';
import './styles.scss';

import { applyRules, required } from 'validator-forms';

// helpers
import useAppState from '~/appState';
import { trackGTM } from '~/utils';
import { usePermission } from '~/hooks';

// constants
import { TRACK_GTM, PermissionType } from '~/consts';
import { formatDateNormal, formatDateStandard } from '~/consts';
import { compareDate, compareString } from '~/consts/global';
import Loader from '../Loader';
import HelpBox from '../HelpBox';
import ErrorsBlock from '../shared/errorsBlock';

const itemValidation = applyRules([required(' ')]);

function validate(values) {
  let errors = {};

  const medicationError = itemValidation(values.medication);
  if (medicationError) {
    errors.medication = medicationError;
  }

  return errors;
}

const itemsLoad = 5;

const activeList = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const titleList = [
  { key: 'date', value: 'Date' },
  { key: 'medication', value: 'Medication' },
  { key: 'purpose', value: 'Purpose' },
  { key: 'dose', value: 'Dose' },
  { key: 'schedule', value: 'Schedule' },
  { key: 'active', value: 'Active' },
  { key: 'editor', value: ' ' },
];

const csvHeaders = [
  { key: 'date', label: 'Date' },
  { key: 'medication', label: 'Medication' },
  { key: 'purpose', label: 'Purpose' },
  { key: 'dose', label: 'Dose' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'active', label: 'Active' },
];

function MedicationListComponent(props) {
  let submit;

  const {
    global: { userId },
  } = useAppState();

  const { isImpersonationMode, isWriteAllowed } = usePermission(
    PermissionType.MedicationTracker
  );

  const [medications, setMedications] = useState([]);
  const [backupMedications, setBackupMedications] = useState([]);
  const [showedEntries, setShowedEntries] = useState([]);
  const [active, setActive] = useState(activeList[0]);
  const [current, setCurrent] = useState({});

  const [showInactive, setShowInactive] = useState(true);
  const [deleteId, setDeleteId] = useState('');
  const [sortIdx, setSortIdx] = useState(0);

  const [isShowModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [serverErrors, setSeverErrors] = useState(null);

  const isWritePermissionAllowed = !isImpersonationMode || isWriteAllowed;

  const getMedicationList = () => {
    setLoading(true);
    getMedicationRequest().then((res) => {
      trackGTM(TRACK_GTM.ACCESS_MEDICATION_TRACKER, {
        numberOfMedications: res.length,
        userId,
      });
      setMedications(res);
      setBackupMedications(res);
      setLoading(false);
    });
  };

  const getValidData = (values) => {
    let data = { ...values };

    data['date'] = formatDateStandard(data['date']);
    data['active'] = active.value === activeList[0].value;
    data['time'] = '1';

    if (data['purpose'] == undefined) {
      data['purpose'] = '';
    }

    if (data['dose'] == undefined) {
      data['dose'] = '';
    }

    if (data['schedule'] == undefined) {
      data['schedule'] = '';
    }

    return data;
  };

  const handleSubmitData = (values) => {
    if (isLoading) {
      return;
    }
    let data = getValidData(values);

    setLoading(true);
    // create medication
    createMedicationRequest(data)
      .then((res) => {
        trackGTM(TRACK_GTM.CREATE_MEDICATION, res);
        getMedicationList();
        resetForm();
      })
      .catch((err) => {
        setSeverErrors(err);
        setLoading(false);
      });
  };

  const handleUpdateData = (values) => {
    if (isLoading) {
      return;
    }
    let data = getValidData(values);

    setLoading(true);
    // update medication
    updateMedicationRequest(data, current.id)
      .then((res) => {
        getMedicationList();
        resetForm();
      })
      .catch((err) => {
        setSeverErrors(err);
        setLoading(false);
      });
  };

  const handleLoadMore = (e) => {
    e.preventDefault();

    const length = showedEntries.length;
    setShowedEntries([
      ...showedEntries,
      ...medications.slice(length, length + itemsLoad),
    ]);
  };

  const resetForm = () => {
    setCurrent({});
    setActive(activeList[0]);
  };

  const toggleHide = () => {
    setShowInactive(!showInactive);

    setMedications(getSortResult(!showInactive, sortIdx));
    let size = showedEntries.length;
    setShowedEntries(medications.slice(0, size));
  };

  const selectRecord = (item) => {
    setCurrent(item);

    const activeStatus = activeList[item.active ? 0 : 1].value;
    setActive(activeList.filter((obj) => obj.value === activeStatus)[0]);
  };

  const deleteRecord = (item) => {
    setDeleteId(item.id);
    setShowModal(true);
  };

  function handleConfirmDelete() {
    setDeleteId('');
    setShowModal(false);
    setLoading(true);
    removeMedicationRequest(deleteId).then((res) => {
      getMedicationList();
      resetForm();
    });
  }

  function handleCloseDelete() {
    setDeleteId('');
    setShowModal(false);
  }

  const csvData = () => {
    let csv = medications.map((medication) => {
      let row = {};
      csvHeaders.map((item) => {
        if (item.key == 'date') {
          row[item.key] = formatDateNormal(medication.date);
        } else if (item.key == 'active') {
          row[item.key] = activeList[medication.active ? 0 : 1].label;
        } else {
          row[item.key] = medication[item.key];
        }
      });
      return row;
    });

    return csv;
  };

  const handlePrint = () => {
    if (isLoading) {
      return;
    }
    window.print();
  };

  const handleSort = (idx) => {
    if (isLoading) {
      return;
    }
    let resIdx = idx + 1;
    if (Math.abs(sortIdx) == resIdx) {
      resIdx = 0 - sortIdx;
    } else {
      resIdx = 0 - resIdx;
    }
    setSortIdx(resIdx);
    setMedications(getSortResult(showInactive, resIdx));
    let size = showedEntries.length;
    setShowedEntries(medications.slice(0, size));
  };

  const getSortResult = (inactive, sort) => {
    let result = backupMedications;
    if (!inactive) {
      result = backupMedications.filter((obj) => obj.active === true);
    }
    if (sort != 0) {
      if (sort == 1 || sort == -1) {
        // date
        result.sort((a, b) => {
          return compareDate(a.date, b.date, sort);
        });
      } else if (sort == 2 || sort == -2) {
        // medication
        result.sort((a, b) => {
          return compareString(a.medication, b.medication, sort);
        });
      } else {
        // purpose
        result.sort((a, b) => {
          return compareString(a.purpose, b.purpose, sort);
        });
      }
    }
    return result;
  };

  useEffect(() => {
    getMedicationList();
  }, []);

  useEffect(() => {
    setShowedEntries(medications.slice(0, itemsLoad));
  }, [medications]);

  const renderEditButtons = (medication, style) => {
    return (
      <div className={`flex ${style}`}>
        <div className="medication-edit-style">
          <i
            className="fas fa-edit text-dark-blue font-15 cursor-pointer"
            onClick={() => {
              selectRecord(medication);
            }}
            role="button"
            tabIndex={0}
          />
        </div>
        <div className="medication-delete-style">
          <i
            className="fas fa-trash text-dark-blue font-15 cursor-pointer"
            onClick={() => {
              deleteRecord(medication);
            }}
            role="button"
            tabIndex={0}
          />
        </div>
      </div>
    );
  };

  const renderMedicationRow = (medication) => {
    return titleList.map((item) => (
      <div
        className={`medication-item-container pr-10 medication-item-${item.key}`}
        key={`medication-${item.key}`}
      >
        <div className="medication-item-title">{item.value}</div>
        <div className="medication-item-value">
          {item.key !== 'active'
            ? item.key !== 'date'
              ? item.key !== 'editor'
                ? medication[item.key]
                : isWritePermissionAllowed &&
                  renderEditButtons(medication, 'show-flex')
              : formatDateNormal(medication[item.key])
            : activeList[medication.active ? 0 : 1].label}
        </div>
      </div>
    ));
  };

  const renderSubmitData = (onSubmit, values, renderChild) => {
    return (
      <Form
        onSubmit={onSubmit}
        initialValues={values}
        validate={validate}
        render={({ handleSubmit }) => {
          submit = handleSubmit;
          return (
            <form onSubmit={handleSubmit} className="medication-row-contain">
              <div className="medication-add-row">
                {titleList.map((item) => (
                  <div
                    key={`row-${item.key}`}
                    className={`medication-add-item pr-10 medication-item-${item.key}`}
                  >
                    <span className="medication-span">{item.value}</span>
                    {item.key !== 'active' ? (
                      item.key !== 'date' ? (
                        item.key !== 'editor' ? (
                          <Field
                            type="text"
                            name={item.key}
                            component={Input}
                          />
                        ) : (
                          <></>
                        )
                      ) : (
                        <Field
                          name={item.key}
                          className="input-datapicker date"
                          initialValue={formatDateNormal(values['date'])}
                          component={DayPicker}
                        />
                      )
                    ) : (
                      <Select
                        name="active"
                        className="medication-active--select"
                        options={activeList}
                        value={active}
                        onChange={(value) => setActive(value)}
                        classNamePrefix="select"
                        isSearchable={false}
                      />
                    )}
                  </div>
                ))}
              </div>

              {renderChild(submit)}
            </form>
          );
        }}
      />
    );
  };

  const arrowName = (idx) => {
    if (Math.abs(sortIdx) == idx && sortIdx < 0) {
      return 'fa-arrow-up';
    }
    return 'fa-arrow-down';
  };

  return (
    <div className="w-full medication-list">
      <HelpBox
        title="&nbsp;"
        firstLine="How to use this tool? Examples of using this tool? Find answers in our help section"
        hash="/help#medication"
      />

      <div className="mt-30 medication-title-wrapper">
        <div className="medication-title">Medication list</div>
        <div className="medication-button-group">
          <Button
            kind="purpure"
            onClick={toggleHide}
            style={{ marginRight: 6 }}
          >
            {showInactive ? 'Hide' : 'Show'} inactive
          </Button>

          <CSVLink
            data={csvData()}
            headers={csvHeaders}
            filename="medications.csv"
            className="btn btn-purpure"
            style={{ marginRight: 6, lineHeight: '20px' }}
          >
            Export
          </CSVLink>

          <Button
            kind="full-blue"
            onClick={handlePrint}
            style={{ marginTop: 4 }}
          >
            <i className="fas fa-print" />
            &nbsp;Print
          </Button>
        </div>
      </div>

      <div className="medication-table-header show-flex mt-30">
        {titleList.map((item, idx) => (
          <div
            key={`header-${item.key}`}
            className={`medication-item-${item.key} flex`}
          >
            {item.value}
            {idx < 3 && (
              <i
                className={`fas ${arrowName(idx + 1)} mx-5 mt-5 cursor-pointer`}
                onClick={(event) => {
                  handleSort(idx);
                }}
                role="button"
                tabIndex={0}
              />
            )}
          </div>
        ))}
      </div>

      <div className="medication-table-header show-flex-mobile mt-30">
        {titleList.map((item, idx) =>
          idx < 3 ? (
            <div
              key={`header-${item.key}`}
              className={`medication-item-${item.key} flex`}
            >
              {item.value}
              <i
                className={`fas ${arrowName(idx + 1)} mx-5 mt-5 cursor-pointer`}
                onClick={(event) => {
                  handleSort(idx);
                }}
                role="button"
                tabIndex={0}
              />
            </div>
          ) : (
            <></>
          )
        )}
      </div>

      <div className="medication-table-content">
        {medications && medications.length > 0 ? (
          <>
            {showedEntries.map((medication, key) => (
              <div
                className="medication-table-row"
                key={`medication-row-${key}`}
              >
                {current.id == medication.id ? (
                  renderSubmitData(handleUpdateData, current, (submit) => {
                    return (
                      <div className="medication-row-sep mt-space">
                        <div className="medication-add-item w-90">
                          <span>Notes about this medication</span>
                          <Field type="text" name="notes" component={Input} />
                        </div>

                        <div className="flex">
                          <div className="medication-add-item medication-check-btn">
                            <i
                              className="fa fa-check-circle text-dark-blue font-24 mx-5 cursor-pointer"
                              onClick={(event) => {
                                submit(event);
                              }}
                              role="button"
                              tabIndex={0}
                            />
                          </div>

                          {isWritePermissionAllowed && (
                            <div className="medication-add-item medication-plus-btn">
                              <i
                                className="fa fa-times-circle text-dark-blue font-24 mx-5 cursor-pointer"
                                onClick={(event) => {
                                  setCurrent({});
                                }}
                                role="button"
                                tabIndex={0}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="medication-row-sep">
                      {renderMedicationRow(medication)}
                    </div>

                    <div className="medication-row-sep show-flex mt-space">
                      <div className="medication-add-item w-90">
                        <span>
                          <b>Notes: </b>
                          {medication.notes}
                        </span>
                      </div>
                    </div>

                    <div className="medication-item-container show-block-mobile">
                      <div className="medication-item-title">Notes</div>
                      <div className={`medication-item-purpose`}>
                        {medication.notes}
                      </div>
                    </div>

                    {isWritePermissionAllowed && (
                      <div className="medication-item-container show-block-mobile">
                        {renderEditButtons(medication, 'ml-20 mt-10')}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {medications.length > showedEntries.length && (
              <div className="medication-list__load-more">
                <a href="#" onClick={(e) => handleLoadMore(e)}>
                  Load more Medications
                  <i className="fa fa-angle-down" />
                </a>
              </div>
            )}
          </>
        ) : (
          !isLoading && (
            <div className="medication-list__no-result">No Results Found</div>
          )
        )}

        <div className="medication-table-row mt-space">
          {renderSubmitData(handleSubmitData, {}, (submit) => {
            return (
              <div className="medication-row-notes mt-space">
                <div className="medication-add-item w-90">
                  <span>Notes about this medication</span>
                  <Field type="text" name="notes" component={Input} />
                </div>

                {isWritePermissionAllowed && (
                  <div className="medication-add-item medication-plus-btn">
                    <i
                      className="fas fa-plus-circle text-dark-blue font-24 mx-5 cursor-pointer"
                      onClick={(event) => {
                        submit(event);
                      }}
                      role="button"
                      tabIndex={0}
                    />
                  </div>
                )}
              </div>
            );
          })}
          <div className="medication-row-notes mt-space">
            <ErrorsBlock errors={serverErrors} />
          </div>
        </div>
      </div>

      {isLoading && <Loader />}

      <ConfirmModal
        message={'Are you sure you want to delete this item?'}
        isOpen={isShowModal}
        confirm={handleConfirmDelete}
        close={handleCloseDelete}
      />
    </div>
  );
}

export default MedicationListComponent;
