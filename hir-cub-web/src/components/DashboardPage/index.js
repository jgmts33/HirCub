import React, { useState, useEffect } from 'react';

import DashboardWelcome from '~/components/DashboardWelcome';
import HealthTracker from '~/pages/healthTracker';
import Journal from '~/pages/journal';
import FinanceTracker from '~/pages/financeTracker';
import LibraryTab from '~/pages/library';
import MedicationTracker from '~/pages/medicationTracker';
import CareNeedsTool from '~/pages/careNeedsTool';

import {
  AccountType,
  CaregiverExceptionUrls,
  DashboardTabList,
  PermissionAllow,
} from '~/consts';
import { usePermission } from '~/hooks';

import Select from 'react-select';

import './styles.scss';
import useAppState from '~/appState';

const DashboardPage = () => {
  const { isImpersonationMode, roles } = usePermission();
  const {
    global: { accountType },
  } = useAppState();

  const tabListDefault = DashboardTabList;

  const [key, setKey] = useState(tabListDefault[0].url);
  const [notePath, setNotePath] = useState(null);
  const [tabList, setTabList] = useState([tabListDefault[0]]);
  const [linkList, setLinkList] = useState(['welcome']);
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [selectedTab, setSelectedTab] = useState(tabListDefault[0]);

  const realPath = window.location.pathname.split('/')[1];
  if (key !== realPath) {
    setKey(realPath);
  }
  const handleChangeKey = (e, newKey) => {
    e.preventDefault();

    if (key == newKey) {
      const isNotePath = ['add-note', 'note', 'notes'].includes(realPath);
      if (!isNotePath) {
        return;
      }
    }

    setKey(newKey);
    setNotePath(null);
    window.history.pushState(null, '', `/${newKey}`);
  };

  const getClassNameItem = (tab) => {
    let classNames = 'tabs-block-item';

    if (tab == key) {
      classNames += ' -active';
    }

    return classNames;
  };

  const changeTabItem = (tabItem) => {
    if (selectedTab.tabKey == tabItem.tabKey) {
      return;
    }

    setSelectedTab(tabItem);
    setKey(tabItem.url);

    setNotePath(null);
    window.history.pushState(null, '', `/${tabItem.url}`);
  };

  const updateLinkList = () => {
    // filter by impersonated
    let tabList = isImpersonationMode
      ? tabListDefault.filter((tab) =>
          roles.find(
            (item) =>
              item.tabKey == tab.tabKey && item.allowed !== PermissionAllow.None
          )
        )
      : tabListDefault;

    if (accountType == AccountType.CareGiver) {
      tabList = tabList.filter(
        (tab) => !CaregiverExceptionUrls.includes(tab.url)
      );
    }

    if (tabList.length > 0) {
      setKey(tabList[0].url);
    }
    setLinkList(tabList.map((item) => item.url));
    setTabList(tabList);
  };

  useEffect(() => {
    updateLinkList();
  }, [isImpersonationMode]);

  useEffect(() => {
    const pathName = window.location.pathname.split('/')[1];
    const isNotePath = ['add-note', 'note', 'notes'].includes(pathName);
    let idx = linkList.indexOf(isNotePath ? 'notes' : pathName);

    if (isFirstLoad) {
      setFirstLoad(false);
      return;
    }

    if (!pathName || !linkList.includes(pathName)) {
      if (key != linkList[0]) {
        setSelectedTab(tabList[0]);
        setKey(linkList[0]);
      }
      window.history.pushState(null, '', `/${linkList[0]}`);
      return;
    }

    if (!notePath && isNotePath) {
      setNotePath(window.location.pathname);
    }

    let category = pathName;
    if (idx == 0) {
      idx = 1;
      category = linkList[0];
    }
    if (key != category) {
      setSelectedTab(tabList[idx]);
      setKey(category);
    }
  }, [linkList]);

  return (
    <div className="dashboard-sub-page content-block">
      <div className="tabs-combo">
        <Select
          name="selectedTab"
          options={tabList}
          value={selectedTab}
          onChange={changeTabItem}
          className="tabs-select"
          classNamePrefix="select"
          isSearchable={false}
          placeholder="Select Tab"
        />
      </div>

      <div className="tabs-block">
        <ul className="tabs-block-list">
          {tabList.map((item, i) => {
            return (
              <li
                key={`tab-block-item_${i}`}
                className={getClassNameItem(item.url)}
              >
                <a href="#" onClick={(e) => handleChangeKey(e, item.url)}>
                  {item.icon}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="tabs-block-content">
        {key == tabListDefault[0].url && <DashboardWelcome />}
        {key == tabListDefault[1].url && <LibraryTab />}
        {key == tabListDefault[2].url && <Journal key={notePath} />}
        {key == tabListDefault[3].url && <FinanceTracker />}
        {key == tabListDefault[4].url && <HealthTracker />}
        {key == tabListDefault[5].url && <MedicationTracker />}
        {key == tabListDefault[6].url && <CareNeedsTool />}
      </div>
    </div>
  );
};

export default DashboardPage;
