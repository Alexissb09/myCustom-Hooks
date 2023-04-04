import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);

  // resetea el estado, lo usamos cuando queremos limpiar el imput
  const reset = () => {
    setFormState(initialState);
  };

  // Captura los valores de un inut y los setea sin perder los demas elementos del state
  const handleInputChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  return [formState, handleInputChange, reset];
};
