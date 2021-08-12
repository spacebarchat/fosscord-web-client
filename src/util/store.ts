export default class store {
  static getItem(key: any): Promise<any> {
    return new Promise((resolve) => {
      if (localStorage.getItem(key)) {
        resolve(localStorage.getItem(key));
      } else {
        resolve(undefined);
      }
    });
  }
  static saveItem(key: string, value: any): Promise<any> {
    return new Promise((resolve) => {
      resolve(localStorage.setItem(key, value));
    });
  }
  static removeItem(key: any): Promise<any> {
    return new Promise((resolve) => {
      resolve(localStorage.removeItem(key));
    });
  }
}
