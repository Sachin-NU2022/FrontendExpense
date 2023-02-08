import { useState } from "react";

import {
        staffNumberValidator,
        passwordValidator
} from "../loginValidators.js";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidators = loginData => {
  const [errors, setErrors] = useState({
    staffNumber: {
        dirty: false,
        error: false,
        message: "",
    },
    password: {
        dirty: false,
        error: false,
        message: "",
    }
  });

  const validateForm = ({ loginData, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { staffNumber, password } = loginData;

    if (nextErrors.staffNumber.dirty && (field ? field === "staffNumber" : true)) {
      const staffNumberMessage = staffNumberValidator(staffNumber, loginData);
      nextErrors.staffNumber.error = !!staffNumberMessage;
      nextErrors.staffNumber.message = staffNumberMessage;
      if (!!staffNumberMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
        const passwordMessage = passwordValidator(password, loginData);
        nextErrors.password.error = !!passwordMessage;
        nextErrors.password.message = passwordMessage;
        if (!!passwordMessage) isValid = false;
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

    validateForm({ loginData, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};

