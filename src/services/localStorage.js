export const localStorageService = () => {
  return {
    getAppState: () => {
      const currentState = localStorage.getItem('state');
      return angular.fromJson(currentState);
    },
    setAppState: state => {
      localStorage.setItem("state", angular.toJson(state));
    }
  };
};
