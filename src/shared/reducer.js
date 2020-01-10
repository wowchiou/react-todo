export const httpReducer = (currentState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...currentState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { loading: false, error: null };
    default:
      throw new Error('Somthing went wrong!');
  }
};
