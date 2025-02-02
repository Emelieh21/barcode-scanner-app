import { createContext, useState, useEffect } from "react";

export const BarcodeScannerContext = createContext();

export const BarcodeScannerProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("https://world.openfoodfacts.org/categories.json")
      .then((response) => response.json())
      .then((data) => {
        const categoryList = data.tags || [];  // Ensure we get a valid array
        setCategories(categoryList);

        // Transform categories into options
        const formattedOptions = categoryList
          .filter(category => category.id && category.name) // Ensure valid data
          .map(category => ({
            value: category.id,
            label: category.name
          }));

        setOptions(formattedOptions);
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <BarcodeScannerContext.Provider value={{categories, options}}>
      {children}
    </BarcodeScannerContext.Provider>
  );
};
