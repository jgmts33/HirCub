import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '~/appState';
import { logout } from '~/actions/account';
import { Button } from '~/components/ui';
import { GetName } from '~/consts/global';

function UserDropdown() {
  const [isOpen, setOpen] = useState(false);

  const myName = GetName();

  const dispatch = useAppDispatch();
  function showDropdown() {
    setOpen(true);
  }
  const dropdownRef = useRef();
  useEffect(() => {
    function hideDropdown() {
      setOpen(false);
    }
    function handleOutsideClick(e) {
      !dropdownRef.current.contains(e.target) && hideDropdown();
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);
  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem('authToken');
  }
  return (
    <div className={`user-dropdown dropdown ${isOpen ? 'open' : ''}`}>
      <button className="dropdown-toggle" onClick={() => showDropdown()}>
        <img className="header_user-logo" src="/img/my-profile-logo.png" />
        <span className="header_user-name">{myName}</span>
      </button>
      <ul className="dropdown-menu" ref={dropdownRef}>
        <li>
          <Button to="/" kind="logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Log Out
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default UserDropdown;
