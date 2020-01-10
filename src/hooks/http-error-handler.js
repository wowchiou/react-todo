import { useState, useEffect, useCallback } from 'react';

export default httpInstance => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpInstance.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const resInterceptor = httpInstance.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpInstance.interceptors.request.eject(reqInterceptor);
      httpInstance.interceptors.response.eject(resInterceptor);
    };
  }, [
    httpInstance.interceptors.request,
    httpInstance.interceptors.response,
    reqInterceptor,
    resInterceptor
  ]);

  const errorConfirmedHandler = useCallback(() => {
    setError(null);
  }, []);

  return [error, errorConfirmedHandler];
};
