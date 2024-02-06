import React from 'react';
import Accordion from '~/components/shared/accordion';

function Concern(props) {
  const { title, noBorder, isOpen, setOpen, children } = props;

  return (
    <Accordion
      className="--bgd-white"
      title={title}
      isOpen={isOpen}
      open={() => setOpen(true)}
      close={() => setOpen(false)}
      noBorder={noBorder}
    >
      <div className="mt-20 pl-20">{children}</div>
    </Accordion>
  );
}

export default Concern;
