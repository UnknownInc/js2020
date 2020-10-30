import React from 'react'
import RootStore from './rootStore';

export const StoresContext = React.createContext(new RootStore())

const useStores = () => React.useContext(StoresContext);

export default useStores;