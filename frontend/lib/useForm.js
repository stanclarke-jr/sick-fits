import { useEffect, useState } from 'react';

const useForm = (initialState = {}) => {
  // Create a state object for our inputs
  const [inputs, setInputs] = useState(initialState);
  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initialState);
  }, [initialValues]);

  const handleChange = (e) => {
    let { value, name, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
      console.log(value);
    }

    setInputs({
      // Copy the existing state
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initialState);
  };

  const clearForm = () => {
    const inputsArr = Object.entries(inputs);
    const clearedValues = inputsArr.map(([key, value]) => [key, '']);
    const clearedStateObj = Object.fromEntries(clearedValues);
    setInputs(clearedStateObj);

    // Alternatively:
    // const clearedState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, '']))
    // setInputs(clearedState);
  };

  // Return what we need from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};

export default useForm;
