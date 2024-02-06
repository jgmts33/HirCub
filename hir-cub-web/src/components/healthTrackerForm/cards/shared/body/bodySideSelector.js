import React from 'react';

function BodySideSelector(props) {
  // eslint-disable-next-line
  const { input, meta, ...rest } = props;
  return (
    <React.Fragment>
      <input {...input} type="hidden" value={input.value} {...rest} />
      <div
        className="my-10 text-center text-lg body-pain_swtcher"
        onClick={() => input.onChange(!input.value)}
        role="button"
        tabIndex="0"
      >
        <i className="fas fa-angle-left" />
        {input.value ? 'Back' : 'Front'} View
        <i className="fas fa-angle-right" />
      </div>
    </React.Fragment>
  );
}

export default BodySideSelector;
