// Next, React
import { FC, useEffect } from "react";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Store
import useUserSOLBalanceStore from "../stores/useUserSOLBalanceStore";

import dynamic from "next/dynamic";
import { useAutoConnect } from "../contexts/AutoConnectProvider";
import NetworkSwitcher from "../components/NetworkSwitcher";

export const SettingView: FC = ({}) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { autoConnect, setAutoConnect } = useAutoConnect();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return (
    <div className="flex p-8 flex-col gap-8">
      <h4 className="text-2xl">
        {wallet.connected
          ? "Now Wallet Connected"
          : "You should connect your wallet to use this service"}
      </h4>
      <div className="navbar flex h-20 flex-row md:mb-2 shadow-lg bg-black text-neutral-content border-b border-zinc-600 bg-opacity-66">
        <div className="navbar-start align-items-center">
          <WalletMultiButtonDynamic className="btn-ghost btn-sm relative flex md:hidden text-lg " />
        </div>
        {wallet.connected && (
          <div className="">
            <h4 className="md:w-full text-2xl text-slate-300 my-2">
              {wallet && (
                <div className="flex flex-row justify-center">
                  <div>{(balance || 0).toLocaleString()}</div>
                  <div className="text-slate-600 ml-2">SOL</div>
                </div>
              )}
            </h4>
          </div>
        )}
      </div>

      <div className="">
        <label className="cursor-pointer label">
          <a>Autoconnect</a>
          <input
            type="checkbox"
            checked={autoConnect}
            onChange={(e) => setAutoConnect(e.target.checked)}
            className="toggle"
          />
        </label>
      </div>
      <div className="">
        <NetworkSwitcher />
      </div>
    </div>
  );
};
