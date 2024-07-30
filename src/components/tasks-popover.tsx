import { useCheckTaskCompletionMutation, useTasksQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { useLocale } from "@/store/use-locale";
import { Task } from "@/types";
import { useHapticFeedback, useUtils } from "@telegram-apps/sdk-react";
import {
  CheckCheck,
  CheckCircle2,
  ChevronsRight,
  Frown,
  X,
} from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type TaskProps = {
  id: string | number;
  title: string;
  description?: string;
  isCompleted: boolean;
  link: string | null;
  reward: number;
};

const TaskItem = ({ id, title, reward, isCompleted, link }: TaskProps) => {
  const utils = useUtils();
  const { mutateAsync: checkTaskCompletion } = useCheckTaskCompletionMutation();

  const handleClick = () => {
    if (link) {
      utils.openLink(link);
      checkTaskCompletion(id);
    }
  };

  return (
    <li
      className={cn(
        "flex items-center justify-between transition-colors rounded-md p-1",
        !isCompleted && link && "cursor-pointer hover:bg-white/20"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-full bg-ton-blue flex-shrink-0"></div>
        <div className="grid gap-1">
          <h3 className="caption">{title}</h3>
          <p className="caption font-semibold">+{reward} $BLOCK</p>
        </div>
      </div>
      <div>
        {isCompleted ? (
          <CheckCircle2 className="size-6 text-green-500" />
        ) : (
          <ChevronsRight className="size-6 text-ton-blue" />
        )}
      </div>
    </li>
  );
};

const TasksList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <ul className="pt-4 grid gap-2 overflow-y-scroll max-h-56">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.description}
          reward={task.reward}
          isCompleted={task.completed}
          link={task.target}
        />
      ))}
    </ul>
  );
};

const TasksNotAvailable = () => {
  const { messages } = useLocale();

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-56">
      <Frown className="size-9" />
      <h2 className="headline">{messages.tasks.locked.title}</h2>
      <p className="foonote">{messages.tasks.locked.description}</p>
    </div>
  );
};

export default function TasksPopover() {
  const [open, setOpen] = useState(false);
  const { messages } = useLocale();
  const haptic = useHapticFeedback();
  const { data: tasks } = useTasksQuery();

  const handleClick = () => {
    haptic.impactOccurred("light");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="relative bg-ton-blue rounded-3xl py-2 px-4 flex items-center gap-2 cursor-pointer hover:bg-ton-blue-hover"
          onClick={handleClick}
        >
          <span className="footnote font-normal">{messages.tasks.button}</span>
          <div className="relative flex items-center justify-center">
            <X
              className={cn(
                "size-5 transition-all",
                open ? "rotate-0 scale-100" : "-rotate-90 scale-0"
              )}
            />
            <CheckCheck
              className={cn(
                "absolute size-5 transition-all",
                !open ? "rotate-0 scale-100" : "-rotate-90 scale-0"
              )}
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <h2>20d:14h:55m:28s</h2>
        {tasks && tasks.some((task) => task.active) ? (
          <TasksList tasks={tasks} />
        ) : (
          <TasksNotAvailable />
        )}
      </PopoverContent>
    </Popover>
  );
}
