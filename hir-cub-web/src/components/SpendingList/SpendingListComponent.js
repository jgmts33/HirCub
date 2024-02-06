import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Select from 'react-select';
import { Form, Field } from 'react-final-form';
import moment from 'moment';
import {
  getFinanceRecords,
  getFinanceCategories,
  deleteFinanceRecord,
} from '~/requests/financeRecord';
import { Button } from '~/components/ui';
import { DayPicker } from '~/components/ui/formControls';
import ConfirmModal from '../modals/confirmModal';
import { CSVLink } from 'react-csv';
import './styles.scss';

// helpers
import useAppState from '~/appState';
import { trackGTM } from '~/utils';

// constants
import { TRACK_GTM, PermissionType, PermissionAllow } from '~/consts';
import { formatDateNormal } from '~/consts';
import {
  checkDateIsBetween,
  checkDateIsAfter,
  checkDateIsBefore,
} from '~/consts/global';
import { formatDateString } from '~/consts/formatDateTime';

const SpendingListComponent = forwardRef((props, ref) => {
  const {
    global: { userId },
    permissions: { roles },
  } = useAppState();

  const titleList = [
    { key: 'category', value: 'Category' },
    { key: 'location', value: 'Location' },
    { key: 'amount', value: 'Amount' },
    { key: 'event', value: 'Event' },
    { key: 'date', value: 'Date' },
    { key: 'editor', value: ' ' },
  ];

  const csvHeaders = [
    { key: 'category', label: 'Category' },
    { key: 'location', label: 'Location' },
    { key: 'amount', label: 'Amount' },
    { key: 'event', label: 'Event' },
    { key: 'date', label: 'Date' },
  ];

  const [finances, setFinances] = useState([]);
  const [backupFinances, setBackupFinances] = useState([]);

  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const expensesTabPermission = roles.find(item => item.tabKey == PermissionType.Expenses);
  const isWritePermission = expensesTabPermission && expensesTabPermission.allowed == PermissionAllow.Write;

  const changeCategory = (value) => {
    setCategory(value);
  };

  const getSpendingList = () => {
    getFinanceRecords().then((res) => {
      trackGTM(TRACK_GTM.ACCESS_EXPENSES, {
        userId,
        numberOfExpenses: res.length,
      });
      setFinances(res);
      setBackupFinances(res);
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

  const handleSubmit = (formValues) => {
    let filter = { ...formValues };

    if (category && category.value) {
      filter.category = category.value;
    }

    let records = [...backupFinances];

    // need to apply filter
    if (filter.category) {
      // filter categories
      records = records.filter(
        (obj) => obj.categories.indexOf(filter.category) > -1
      );
    }

    if (filter.startDate && filter.endDate) {
      records = records.filter((obj) =>
        checkDateIsBetween(filter.startDate, filter.endDate, obj.date)
      );
    } else {
      if (filter.startDate) {
        records = records.filter((obj) =>
          checkDateIsAfter(filter.startDate, obj.date)
        );
      }

      if (filter.endDate) {
        records = records.filter((obj) =>
          checkDateIsBefore(filter.endDate, obj.date)
        );
      }
    }

    setFinances(records);
  };

  const selectRecord = (item) => {
    props.selectFinance(item);
  };

  const deleteRecord = (item) => {
    setDeleteId(item.id);
    setShowModal(true);
  };

  function handleConfirmDelete() {
    setDeleteId('');
    setShowModal(false);

    deleteFinanceRecord(deleteId).then((res) => {
      getSpendingList();
    });
  }

  function handleCloseDelete() {
    setDeleteId('');
    setShowModal(false);
  }

  const csvData = () => {
    let csv = finances.map((finance) => {
      let row = {};
      csvHeaders.map((item) => {
        if (item.key == 'date') {
          row[item.key] = formatDateNormal(finance.date);
        } else if (item.key == 'category') {
          row[item.key] = finance['categories'].join(',');
        } else if (item.key == 'event') {
          row[item.key] = finance[item.key]['description'];
        } else {
          row[item.key] = finance[item.key];
        }
      });
      return row;
    });

    return csv;
  };

  const handlePrint = () => {
    window.print();
  };

  useImperativeHandle(ref, () => ({
    reRunAPIs() {
      getSpendingList();
      getCategories();
    },
  }));

  useEffect(() => {
    getSpendingList();
    getCategories();
  }, []);

  const renderEditButtons = (finance, style) => {
    return (
      <div className={`flex ${style}`}>
        <div className="spending-edit-style text-center">
          <i
            className="fas fa-edit text-dark-blue cursor-pointer"
            onClick={() => {
              selectRecord(finance);
            }}
            role="button"
            tabIndex={0}
          />
        </div>
        <div className="spending-edit-style text-center">
          <i
            className="fas fa-trash text-dark-blue cursor-pointer"
            onClick={() => {
              deleteRecord(finance);
            }}
            role="button"
            tabIndex={0}
          />
        </div>
      </div>
    );
  };

  const renderTableRow = (finance) => {
    return titleList.map((item) => (
      <div
        className={`spending-item-container pr-10 spending-item-${item.key}`}
        key={`table-row-${item.key}`}
      >
        <div className="spending-item-title">{item.value}</div>
        <div className="spending-item-value">
          {item.key !== 'category'
            ? item.key !== 'date'
              ? item.key !== 'editor'
                ? item.key !== 'event'
                  ? finance[item.key]
                  : finance[item.key]['description']
                : (isWritePermission && renderEditButtons(finance, ''))
              : formatDateNormal(finance.date)
            : finance.categories.join(',')}
        </div>
      </div>
    ));
  };

  const renderSearchSection = (onSubmit) => {
    return (
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} className="spending-entry-form">
            <div className="entry-form-blocks">
              <div className="input-datapicker-group relative spending-search-row">
                <span className="spending-span">From:</span>
                <Field
                  name="startDate"
                  className="input-datapicker date"
                  placeholder=""
                  currentDate={moment().format(formatDateString)}
                  component={DayPicker}
                />
              </div>

              <div className="input-datapicker-group relative spending-search-row">
                <span className="spending-span">To:</span>
                <Field
                  name="endDate"
                  className="input-datapicker date"
                  placeholder=""
                  currentDate={moment().format(formatDateString)}
                  component={DayPicker}
                />
              </div>

              <div className="input-datapicker-group relative spending-search-row">
                <span className="spending-span">Category:</span>
                <Select
                  isClearable
                  name="category"
                  options={categoriesList}
                  value={category}
                  onChange={changeCategory}
                  className="spending-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div className="spending-search-row">
              <Button type="submit" kind="purpure">
                Search
              </Button>

              <CSVLink
                data={csvData()}
                headers={csvHeaders}
                filename="finances.csv"
                className="btn btn-purpure"
                style={{ marginLeft: 10, lineHeight: '20px' }}
              >
                Export
              </CSVLink>

              <Button
                kind="full-blue"
                onClick={handlePrint}
                style={{ marginLeft: 10 }}
              >
                <i className="fas fa-print" />
                &nbsp;Print
              </Button>
            </div>
          </form>
        )}
      </Form>
    );
  };

  const renderNoRows = () => {
    return (
      <div className="font-semibold text-center mt-30 mb-10">
        No data provided yet
      </div>
    );
  };

  return (
    <div className="w-full spending-list">
      <div className="mt-30 spending-title-wrapper">
        <span className="spending-title">Spending list</span>
      </div>
      <div>{renderSearchSection(handleSubmit)}</div>

      {finances.length > 0 ? (
        <>
          <div className="spending-table-header mt-30">
            {titleList.map((item, idx) => (
              <div
                key={`header-${item.key}`}
                className={`spending-item-${item.key} flex`}
              >
                {item.value}
              </div>
            ))}
          </div>

          <div className="spending-table-content">
            {finances.map((finance, key) => (
              <div className="spending-table-row" key={key}>
                {renderTableRow(finance)}
              </div>
            ))}
          </div>
        </>
      ) : (
        renderNoRows()
      )}
      <ConfirmModal
        message={'Are you sure you want to delete this item?'}
        isOpen={isShowModal}
        confirm={handleConfirmDelete}
        close={handleCloseDelete}
      />
    </div>
  );
});

export default SpendingListComponent;
