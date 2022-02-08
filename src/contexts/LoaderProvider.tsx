import React, { createContext, useContext, useState } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';

type LoaderPropsData = {
  isLoad: boolean;
  closeLoader: () => void;
  openLoader: () => void;
};

const defaultLoaderContextData: LoaderPropsData = {
  isLoad: false,
  closeLoader: () => {},
  openLoader: () => {}
};

const LoaderContext = createContext<LoaderPropsData>(defaultLoaderContextData);

const LoaderProvider: React.FC = ({ children }) => {
  const [isLoad, setIsLoad] = useState(defaultLoaderContextData.isLoad);

  const closeLoader = () => {
    setIsLoad(false);
  };

  const openLoader = () => {
    setIsLoad(true);
  };

  return (
    <LoaderContext.Provider
      value={{
        isLoad,
        closeLoader,
        openLoader
      }}
    >
      {isLoad && <SuspenseLoader />}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;

export const useLoaderContext = () => useContext(LoaderContext);
