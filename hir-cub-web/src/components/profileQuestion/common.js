import React from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Tooltip } from '../ui';
import { Input, Checkbox, Radio, Textarea } from '../ui/formControls';
import ColorPicker from '../ui/formControls/colorPicker';

export const renderPanelGroup = (title, bodyContent) => {
  return renderPanelGroupStyle(title, '', null, bodyContent);
};

export const renderPanelGroupTip = (title, tip, bodyContent) => {
  return renderPanelGroupStyle(title, '', tip, bodyContent);
};

export const renderPanelGroupStyle = (title, style, tip, bodyContent) => {
  return (
    <div className="page-panel-group panel-group">
      <div className="page-panel-group-title">
        {tip ? (
          <div className="page-panel-group-tip">
            {title} {renderTip(tip)}
          </div>
        ) : (
          <>{title}</>
        )}
      </div>
      <div className={`page-panel-group-body ${style}`}>{bodyContent}</div>
    </div>
  );
};

const renderTip = (tip) => {
  return <Tooltip position="left">{tip}</Tooltip>;
};

export const renderDisplay = (name, content) => {
  return (
    <div className="display-field" key={`disp-${name}`}>
      {content}
    </div>
  );
};

export const renderRadio = (className, name, value, title) => {
  return (
    <div className={`form-group ${className}`} key={`radio-${name}-${value}`}>
      <Field
        type="radio"
        name={name}
        value={value}
        component={Radio}
        key={`${name}-${value}`}
      >
        {title}
      </Field>
    </div>
  );
};

export const renderCheckbox = (className, name, value, title) => {
  return (
    <div className={`form-group ${className}`} key={`check-${name}-${value}`}>
      <Field
        type="checkbox"
        name={name}
        value={value}
        component={Checkbox}
        key={`${name}-${value}`}
      >
        {title}
      </Field>
    </div>
  );
};

export const renderDisplayRadio = (className, name, value, title) => {
  return renderDisplay(
    `${name}-${value}`,
    renderRadio(className, name, value, title)
  );
};

export const renderDisplayCheckbox = (className, name, value, title) => {
  return renderDisplay(
    `${name}-${value}`,
    renderCheckbox(className, name, value, title)
  );
};

export const renderHealthIssues = (name) => {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <div className="fields-list clearfix">
          {fields.map((name, index) => (
            <div
              key={name}
              className="form-group flex justify-between items-center"
            >
              <Field
                type="text"
                name={name}
                placeholder="Please Specify"
                component={Input}
              />
              <button
                type="button"
                className="remove-item-btn"
                onClick={() => fields.remove(index)}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-add-item uppercase"
            onClick={() => fields.push('')}
          >
            + Add another health issue
          </button>
        </div>
      )}
    </FieldArray>
  );
};

export const renderText = (name, placeholder, disabled) => {
  return (
    <div className="form-group">
      <Field
        type="text"
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        component={Input}
      />
    </div>
  );
};

export const renderPassword = (name, placeholder, disabled) => {
  return (
    <div className="form-group">
      <Field
        type="password"
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        component={Input}
      />
    </div>
  );
};

export const renderTextarea = (name, rows) => {
  return (
    <div className="page-panel-group-body">
      <div className="form-group">
        <Field name={name} component={Textarea} rows={rows} />
      </div>
    </div>
  );
};

export const renderImageRadio = (className, name, value, title, imageUri) => {
  return renderDisplay(
    `${name}-${value}`,
    <div className={`form-group group-image-radio ${className}`}>
      <div className="image-radio">
        <img src={imageUri} alt="" />
      </div>
      {renderRadio('', name, value, title)}
    </div>
  );
};

export const renderColorPicker = (name, color) => {
  return (
    <div className="form-group">
      <Field type="color" name={name} initial={color} component={ColorPicker} />
    </div>
  );
};
