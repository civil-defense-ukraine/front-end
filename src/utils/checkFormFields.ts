/* eslint-disable @typescript-eslint/no-explicit-any */
type FormFields = {
  email: string;
  subject: string;
  message: string;
};

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
