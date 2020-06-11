import React from 'react'

export const ListContext = React.createContext(null);

export const useListContext = () => React.useContext(ListContext);