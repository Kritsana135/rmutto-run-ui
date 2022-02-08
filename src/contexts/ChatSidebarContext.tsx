import { FC, useState, createContext } from 'react';
type ChatSidebarContext_ = { sidebarToggle: any; toggleSidebar: () => void };

export const ChatSidebarContext = createContext<ChatSidebarContext_>({
  sidebarToggle: '',
  toggleSidebar: () => {}
});

export const ChatSidebarProvider: FC = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <ChatSidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {children}
    </ChatSidebarContext.Provider>
  );
};
