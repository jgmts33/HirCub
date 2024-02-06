import { applyRules, required, isPostalCode } from 'validator-forms';

const postalCodeValidation = applyRules([
  required('Specify your Postal Code.'),
  isPostalCode('Postal Code is invalid', 'CA'),
]);

function step1Validation(values) {
  let errors = {};
  const postalCodeError = postalCodeValidation(values.postalCode);
  if (postalCodeError) {
    errors.postalCode = postalCodeError;
  }
  return errors;
}

export { step1Validation };
