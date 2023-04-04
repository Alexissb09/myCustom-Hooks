import { useState, useEffect, useRef } from "react";

export const UseFetch = (url) => {
  const [values, setValues] = useState({
    data: null,
    loading: true,
    error: null,
  });

  // Basicamente la referencia al componente arranca en true
  // Esto sirve para no cargar un state una vez desmontado el componente y evitamos errores

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      // Si se desmonta el componente pasa a false
      isMounted.current = false;
    };
  }, []);

  // en este useEffect, preguntamos si el componente esta montado y luego si seteamos los valores

  useEffect(() => {
    setValues({ ...values, loading: true });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        isMounted.current &&
          setValues({
            data,
            loading: false,
            error: null,
          });
      })
      .catch((error) => {
        if (isMounted.current) {
          setValues({
            data: null,
            loading: false,
            error,
          });
        }
      });
  }, [url]);

  return values;
};
