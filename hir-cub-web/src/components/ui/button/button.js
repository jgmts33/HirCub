import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function Button(props) {
  const { kind, href, to, children, ...rest } = props;
  const kindClassName = kind ? `btn-${kind}` : '';
  if (href) {
    return (
      <a href={href} className={`btn ${kindClassName}`} {...rest}>
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={`btn ${kindClassName}`} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`btn ${kindClassName}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
