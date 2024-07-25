import { useEffect, type FC } from "react";
import ChangeLocale from "@/components/change-locale";
import MessageBubble from "@/components/ui/message-bubble";
import { Progress } from "@/components/ui/progress";
import { useLocale } from "@/store/use-locale";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useBackButton,
  useMainButton,
  useMiniApp,
} from "@telegram-apps/sdk-react";
import { cn } from "@/lib/utils";

const Text: FC<{ title?: string; footnote?: string; className?: string }> = ({
  title,
  footnote,
  className,
}) => {
  return (
    <div className={cn("text-center w-full px-8", className)}>
      {title && <h1 className="title text-center pb-1">{title}</h1>}
      {footnote && <p className="footnote text-hint text-center">{footnote}</p>}
    </div>
  );
};

const Welcome: FC<{ onClick: VoidFunction }> = ({ onClick }) => {
  const { messages } = useLocale();
  const bb = useBackButton();
  const mb = useMainButton();

  useEffect(() => {
    mb.setParams({
      text: messages.onboarding.initial.button,
      isEnabled: true,
      bgColor: "#0098ea",
    });

    mb.on("click", onClick);
    mb.show();

    return () => {
      mb.off("click", onClick);
    };
  }, [mb, onClick, messages]);

  useEffect(() => {
    bb.hide();
  }, [bb]);

  return (
    <div className="h-full flex flex-col justify-between">
      <Text
        title={messages.onboarding.initial.title}
        footnote={messages.onboarding.initial.footnote}
      />
      <div className="illustration logo" />
      <Text
        title={messages.onboarding.initial.headline}
        footnote={messages.onboarding.initial.description}
      />
    </div>
  );
};

const Motivation: FC<{
  onForward: VoidFunction;
  onBack: VoidFunction;
}> = ({ onBack, onForward }) => {
  const { messages } = useLocale();
  const bb = useBackButton();
  const mb = useMainButton();

  useEffect(() => {
    mb.setParams({
      text: messages.onboarding.step1.button,
      bgColor: "#0098ea",
    });
    mb.on("click", onForward);
    mb.show();

    return () => {
      mb.off("click", onForward);
    };
  }, [mb, onForward, messages]);

  useEffect(() => {
    bb.on("click", onBack);
    bb.show();

    return () => {
      bb.off("click", onBack);
    };
  }, [bb, onBack]);

  return (
    <>
      <Text
        title={messages.onboarding.step1.title}
        footnote={messages.onboarding.step1.footnote}
      />
      <div className="illustration skater my-4" />
      <Text footnote={messages.onboarding.step1.description} />
    </>
  );
};

const Referral: FC<{
  onForward: VoidFunction;
  onBack: VoidFunction;
}> = ({ onBack, onForward }) => {
  const { messages } = useLocale();
  const bb = useBackButton();
  const mb = useMainButton();

  useEffect(() => {
    mb.setParams({
      text: messages.onboarding.step1.button,
      bgColor: "#0098ea",
    });
    mb.on("click", onForward);
    mb.show();

    return () => {
      mb.off("click", onForward);
    };
  }, [mb, onForward, messages]);

  useEffect(() => {
    bb.on("click", onBack);
    bb.show();

    return () => {
      bb.off("click", onBack);
    };
  }, [bb, onBack]);

  return (
    <>
      <Text
        className="pt-7 pb-10"
        title={messages.onboarding.step2.title}
        footnote={messages.onboarding.step2.footnote}
      />
      <div className="px-8 flex flex-col gap-5">
        {messages.onboarding.step2.messages.map((message, index) => (
          <MessageBubble
            key={index}
            variant={index % 2 === 0 ? "right" : "left"}
          >
            {message}
          </MessageBubble>
        ))}
      </div>
    </>
  );
};

const OnboardingStep: FC<{
  step: number;
  onForward: VoidFunction;
  onBack: VoidFunction;
  onFinish: VoidFunction;
}> = ({ step, onForward, onBack, onFinish }) => {
  switch (step) {
    case 0:
      return <Welcome onClick={onForward} />;
    case 1:
      return <Motivation onForward={onForward} onBack={onBack} />;

    case 2:
      return <Referral onForward={onFinish} onBack={onBack} />;
    default:
      return null;
  }
};

export default function OnboardingPage() {
  const [searchParams] = useSearchParams();
  const step = Number(searchParams.get("step")) || 0;
  const progressValue = step * 33;
  const navigate = useNavigate();
  const miniApp = useMiniApp();
  const mb = useMainButton();

  useEffect(() => {
    miniApp.setHeaderColor("#1f1f1f");
    document.body.style.backgroundColor = "#1f1f1f";
  }, [miniApp]);

  const handleForward = () => {
    navigate(`/onboarding?step=${step + 1}`);
  };

  const handleBack = () => {
    navigate(`/onboarding?step=${step - 1}`);
  };

  const handleFinish = () => {
    mb.hide();
    navigate("/gallery");
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col pt-7 overflow-y-scroll">
        <OnboardingStep
          step={step}
          onForward={handleForward}
          onBack={handleBack}
          onFinish={handleFinish}
        />
      </div>
      <div className="flex w-full px-8 pt-4 items-center justify-center">
        {progressValue > 0 ? (
          <Progress value={progressValue} />
        ) : (
          <ChangeLocale />
        )}
      </div>
    </div>
  );
}
