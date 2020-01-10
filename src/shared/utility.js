export const updateOBJ = (currentState, updatedState) => {
  return {
    ...currentState,
    ...updatedState
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) return true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    if (!isValid) return false;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (!isValid) return false;
  }

  if (rules.isEmail) {
    const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = emailReg.test(value) && isValid;
    if (!isValid) return false;
  }

  return true;
};
