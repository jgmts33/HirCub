import React, { useState } from 'react';
import useAppState, { useAppDispatch } from '~/appState';
import { openMenu } from '~/actions/global';
import { Link } from 'react-router-dom';
import './styles.scss';
import LogoutAskModal from '~/components/modals/logoutAskModal';
import { logout } from '~/actions/account';

// helpers
import { trackGTM } from '~/utils';
import { usePermission } from '~/hooks';

// constants
import {
  AccountType,
  TRACK_GTM,
  MenuLinks,
  CaregiverExceptionUrls,
  PatientExceptionUrls,
  GetImpersonatedUser,
} from '~/consts';

function MenuLink(props) {
  const { children, ...rest } = props;
  const dispatch = useAppDispatch();
  return (
    <Link {...rest} onClick={() => dispatch(openMenu(false))}>
      {children}
    </Link>
  );
}

function Menu() {
  const {
    global: { isOpened, isLogin, userId, accountType },
  } = useAppState();
  const dispatch = useAppDispatch();
  const { allowedUrls } = usePermission();
  const [isLogout, setIsLogout] = useState(false);
  const userInfo = GetImpersonatedUser();

  const handleLogout = () => {
    dispatch(openMenu(false));
    setIsLogout(true);
  };

  function handleConfirmLogout() {
    setIsLogout(false);

    dispatch(logout());
    localStorage.removeItem('authToken');

    trackGTM(TRACK_GTM.LOGOUT, {
      userId,
    });

    window.open('/login', '_self');
  }

  function handleCloseLogout() {
    setIsLogout(false);
  }

  const viewType = userInfo.isImpersonated ? userInfo.accountType : accountType;

  const filteredMenuItems = userInfo.isImpersonated
    ? MenuLinks.filter((item) => allowedUrls.includes(item.url))
    : MenuLinks;

  const menuItemsFromAccount =
    viewType == AccountType.CareGiver
      ? filteredMenuItems.filter(
          (item) => !CaregiverExceptionUrls.includes(item.url)
        )
      : filteredMenuItems.filter(
          (item) => !PatientExceptionUrls.includes(item.url)
        );

  return (
    <div
      className={`page-menu navbar-collapse ${
        isOpened ? 'navigation-is-visible' : ''
      }`}
    >
      <ul className="main-menu">
        {menuItemsFromAccount.map((item, index) => (
          <li>
            <MenuLink to={`/${item.url}`}>{item.title}</MenuLink>
          </li>
        ))}
        {isLogin && (
          <li>
            <div
              className="item-logout"
              onClick={() => handleLogout()}
              role="button"
              tabIndex={0}
            >
              Log Out
            </div>
          </li>
        )}
      </ul>

      <LogoutAskModal
        isOpen={isLogout}
        confirm={handleConfirmLogout}
        close={handleCloseLogout}
      />
    </div>
  );
}

export default Menu;
