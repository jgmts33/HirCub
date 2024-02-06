import React, { useEffect } from 'react';
import useAppState, { useAppDispatch } from '~/appState';
import { setFontSize } from '~/actions/global';
import fontSizes from '~/consts/fontSizes';
import './styles.scss';

function SetFontSizeButtons() {
  const {
    global: { fontSize },
  } = useAppState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
  }, [fontSize]);
  return (
    <div className="chose-page-font-size flex">
      {Object.keys(fontSizes).map(fsKey => {
        const fs = fontSizes[fsKey];
        return (
          <button
            key={fsKey}
            onClick={() => dispatch(setFontSize(fs))}
            style={{ fontWeight: fontSize === fs ? '700' : '' }}
            className={fsKey}
          >
            A
          </button>
        );
      })}
    </div>
  );
}

export default SetFontSizeButtons;
