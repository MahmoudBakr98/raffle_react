import { TypographyH3 } from "@/components/ui/typography";
import Wheel from "@/components/wheel";
import { getConnectedAccount } from "@/lib/ethers";
import { BrowserProvider } from "ethers";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

const WalletInfoContext = createContext<{
  connectedAccount: string;
  setConnectedAccount: Dispatch<SetStateAction<string>>;
  provider: BrowserProvider | undefined;
}>({ connectedAccount: "", setConnectedAccount: () => {}, provider: undefined });

export function WalletInfoContextProvider({ children }: { children: ReactNode }) {
  const browserProvider = window.ethereum ? new BrowserProvider(window.ethereum) : null;

  const [connectedAccount, setConnectedAccount] = useState<string>("");
  const [provider, setProvider] = useState(browserProvider);

  useEffect(() => {
    if (provider) {
      getConnectedAccount(provider).then((address) => {
        setConnectedAccount(address);
      });
    }
  }, [provider]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          setConnectedAccount("");
        } else {
          setConnectedAccount(accounts[0]);
        }
      });
      window.ethereum.on("chainChanged", () => {
        setProvider(new BrowserProvider(window.ethereum));
      });
    }
  }, []);

  if (!provider) {
    return (
      <div className="bg-black h-dvh flex flex-col gap-[50px] justify-center items-center">
        <Wheel
          players={[
            { name: "Please", color: "#471396" },
            { name: "Install", color: "#b13bff" },
            { name: "MetaMask", color: "#090040" },
            { name: "To", color: "#393e46" },
            { name: "Continue", color: "#00adb5" },
          ]}
          animate
        />
        <TypographyH3>
          Install{" "}
          <a
            className="text-blue-700 underline"
            href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          >
            MetaMask
          </a>
        </TypographyH3>
      </div>
    );
  }

  return (
    <WalletInfoContext.Provider
      value={{
        connectedAccount,
        setConnectedAccount,
        provider,
      }}
    >
      {children}
    </WalletInfoContext.Provider>
  );
}

export function useWalletInfoContext() {
  const context = useContext(WalletInfoContext);

  if (!context) throw new Error("useWalletInfoContext must be used inside a WalletInfoContext");

  return context;
}
