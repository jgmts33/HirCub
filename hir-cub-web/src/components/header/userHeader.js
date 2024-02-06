import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import useAppState, { useAppDispatch } from '~/appState';
import Select from 'react-select';
import Avatar from 'react-avatar';
import AvatarGroup from './avatarGroup';

import { MenuButton, Menu, SetFontSizeButtons } from '~/components/ui';

import { GetName, LOG } from '~/consts/global';
import { usePermission } from '~/hooks';
import {
  useGetImpersonate,
  useActiveImpersonate,
  useDeActiveImpersonate,
} from '~/hooks/requests';
import {
  setImpersonationMode,
  setAbleToImpersonate,
} from '~/actions/permissions';
import {
  getImpersonateRequest,
} from '~/requests/sharedAccess';
import {
  TRACK_GTM,
  AccountType,
  PermissionType,
} from '~/consts';
import {
  BannerList,
} from '../profileQuestion/consts';
import { login } from '~/actions/account';
import jwtDecode from 'jwt-decode';
import { trackGTM } from '~/utils';
import { PROFILE_IMAGE_URL } from '~/consts/urls';
import './styles.scss';

function UserHeader({ history }) {
  const dispatch = useAppDispatch();
  const {
    global: { accountType, userId, backgroundImageId, profileColor },
  } = useAppState();

  const myName = GetName();
  const { isImpersonationMode, isAccessAllowed } = usePermission(
    PermissionType.HealthReports
  );

  const { sendRequest } = useGetImpersonate(handleGetImpersonateSuccess);
  const { sendRequest: sendImpersonateActive } = useActiveImpersonate(
    handleActiveImpersonateSuccess
  );
  const { sendRequest: sendImpersonateDeactive } = useDeActiveImpersonate(
    handleDeActiveImpersonateSuccess
  );

  const [shareList, setShareList] = useState([{ value: '0', label: myName }]);
  const [impersonateList, setImpersonateList] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const [shareValue, setShareValue] = useState(shareList[0]);
  const [entries, setEntries] = useState([]);
  const [isRequest, setIsRequest] = useState(true);

  const isBack =
    history.location.pathname.includes('/profile') ||
    history.location.pathname.includes('/calendar_add') ||
    history.location.pathname.includes('/reports') ||
    history.location.pathname.includes('/calendar');

  const linkButton = (to, title, image = null) => {
    return (
      <Link to={to} className="btn btn-purpure btn-flex">
        <img src={image || '/img/icons/heart.png'} alt="" /> {title}
      </Link>
    );
  };

  const changeViewAs = (item) => {
    setShareValue(item);
    if (item.value != '0') {
      handleEnableImpersonate(item);
    }
  };

  const handleEnableImpersonate = (item) => {
    const idx = Number(item.value) - 1;
    sendImpersonateActive(impersonateList[idx].email);
    setCurrentItem(impersonateList[idx]);
  };
  function handleActiveImpersonateSuccess(loginResult) {
    const { authToken } = loginResult;
    localStorage.setItem('authToken', authToken);
    dispatch(setImpersonationMode(true, currentItem));

    window.location.href = '/welcome';
  }

  const handleDeImpersonate = () => {
    sendImpersonateDeactive();
  };
  function handleDeActiveImpersonateSuccess(loginResult) {
    const { authToken } = loginResult;
    const decoded = jwtDecode(authToken);

    localStorage.setItem('authToken', authToken);
    dispatch(setImpersonationMode(false));

    dispatch(login(loginResult, true));
    trackGTM(TRACK_GTM.LOGIN, {
      userId: decoded.user_id,
    });

    window.location.href = '/';
  }
  function handleGetImpersonateSuccess(impersonateResponse) {
    LOG('handleGetImpersonateSuccess', impersonateResponse);
    if (impersonateResponse.length > 0 && impersonateResponse[0].email) {
      setImpersonateList(impersonateResponse);
      dispatch(setAbleToImpersonate(true));
    } else {
      setImpersonateList([]);
    }
  }

  useEffect(() => {
    if (impersonateList.length === 0) {
      sendRequest();
    }
  }, []);

  useEffect(() => {
    if (isRequest === true) {
      setIsRequest(false);
      getImpersonateRequest()
        .then((res) => {
          setEntries(res);
        }
        );
    }
  }, [isRequest]);

  useEffect(() => {
    let myInfo = { value: '0', label: myName };
    const mpList = impersonateList.map((item, idx) => {
      return { value: `${idx + 1}`, label: item.name ? item.name : item.email };
    });
    setShareList([myInfo, ...mpList]);

    if (!shareValue || shareValue.value == '0') {
      setShareValue(myInfo);
    }
  }, [myName, impersonateList, isImpersonationMode]);

  const renderLinkButton = () => {
    if (isImpersonationMode) {
      return isBack
        ? linkButton(
            '/welcome',
            'Back to Dashboard',
            '/img/icons/heart-search.png'
          )
        : isAccessAllowed
          ? linkButton('/reports', 'View Health Report')
          : '';
    }
    return isBack
      ? linkButton(
          '/welcome',
          'Back to Dashboard',
          '/img/icons/heart-search.png'
        )
      : linkButton('/reports', 'View Health Report');
  };

  const renderTitle = () => {
    return (
      <div className="flex flex-wrap items-center mx-0 row-mx-15">
        <div className="page-logo">
          <div className="user-avatar">
            <Avatar
              className="user-avatar"
              name={myName}
              size="120"
              round={true}
              src={`${PROFILE_IMAGE_URL}?userId=${userId}`}
              style={{
                backgroundColor: !profileColor ? '#3fb4c4' : profileColor,
                border: 'solid 4px #fff',
              }}
            />
            <div className="avatarName" title={myName}>{myName.substr(0, 1).toUpperCase()}</div>
          </div>

          <Link className="logo" to="/welcome">
            {accountType === AccountType.CareGiver
              ? `${myName}'s Caregiver CareHub`
              : `${myName}'s CareHub`}
          </Link>
          {accountType === AccountType.CareGiver
            ? <AvatarGroup
              avatars={entries}
            />
            : ''
          }
        </div>
      </div>
    );
  };

  const renderShareList = () => {
    return (
      <div className="viewas-element">
        {isImpersonationMode ? (
          <>
            <div className="viewas-title">Impersonation mode</div>
            <button onClick={handleDeImpersonate}>Exit</button>
          </>
        ) : (
          <>
            <div className="viewas-title">View&nbsp;as:</div>
            <div className="viewas-value">
              <Select
                name="viewAs"
                options={shareList}
                value={shareValue}
                onChange={changeViewAs}
                className="viewas-select"
                classNamePrefix="select"
                isSearchable={false}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className={`header${history.location.pathname === '/' ? ' main-page-header' : ''
        }`}
      style={{ background: `url(${BannerList[backgroundImageId || 0].url}) center center no-repeat` }}
    >
      <div className="container">
        <div className="container-nav">
          <div className="nav-block">
            {renderShareList()}

            <ul className="header-nav">
              <li className="header-nav-item">
                <a href="/help" className="header-nav-list">
                  <img src="/img/icons/icon-help.png" alt="" />
                  <span>Help</span>
                </a>
              </li>
            </ul>

            <MenuButton />
          </div>

          <div className="nav-block-resp">{renderShareList()}</div>
          <SetFontSizeButtons />
          {renderLinkButton()}
        </div>

        {renderTitle()}
        <Menu />
      </div>
    </div>
  );
}

export default withRouter(UserHeader);
