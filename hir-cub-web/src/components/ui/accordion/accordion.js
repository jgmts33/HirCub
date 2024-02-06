import React, { useRef } from 'react';

import './accordion.scss';

const Accordion = ({ children, title, subCategory }) => {
  const ref = useRef(null);

  const closeAccordion = () => {
    const elem = ref.current;
    if (!elem) {
      return;
    }
    const iconElem = elem.getElementsByTagName('i')[0];
    closeChilrenElements(elem);

    elem.parentElement.classList.toggle('active-category');
    elem.classList.toggle('active-category');
    iconElem.classList.toggle('fa-minus');
    iconElem.classList.toggle('fa-plus');
  };

  const closeChilrenElements = (elem) => {
    const resources = Array.from(
      elem.parentElement.getElementsByClassName('item-collapse')
    );
    const iconsFromResources = [];

    resources.forEach((resource) => {
      const iconsFromResource = Array.from(
        resource.getElementsByClassName('fas')
      );
      iconsFromResources.push(iconsFromResource);
      resource.classList.remove('open');
    });

    iconsFromResources.flat().forEach((iconElem) => {
      iconElem.classList.add('fa-plus');
      iconElem.classList.remove('fa-minus');
    });
  };

  return (
    <div className="category">
      <div
        className="category-head"
        role="button"
        tabIndex="0"
        ref={ref}
        onClick={closeAccordion}
      >
        <div className="category-head-title">{title}</div>
        <span className="category-icon">
          <i className={'fas fa-plus'} />
        </span>
      </div>
      <div className="category-wrap">
        {subCategory && <div className="sub-category">{subCategory}</div>}
        <div className="category-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
