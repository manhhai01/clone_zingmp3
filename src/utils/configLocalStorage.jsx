const configClient = {
    setStoreJson: (name, data) => {
      let sData = JSON.stringify(data);
      localStorage.setItem(name, sData);
    },
  
    getStoreJson: (name) => {
      if (localStorage.getItem(name)) {
        let sData = localStorage.getItem(name);
        let data = JSON.parse(sData);
        return data;
      }
      return undefined;
    },
    // Lưu chuỗi
    setStore: (name, data) => {
      localStorage.setItem(name, data);
    },
    // Lấy chuỗi
    getStore: (name) => {
      if (localStorage.getItem(name)) {
        return localStorage.getItem(name);
      }
      return undefined;
    },
  };

  export const { setStoreJson, getStoreJson, setStore, getStore } = configClient;