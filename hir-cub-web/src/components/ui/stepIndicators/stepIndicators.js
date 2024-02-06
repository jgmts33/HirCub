import React from 'react';
import './styles.scss';

function StepIndicators(props) {
  const { data, page, gotoPage } = props;
  if (!data) {
    return null;
  }
  return (
    <div className="step-indicators">
      {React.Children.map(data, (item, index) => {
        return (
          <span
            className={`${!item.props.stepIndex ? 'small' : ''} ${
              index == page ? 'active' : index > page + 1 ? 'disabled' : null
            }
            `}
            onClick={() => (index > page + 1 ? () => {} : gotoPage(index))}
            role="button"
            tabIndex="0"
          >
            {item.props.stepIndex ? item.props.stepIndex : ''}
          </span>
        );
      })}
    </div>
  );
}
export default StepIndicators;
