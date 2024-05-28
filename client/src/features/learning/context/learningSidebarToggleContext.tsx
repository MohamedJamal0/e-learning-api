import React, { createContext, useContext } from 'react';
import useToggle from '../../../hooks/useToggle';

interface LearningSidebarToggleContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface LearningSidebarToggleProviderProps {
  children: React.ReactNode;
}

const LearningSidebarToggleContext =
  createContext<LearningSidebarToggleContextType | null>(null);

export function LearningSidebarToggleProvider({
  children,
}: LearningSidebarToggleProviderProps) {
  const { toggle, onToggle } = useToggle(window.innerWidth >= 1024);

  const value = {
    isSidebarOpen: toggle,
    toggleSidebar: onToggle,
  };

  return (
    <LearningSidebarToggleContext.Provider value={value}>
      {children}
    </LearningSidebarToggleContext.Provider>
  );
}

export function useLearningSidebarToggle() {
  const context = useContext(LearningSidebarToggleContext);
  if (!context)
    throw new Error(
      'useLearningSidebarToggle must be used within a LearningSidebarToggleProvider'
    );
  return context;
}
