/* eslint-disable @typescript-eslint/no-explicit-any */

import { getStore } from "@/store/store";
import type { Task, User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "./const";
import { retrieveRefCode, retrieveUserSafely } from "./utils";

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
      referralLink: data.referral_link,
      unlockableLevel: data.unlockable_level
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
      referal_code: retrieveRefCode(),
    }),
  });

  return userAdapter(await response.json());
}

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ["login"],
    queryFn: getUser,
  });
};

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: login,
      onSuccess: (data) => {
        queryClient.setQueryData(["login"], data);
      },
    });
  };

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

export const useAddUserWalletMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: fetchUserWallet,
      onSuccess: (data) => {
        queryClient.setQueryData(["login"], data);
      },
    });
  };

  export const useUnlockMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async () => {
        const user = retrieveUserSafely();

        const response = await fetch(BASE_URL + "/ref/user/unlock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telegram_id: user.id,
          }),
        });

        return await response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["login"] });
      },
    });
  };

  export const useCheckTaskCompletionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (taskId: string | number) => {
            const user = retrieveUserSafely();

            await fetch(BASE_URL + `/task/${user.id}/checking/${taskId}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
          },
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]});
          },
    });
  };

  export const useChannelJoinCompletionMutation = () => {
      const queryClient = useQueryClient();
      useMutation({
        mutationFn: async () => {
          const user = retrieveUserSafely();

          await fetch(BASE_URL + `/ref/user/subscribe`, {
            body: JSON.stringify({
              telegram_id: user.id
            }),
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["login"]})
        }
      });
  }

export const useMintNFTMutation = () =>
  useMutation({
    mutationFn: async () => {
      const { user } = getStore();
      // TODO: add business logic
      return user;
    },
  });
