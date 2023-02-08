import { useState } from "react";

import {
  descriptionValidator,
  payment_destinationValidator,
  entraining_pointValidator, 
  arrival_stationValidator,
  amountValidator,
  noteValidator
} from "../expenseValidators.js";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useExpenseFormValidators = expense => {
  const [errors, setErrors] = useState({
    description: {
        dirty: false,
        error: false,
        message: "",
    },
    payment_destination: {
        dirty: false,
        error: false,
        message: "",
    },
    entraining_point: {
        dirty: false,
        error: false,
        message: "",
    },
    arrival_station: {
        dirty: false,
        error: false,
        message: "",
    },
    amount: {
        dirty: false,
        error: false,
        message: "",
    },
    note: {
        dirty: false,
        error: false,
        message: "",
    }
  });

  const validateForm = ({ expense, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { description, payment_destination, entraining_point, arrival_station, amount, note} = expense;

    if (nextErrors.description.dirty && (field ? field === "description" : true)) {
      const descriptionMessage = descriptionValidator(description, expense);
      nextErrors.description.error = !!descriptionMessage;
      nextErrors.description.message = descriptionMessage;
      if (!!descriptionMessage) isValid = false;
    }
    
    if (nextErrors.payment_destination.dirty && (field ? field === "payment_destination" : true)) {
        const payment_destinationMessage = payment_destinationValidator(payment_destination, expense);
        nextErrors.payment_destination.error = !!payment_destinationMessage;
        nextErrors.payment_destination.message = payment_destinationMessage;
        if (!!payment_destinationMessage) isValid = false;
    }

    if (nextErrors.entraining_point.dirty && (field ? field === "entraining_point" : true)) {
      const entraining_pointMessage = entraining_pointValidator(entraining_point, expense);
      nextErrors.entraining_point.error = !!entraining_pointMessage;
      nextErrors.entraining_point.message = entraining_pointMessage;
      if (!!entraining_pointMessage) isValid = false;
    }
    
    if (nextErrors.arrival_station.dirty && (field ? field === "arrival_station" : true)) {
      const arrival_stationMessage = arrival_stationValidator(arrival_station, expense);
      nextErrors.arrival_station.error = !!arrival_stationMessage;
      nextErrors.arrival_station.message = arrival_stationMessage;
      if (!!arrival_stationMessage) isValid = false;
    }

    if (nextErrors.amount.dirty && (field ? field === "amount" : true)) {
      const amountMessage = amountValidator(amount, expense);
      nextErrors.amount.error = !!amountMessage;
      nextErrors.amount.message = amountMessage;
      if (!!amountMessage) isValid = false;
    }

    if (nextErrors.note.dirty && (field ? field === "note" : true)) {
        const noteMessage = noteValidator(note, expense);
        nextErrors.note.error = !!noteMessage;
        nextErrors.note.message = noteMessage;
        if (!!noteMessage) isValid = false;
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

    validateForm({ expense, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};

