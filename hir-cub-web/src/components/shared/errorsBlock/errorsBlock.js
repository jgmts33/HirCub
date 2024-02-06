import React from 'react';
import './styles.scss';

function ErrorsBlock(props) {
  const { errors } = props;
  if (!errors || errors.length === 0) {
    return null;
  }
  return (
    <ul>
      {errors.map((error, i) => (
        <li key={i} className="error-line">
          {error}
        </li>
      ))}
    </ul>
  );
}

export default ErrorsBlock;
