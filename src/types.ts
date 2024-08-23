export type Locale = "ru" | "en";

export type User = {
  id: number;
  level: number;
  balance: number;
  invitations: number;
  wallet?: string;
  donateMinted?: boolean;
  referralLink?: string;
  unlockableLevel: boolean;
};

export type Task = {
  id: number;
  completed: boolean;
  active: boolean;
  reward: number;
  description: string;
  target: string | null;
};
