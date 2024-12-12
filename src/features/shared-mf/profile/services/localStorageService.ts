const localStorageService = {
    get(key: string): string | null {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error(`Error getting key "${key}" from localStorage:`, error);
        return null;
      }
    },
  
    set(key: string, value: string): void {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error setting key "${key}" in localStorage:`, error);
      }
    },
  
    remove(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing key "${key}" from localStorage:`, error);
      }
    },
  };
  
  export default localStorageService;
  