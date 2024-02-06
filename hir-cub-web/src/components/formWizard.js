import React, { useState } from 'react';
import arrayMutators from 'final-form-arrays';
import createDecorator from 'final-form-focus';
import { Form } from 'react-final-form';
import { Button, StepIndicators } from '~/components/ui';
import ErrorsBlock from '~/components/shared/errorsBlock';

const focusOnError = createDecorator();
const decorators = [focusOnError];

function Wizard(props) {
  const {
    children,
    onSubmit,
    initialValues,
    serverErrors,
    FormContextProvider,
    ...rest
  } = props;
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(initialValues);
  const isLastPage = page === React.Children.count(children) - 1;

  function next(values) {
    setPage(Math.min(page + 1, children.length - 1));
    setValues(values);
  }
  function previous() {
    setPage(Math.max(page - 1, 0));
  }

  function gotoPage(targetPage, values, handleSubmit) {
    const hasErrors = targetPage > page && validate(values);
    if (!hasErrors) {
      setPage(targetPage);
    } else {
      handleSubmit();
    }
  }
  function validate(values) {
    const activePage = React.Children.toArray(children)[page];
    const activeForm = React.Children.only(activePage.props.children);
    return activeForm.props.validate ? activeForm.props.validate(values) : {};
  }
  function handleSubmit(values) {
    if (isLastPage) {
      return onSubmit(values);
    }
    return next(values);
  }
  const activePage = React.cloneElement(
    React.Children.toArray(children)[page],
    { ...rest }
  );
  return (
    <Form
      mutators={{
        ...arrayMutators,
      }}
      initialValues={values}
      validate={validate}
      onSubmit={handleSubmit}
      decorators={decorators}
    >
      {({ handleSubmit, submitting, values, touched, errors }) => {
        return (
          <FormContextProvider
            values={values}
            errors={errors}
            touched={touched}
          >
            <form onSubmit={handleSubmit}>
              {activePage}
              <StepIndicators
                data={children}
                page={page}
                gotoPage={(page) => gotoPage(page, values, handleSubmit)}
              />
              <div>
                <ErrorsBlock errors={serverErrors} />
              </div>
              <div className="step-btn-group">
                {page > 0 && (
                  <Button
                    type="button"
                    kind="green previous-btn"
                    onClick={previous}
                  >
                    « Previous
                  </Button>
                )}
                {!isLastPage && (
                  <Button type="submit" kind="blue next-btn">
                    Next »
                  </Button>
                )}
                {isLastPage && (
                  <Button type="submit" kind="purpure" disabled={submitting}>
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </FormContextProvider>
        );
      }}
    </Form>
  );
}

Wizard.Page = (props) => {
  const { children, ...rest } = props;
  return React.cloneElement(children, { ...rest });
};

export default Wizard;
