import React from 'react';
import './styles.scss';

function Accordion(props) {
  const { title, isOpen, noBorder, open, close, children, className } = props;
  const activeClass = isOpen ? 'active' : 'inactive';
  return (
    <div
      className={`accordion-group ${activeClass} ${
        noBorder ? 'accordion-group--no-border' : ''
      } ${className}`}
    >
      <div
        className="accordion-heading"
        onClick={() => (isOpen ? close() : open())}
        role="button"
        tabIndex="0"
      >
        <span className="accordion-title">{title}</span>
        <i className="fas fa-angle-down accordion-caret" />
      </div>
      <div className="accordion-body">{children}</div>
    </div>
  );
}

export default Accordion;
