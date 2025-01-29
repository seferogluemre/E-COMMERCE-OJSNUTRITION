import { useState } from "react";
import { Product } from "../routes/Products/components/types";

const UseLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Hata var" + error);
      return initialValue;
    }
  });

  const setValue = (value: Product) => {
    try {
      const valueOfStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueOfStore);
      localStorage.setItem(key, JSON.stringify(valueOfStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default UseLocalStorage;
