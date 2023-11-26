import { type } from 'os';
import React, { PropsWithChildren, ReactElement, ReactNode, createContext, useContext, useState } from 'react';

interface SidebarContext {
  isSidebarOpen: boolean,
  toggleSidebar: () => void,
} 

const SidebarContextDefaultValue:SidebarContext = {
  isSidebarOpen: false,
  toggleSidebar: () => {},
}

const SidebarContext = createContext(SidebarContextDefaultValue);

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }:PropsWithChildren<Record<string, unknown>>):ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
