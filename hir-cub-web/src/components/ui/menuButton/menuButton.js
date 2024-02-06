import React from 'react';
import useAppState, { useAppDispatch } from '~/appState';
import { openMenu } from '~/actions/global';
import './styles.scss';

function MenuButton() {
  const {
    global: { isOpened },
  } = useAppState();
  const dispatch = useAppDispatch();

  return (
    <div className={`menu-btn ${isOpened ? 'navigation-is-visible' : ''}`}>
      <button
        type="button"
        className="navbar-toggles"
        onClick={() => dispatch(openMenu(!isOpened))}
      >
        <span className="nav-icons" />
      </button>
    </div>
  );
}

export default MenuButton;
