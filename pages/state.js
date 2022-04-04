import {createContext, useContext} from 'react'
import {useState} from 'react'

const AppContext = createContext();

export function AppWrapper(props){
  const {value, children} = props

  return(
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext(){
  return useContext(AppContext);
}
