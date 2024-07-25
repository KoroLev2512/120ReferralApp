/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Task, User } from "@/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { retrieveRefCode, retrieveUserSafely } from "./utils";
import { BASE_URL } from "./const";

function userAdapter(data: any): User | undefined {
  try {
    const hasWallet = data.wallet && data.wallet !== "";

    return {
      id: data.telegram_id,
      level: data.user_level,
      balance: data.balance_block,
      invitations: data.invited_users,
      wallet: hasWallet ? data.wallet : undefined,
      donateMinted: data.mint_donate_nft,
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function taskAdapter(data: any): Task[] | undefined {
  try {
    return data.map((dataTask: any) => ({
      id: dataTask.task.id,
      completed: dataTask.completed,
      active: dataTask.task.active,
      reward: dataTask.task.reward,
      description: dataTask.task.description_task,
      target: dataTask.task.channel_id,
    }));
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

async function getUser(): Promise<User | undefined> {
  const user = retrieveUserSafely();
  const response = await fetch(BASE_URL + "/ref/user/get/" + user.id);
  return userAdapter(await response.json());
}

async function login(): Promise<User | undefined> {
  const user = retrieveUserSafely();

  const response = await fetch(BASE_URL + "/ref/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      telegram_id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      username_telegram: user.username,
      language_code: user.languageCode,
      referral_code: retrieveRefCode(),
    }),
  });

  return userAdapter(await response.json());
}

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ["login"],
    queryFn: getUser,
    retry: false,
  });
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  });

export const useTasksQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const user = retrieveUserSafely();

      const response = await fetch(BASE_URL + "/task/" + user.id);

      return taskAdapter(await response.json());
    },
  });
};

async function fetchUserWallet(wallet: string): Promise<User | undefined> {
  const user = retrieveUserSafely();

  const response = await fetch(BASE_URL + "/ref/user/wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      telegram_id: user.id,
      wallet: wallet,
    }),
  });

  const data = await response.json();
  if (!data || ("message" in data && data.message === "User not found")) {
    return undefined;
  } else {
    return userAdapter(data);
  }
}

export const useAddUserWalletMutation = () =>
  useMutation({
    mutationFn: fetchUserWallet,
  });

export const useUnlockMutation = () =>
  useMutation({
    mutationFn: async () => {
      const user = retrieveUserSafely();

      const response = await fetch(BASE_URL + "/ref/user/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          telegram_id: user.id,
          unlockable_level: true,
        }),
      });

      return await response.json();
    },
  });

export const useMintNFTMutation = () =>
  useMutation({
    mutationFn: async () => {
      const user = retrieveUserSafely();
      // TODO: add business logic
      return user;
    },
  });
