import React, { useMemo, useState, useEffect, useCallback } from 'react';

import './ReportsBlock.scss';
import '../../DashboardWelcome/style.scss';

// components
import Select from 'react-select';
import Symptoms from './Symptoms';
import Concerns from './Concerns';
import Happiness from './Happiness';
import CareNeedsReport from './CareNeedsReport';

// constants
import { currentPathName, ListTab, PatientExceptionTabs } from './constants';

import { AccountType } from '~/consts';
import useAppState from '~/appState';


const ReportsBlock = ({ dateFrom, dateTo, isSearching }) => {
  const {
    global: { accountType },
  } = useAppState();

  let listTab = ListTab;
  if (accountType === AccountType.Patient) {
    listTab = listTab.filter(
      (tab) => !PatientExceptionTabs.includes(tab.value)
    );
  }

  const [currentTab, setCurrentTab] = useState(listTab[0]);

  const changeTabItem = useCallback((tab) => {
    setCurrentTab(tab);
    window.history.pushState(null, '', `${currentPathName}${tab.value}`);
  }, []);

  const handleChangeTab = (e, tab) => {
    e.preventDefault();

    changeTabItem(tab);
  };

  const handleUrl = () => {
    const pathName = window.location.pathname.split(currentPathName)[1];

    if (!pathName) {
      setCurrentTab(listTab[0]);
      return;
    }

    const matchedItem = listTab.find(({ value }) => value === pathName);

    if (!matchedItem) {
      setCurrentTab(listTab[0]);
      return;
    }

    setCurrentTab(matchedItem);
  };

  const renderContentTab = useMemo(() => {
    switch (currentTab.value) {
      case 'symptoms':
        return <Symptoms
          dateFrom={dateFrom}
          dateTo={dateTo}
          isSearching={isSearching}
        />;
      case 'concerns':
        return <Concerns
          dateFrom={dateFrom}
          dateTo={dateTo}
        />;
      case 'happiness':
        return <Happiness
          dateFrom={dateFrom}
          dateTo={dateTo}
        />;
      case 'care-needs':
        return <CareNeedsReport
        dateFrom={dateFrom}
        dateTo={dateTo}
      />;
      default:
        return <div>{currentTab.label}</div>;
    }
  }, [currentTab, dateFrom, dateTo, isSearching]);

  useEffect(() => {
    handleUrl();

    window.addEventListener('popstate', handleUrl);

    return () => {
      window.removeEventListener('popstate', handleUrl);
    };
  }, []);

  return (
    <div className="reports-screen content-block">
      <div className="tabs-combo">
        <Select
          name="selectedTab"
          options={listTab}
          value={currentTab}
          onChange={changeTabItem}
          className="tabs-select"
          classNamePrefix="select"
          isSearchable={false}
          placeholder="Select Tab"
        />
      </div>
      <div className="tabs-block">
        <ul className="tabs-block-list">
          {
            listTab.map((tab, index) => {
              const active = currentTab.value === tab.value ? '-active' : '';

              return (
                <li
                  key={index}
                  className={`tabs-block-item ${active}`}
                >
                  <a href="#" onClick={(e) => handleChangeTab(e, tab)}>
                    {tab.label}
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
      <div className="tabs-block-content">
        {renderContentTab}
      </div>
    </div>
  );
};

export default ReportsBlock;
