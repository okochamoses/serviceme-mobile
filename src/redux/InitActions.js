const toggleLoading = () => {
  return {
    type: 'TOGGLE_LOADING',
  };
};

const toggleError = () => {
  return {
    type: 'TOGGLE_ERROR',
  };
};

const navigateToAuth = () => {
  return {
    type: 'NAVIGATE_TO_AUTH',
  };
};

const navigateToProvider = () => {
  return {
    type: 'NAVIGATE_TO_PROVIDER',
  };
};

const navigateToUser = () => {
  return {
    type: 'NAVIGATE_TO_USER',
  };
};

export default {
  toggleLoading,
  toggleError,
  navigateToAuth,
  navigateToProvider,
  navigateToUser,
};
