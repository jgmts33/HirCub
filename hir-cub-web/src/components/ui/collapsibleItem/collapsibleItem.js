import React, { useRef } from 'react';
import './styles.scss';

function CollapsibleItem({ children, title }) {
  const ref = useRef(null);

  const toggle = () => {
    const elem = ref.current;
    if (!elem) {
      return;
    }
    const iconElem = elem.getElementsByTagName('i')[0];

    elem.parentElement.classList.toggle('open');
    iconElem.classList.toggle('fa-minus');
    iconElem.classList.toggle('fa-plus');
  };

  return (
    <div className="item-collapse">
      <div ref={ref} onClick={toggle} role="button" tabIndex="0">
        <span className="toggle-action">
          <i className="fas fa-plus" />
        </span>
        <div className="section-head">
          <div className="section-head-title">{title}</div>
        </div>
      </div>
      <div className="article-wrap">
        <div className="article">{children}</div>
      </div>
    </div>
  );
}

export default CollapsibleItem;
