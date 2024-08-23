import { createContext, useContext, useState, ReactNode } from "react";

interface UnlockContextProps {
    isRewardEnabled: boolean;
    enableReward: (enable: boolean) => void;
  }

const UnlockContext = createContext<UnlockContextProps | undefined>(undefined);

export const UnlockProvider = ({ children }: { children: ReactNode }) => {
    const [isRewardEnabled, setIsRewardEnabled] = useState(false);

    const enableReward = (enable: boolean) => setIsRewardEnabled(enable);

  return (
    <UnlockContext.Provider value={{ isRewardEnabled, enableReward }}>
      {children}
    </UnlockContext.Provider>
  );
};

export const useUnlock = () => {
  const context = useContext(UnlockContext);
  if (!context) {
    throw new Error("useUnlock must be used within an UnlockProvider");
  }
  return context;
};
