import React, { useEffect, useState } from 'react';
import { useGetProfileDataFetchOnce } from '~/hooks/requests';
import ProfileInfo from '~/components/profileInfo';
import ProfileShare from '~/components/profileShare';
import AsideCalendar from '~/components/asideCalendar';
import ProfileQuestion from '~/components/profileQuestion';
import CaregivingForm from '~/components/caregivingForm';
import ReminderForm from '~/components/reminderForm';
import Select from 'react-select';

// helpers
import { trackGTM } from '~/utils';
import { usePermission } from '~/hooks';

// constants
import {
  TRACK_GTM,
  ProfileLinkList,
  PermissionType,
  ProfileTabsForCaregiver,
  ProfileTabsForPatient,
} from '~/consts';
import PatientForm from '~/components/PatientForm';

import useAppState, { useAppDispatch } from '~/appState';
import { AccountType } from '~/consts';
import { setProfileInfo } from '~/actions/global';

function Profile() {
  const {
    global: { accountType },
  } = useAppState();
  const dispatch = useAppDispatch();

  const listUpdate = ['0'];
  const { isImpersonationMode } = usePermission(PermissionType.Profile);

  const [profileData, setProfileData] = useState(null);
  const [profileDataErrors] = useGetProfileDataFetchOnce((res) => {
    trackGTM(TRACK_GTM.ACCESS_PROFILE, {
      userId: res.id,
    });
    dispatch(
      setProfileInfo({
        screenName: res.profile.screenName,
        email: res.profile.email,
        backgroundImageId: res.profile.backgroundImageCode,
        profileColor: res.profile.profileColor,
      })
    );
    setProfileData(res);
  });

  let myProfileList =
    accountType === AccountType.Patient
      ? ProfileTabsForPatient
      : ProfileTabsForCaregiver;

  const profileTabList = isImpersonationMode
    ? [{ value: myProfileList[0].url, label: myProfileList[0].title }]
    : myProfileList.map((item, index) => {
      return { value: item.url, label: item.title };
    });

  const profileLinkList = isImpersonationMode
    ? [myProfileList[0].url]
    : myProfileList.map((item) => {
      return item.url;
    });

  const setProfileSubLinkInHistory = (link) => {
    if (link == 'my') {
      window.history.pushState(null, '', '/profile');
    } else {
      window.history.pushState(null, '', `/profile/${link}`);
    }
  };

  const [key, setKey] = useState('1');
  const handleChangeKey = (e, newKey) => {
    e.preventDefault();
    if (key == newKey) {
      return;
    }
    setKey(newKey);
    setProfileSubLinkInHistory(newKey);
  };

  const getClassNameItem = (tab) => {
    let className = 'tabs-bar-item';

    if (tab == key) {
      className += ' -active';
    }

    return className;
  };
  const [selectedTab, setSelectedTab] = useState(profileTabList[0]);
  const changeTabItem = (tab) => {
    if (selectedTab.value == tab.value) {
      return;
    }

    setSelectedTab(tab);
    setKey(tab.value);

    setProfileSubLinkInHistory(tab.value);
  };

  useEffect(() => {
    const pathParams = window.location.pathname.split(['/']);
    let category = pathParams[2];

    if (!category || !profileLinkList.includes(category)) {
      if (key != profileLinkList[0]) {
        setSelectedTab(profileTabList[0]);
        setKey(profileLinkList[0]);
        setProfileSubLinkInHistory(profileLinkList[0]);
      }
      return;
    }

    let idx = profileLinkList.indexOf(category);
    if (idx == 0) {
      idx = 1;
      category = profileLinkList[0];
    }

    if (key != category) {
      setSelectedTab(profileTabList[idx]);
      setKey(category);
    }
    //setProfileSubLinkInHistory(category);
  }, [listUpdate]);

  return (
    <React.Fragment>
      <div className="page profile-page page-has-separate-bg relative md-pb-50 lg-pb-30 sm-pb-20">
        <div className="profile-page-content">
          <div className="container flex flex-jc">
            {!isImpersonationMode && (
              <AsideCalendar
                onView={(date) => {
                  window.open(`/calendar/${date}`, '_self');
                }}
                onAddEvent={(date) => {
                  window.open(`/calendar_add/${date}`, '_self');
                }}
              />
            )}
            <div className="content-block">
              <div className="tabs-combo">
                <Select
                  name="selectedTab"
                  options={profileTabList}
                  value={selectedTab}
                  onChange={changeTabItem}
                  className="tabs-select"
                  classNamePrefix="select"
                  isSearchable={false}
                  placeholder="Select Tab"
                />
              </div>

              <div className="tabs-bar">
                <ul className="tabs-bar-list">
                  {profileTabList.map((item, i) => {
                    return (
                      <li
                        className={getClassNameItem(item.value)}
                        key={`tab-${i}`}
                      >
                        <a
                          href="#"
                          onClick={(e) => handleChangeKey(e, item.value)}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="tabs-bar-content">
                {key === ProfileLinkList[0].url && (
                  <div>
                    {profileDataErrors && (
                      <div className="text-center">{profileDataErrors}</div>
                    )}
                    {profileData ? (
                      <>
                        <ProfileInfo profileData={profileData.profile} />
                        <ProfileQuestion profileData={profileData} />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
                {key === ProfileLinkList[1].url && <ProfileShare />}
                {key === ProfileLinkList[2].url && (
                  <CaregivingForm option="1" />
                )}
                {key === ProfileLinkList[3].url && <ReminderForm />}
                {key === ProfileLinkList[4].url && <PatientForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
