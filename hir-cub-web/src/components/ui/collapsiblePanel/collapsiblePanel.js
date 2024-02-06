import React, { useState, useEffect } from 'react';
import './styles.scss';

function CollapsiblePanel({ children, ...props }) {
  const { title, collapse } = props;
  const [isCollapse, setIsCollapse] = useState(false);
  const [icon, setIcon] = useState('fa fa-chevron-right');
  const [section, setSection] = useState('section-collapse');
  const [string, setString] = useState('Open this part');

  const toggle = () => {
    props.setCollapse(!isCollapse);
    updateCollapse(!isCollapse);
  };

  const updateCollapse = (status) => {
    setIcon(status ? 'fa fa-chevron-down' : 'fa fa-chevron-right');
    setSection(status ? 'section-collapse open' : 'section-collapse');

    setString(status ? 'Close this part' : 'Open this part');
    setIsCollapse(status);
  };

  useEffect(() => {
    updateCollapse(collapse);
  }, [collapse]);

  return (
    <div className={section}>
      <span className="toggle-action">
        <span>{string}</span>
        <i className={icon} />
      </span>
      <div className="section-head" onClick={toggle} role="button" tabIndex="0">
        <div className="section-head-title">{title}</div>
      </div>
      <div className="article-wrap">
        <div className="article">{children}</div>
      </div>
    </div>
  );
}

export default CollapsiblePanel;
