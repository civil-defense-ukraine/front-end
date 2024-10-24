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
