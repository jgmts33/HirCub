import React from 'react';
import './styles.scss';

function InfromationTooltip(props) {
  const { children, position } = props;
  return (
    <div className="information-tooltip">
      <div className="tooltip" flow={position ? position : null}>
        <i className="fas fa-info-circle" />
        <div className="information-tooltip-content">{children}</div>
      </div>
    </div>
  );
}

export default InfromationTooltip;
