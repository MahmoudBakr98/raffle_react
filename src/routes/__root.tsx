import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { WalletInfoContextProvider } from "@/contexts/wallet_info_context";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <WalletInfoContextProvider>
          <Outlet />
        </WalletInfoContextProvider>
      </QueryClientProvider>
      <Toaster position="top-center" richColors />

      <TanStackRouterDevtools />
    </>
  ),
});
