import { useState } from "react";

import {
  emailValidator,
  passwordValidator,
  furiganaValidator, 
  nameValidator,
  idValidator
} from "../employeevalidators.js";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useEmployeeFormValidators = employee => {
  const [errors, setErrors] = useState({
    email: {
        dirty: false,
        error: false,
        message: "",
    },
    password: {
        dirty: false,
        error: false,
        message: "",
    },
    staff_kana: {
        dirty: false,
        error: false,
        message: "",
    },
    username: {
        dirty: false,
        error: false,
        message: "",
    },
    staffNumber: {
        dirty: false,
        error: false,
        message: "",
    },
  });

  const validateForm = ({ employee, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { email, password, staff_kana, username, staffNumber} = employee;

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const emailMessage = emailValidator(email, employee);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }
    
    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
        const passwordMessage = passwordValidator(password, employee);
        nextErrors.password.error = !!passwordMessage;
        nextErrors.password.message = passwordMessage;
        if (!!passwordMessage) isValid = false;
    }

    if (nextErrors.staff_kana.dirty && (field ? field === "staff_kana" : true)) {
      const furiganaMessage = furiganaValidator(staff_kana, employee);
      nextErrors.staff_kana.error = !!furiganaMessage;
      nextErrors.staff_kana.message = furiganaMessage;
      if (!!furiganaMessage) isValid = false;
    }
    
    if (nextErrors.username.dirty && (field ? field === "username" : true)) {
      const nameMessage = nameValidator(username, employee);
      nextErrors.username.error = !!nameMessage;
      nextErrors.username.message = nameMessage;
      if (!!nameMessage) isValid = false;
    }

    if (nextErrors.staffNumber.dirty && (field ? field === "staffNumber" : true)) {
      const idMessage = idValidator(staffNumber, employee);
      nextErrors.staffNumber.error = !!idMessage;
      nextErrors.staffNumber.message = idMessage;
      if (!!idMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = e => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ employee, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};

