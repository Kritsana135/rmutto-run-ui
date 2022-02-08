import { FC, useState, createContext } from 'react';
type SidebarContext_ = { sidebarToggle: any; toggleSidebar: () => void };

export const SidebarContext = createContext<SidebarContext_>({
  sidebarToggle: '',
  toggleSidebar: () => {}
});

export const SidebarProvider: FC = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
