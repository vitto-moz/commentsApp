export const localStorageService = () => {
  return {
    getAppState: () => {
      const currentState = localStorage.getItem('state');
      return angular.fromJson(currentState);
    },
    setAppState: state => {
      localStorage.clear();
      localStorage.setItem("state", angular.toJson(state));
      const currentState = localStorage.getItem('state');
      return angular.fromJson(currentState);
    }
  };
};	
