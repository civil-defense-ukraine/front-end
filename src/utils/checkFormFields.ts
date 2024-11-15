/* eslint-disable @typescript-eslint/no-explicit-any */
const disposableDomains = ["mailinator.com", "tempmail.com", "10minutemail.com"];

type FormFields = {
  email: string;
  subject: string;
  message: string;
};

function isDisposableDomain(email: string) {
  const domain = email.split("@")[1];
  return disposableDomains.includes(domain);
}


export const checkFormField = (
  formField: FormFields | any,
): FormFields | any => {
  const { email } = formField;
  const error: FormFields = {
    email: '',
    subject: '',
    message: '',
  };
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!pattern.test(email)) {
    error.email = 'Invalid email format.';
  }

  if (isDisposableDomain(email)) {
    error.email = 'Please use a valid email address.';
  }

  if (formField.message.length < 5) {
    error.message = 'Message should contain at least 5 characters';
  }

  for (const field in formField) {
    if (formField[field as keyof FormFields].length === 0) {
      error[field as keyof FormFields] = 'This field is required.';
    }
  }

  return error;
};

export const checkAdminFormField = <T extends Record<string, any>>(
  formField: T,
) => {
  const error: { [key: string]: string } = {};

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  for (const field in formField) {
    const value = formField[field] || '';

    if (!value) {
      error[field] = 'This field is required.';
      continue;
    }

    if (field === 'email' && !emailPattern.test(value)) {
      error[field] = 'Invalid email format.';
    } else if (field === 'message' && value.length < 5) {
      error[field] = 'Message should contain at least 5 characters.';
    }
  }

  return error;
};
