import React, {createContext, ReactNode, useContext, useState} from 'react';

interface ActionContextType {
  isCohortActionEnabled: boolean;
  isBackActionEnabled: boolean;
  onBackActionClick: () => void;
  onCohortActionClick: () => void; // Add cohort callback
  setCohortActionEnabled: (enabled: boolean) => void; // Setter for cohort action enable
  setBackActionEnabled: (enabled: boolean) => void; // Setter for back action enable
  setBackActionCallback: (callback: () => void) => void; // Setter for back action callback
  setCohortActionCallback: (callback: () => void) => void; // Setter for cohort action callback
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

// Hook to access the context
export const useActionContext = (): ActionContextType => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error('useActionContext must be used within an ActionProvider');
  }
  return context;
};

interface ActionProviderProps {
  children: ReactNode;
}

// The provider component to wrap around the parts of the app that need the context
export const ActionProvider: React.FC<ActionProviderProps> = ({children}) => {
  const [isCohortActionEnabled, setCohortActionEnabled] = useState(true);
  const [isBackActionEnabled, setBackActionEnabled] = useState(false);

  // Default callbacks
  const [backActionCallback, setBackActionCallback] = useState<() => void>(
    () => {
      return;
    }
  );
  const [cohortActionCallback, setCohortActionCallback] = useState<() => void>(
    () => {
      return;
    }
  );

  return (
    <ActionContext.Provider
      value={{
        isCohortActionEnabled,
        isBackActionEnabled,
        onBackActionClick: backActionCallback,
        onCohortActionClick: cohortActionCallback,
        setCohortActionEnabled,
        setBackActionEnabled,
        setBackActionCallback,
        setCohortActionCallback,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
