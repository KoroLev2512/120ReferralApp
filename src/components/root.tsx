import { type FC } from "react";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { App } from "@/components/app";
import { ErrorBoundary } from "@/components/error-boundary";
import { MANIFEST_URL } from "@/lib/const";

const queryClient = new QueryClient();

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <TonConnectUIProvider manifestUrl={MANIFEST_URL} restoreConnection>
      <SDKProvider acceptCustomStyles>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  </ErrorBoundary>
);
