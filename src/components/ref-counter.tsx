import { Users } from "lucide-react";
import type { User } from "@/types";
import { Progress } from "./ui/progress";

export default function RefCounter({
  invitations,
  total,
}: Pick<User, "invitations"> & { total: number }) {
  const progressValue = (invitations / total) * 100;

  return (
    <>
      <div className="ref-counter text-ton-blue w-full flex items-center justify-center pt-4">
        <i>
          {invitations}/{total}
        </i>
        <Users className="size-7 ml-2 text-hint" />
      </div>
      <Progress value={progressValue} max={total} />
    </>
  );
}
