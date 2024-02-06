import {
  applyRules,
  required,
  minLength,
  maxLength,
  isEmail,
  matches,
  isPostalCode,
} from 'validator-forms';

export const requiredValidation = required('This field is mandatory.');

export const emailValidation = applyRules([
  required('This field is mandatory.'),
  isEmail('Email is not valid.'),
]);

export const screenNameValidation = applyRules([
  required('This field is mandatory.'),
  maxLength('This field must be shorter than 64 characters', 64),
]);

export const passwordValidation = applyRules([
  required('This field is mandatory.'),
  minLength('Password must be longer than 6 characters.', 7),
  matches('Password must contain at least one uppercase letter.', '[A-Z]'),
  matches(
    'Password must contain at least one special character -!"$%*@',
    '[-!"$%*@]'
  ),
]);

export const accountTypeValidation = required(
  'Please select your account type.'
);

export const postalCodeValidation = applyRules([
  required(
    'Please enter your postal code so that we can find programs and services near you.'
  ),
  isPostalCode('Postal Code is invalid', 'CA'),
]);

export const caredPostalCodeValidation = applyRules([
  required(
    'Please enter the postal code of the person you are caring for so that we can find programs and services near them.'
  ),
  isPostalCode('Postal Code is invalid', 'CA'),
]);

export const caredNameValidation = required(
  'Please specify first name or nickname of the person that you are caring for.'
);

export function emailMustMatchValidator(values) {
  let errors = {};

  const nameError = screenNameValidation(values.displayName);
  if (nameError) {
    errors.displayName = nameError;
  }
  const postalCodeError = postalCodeValidation(values.postalCode);
  if (postalCodeError) {
    errors.postalCode = postalCodeError;
  }

  const isNoEmail = values.checkNoEmail || false;
  if (isNoEmail) {
    return errors;
  }

  const emailError = emailValidation(values.email);
  if (emailError) {
    errors.email = emailError;
  }
  const confirmEmailError = emailValidation(values.confirmEmail);
  if (confirmEmailError) {
    errors.confirmEmail = confirmEmailError;
  }
  const passwordError = passwordValidation(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  if (values.email !== values.confirmEmail) {
    errors.confirmEmail = 'Emails do not match.';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}
