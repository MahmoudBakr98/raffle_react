import type { PlayerType } from "@/components/pages/home/home_actions/create_room_action/create_room_tabs/new_room_tab";
import { useWalletInfoContext } from "@/contexts/wallet_info_context";
import { CONTRACT_ADDRESS, CONTRACT_API, type Raffle } from "@/contracts/Raffle";
import { useNavigate } from "@tanstack/react-router";
import { ethers, Interface } from "ethers";
import { toast } from "sonner";

export default function useRaffleContract() {
  const { provider } = useWalletInfoContext();
  const navigate = useNavigate();

  const getContract = async () => {
    if (!provider) {
      throw new Error("Can not procedd with NO Provider");
    }
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_API,
      provider
    ) as unknown as Raffle;

    return contract;
  };
  const getContractWithSigner = async () => {
    if (!provider) {
      throw new Error("Can not procedd with NO Provider");
    }

    const signer = await provider.getSigner();

    const contract = await getContract();
    const contractWithSigner = contract.connect(signer);

    return contractWithSigner;
  };

  const getRoomInfo = async (roomId: string) => {
    const contract = await getContract();
    const roomInfo = await contract.getRoomInfo(roomId);
    return roomInfo;
  };

  const createRoom = async (players: PlayerType[]) => {
    const contract = await getContractWithSigner();
    const signer = await provider!.getSigner();

    const transactionObg = await contract.createNewLotRoom(players);

    toast.loading("Your room is being created");
    const receipt = await transactionObg.wait();
    toast.dismiss();

    if (receipt?.status == 1) {
      toast.success("Your room is  created");
      navigate({ to: "/room/$room_id", params: { room_id: signer.address } });
    } else {
      toast.error("OOPs, couldn't create your room");
    }
  };

  const selectWinner = async () => {
    const contract = await getContractWithSigner();
    const tx = await contract.selectWinner();
    toast.loading("The Raffle is Runing....");
    await tx.wait();

    return true;
  };
  const deleteMyRoom = async () => {
    const contract = await getContractWithSigner();
    const tx = await contract.deleteMyRoom();
    await tx.wait();

    navigate({ to: "/" });
  };

  const handleEthersError = async (e: any) => {
    try {
      const iface = new Interface(CONTRACT_API);
      const errData = e.data ?? e.error?.data;
      if (errData) {
        const decodedErr = iface.parseError(errData);
        if (decodedErr) {
          const errName = decodedErr?.name;
          const readableErr = errName.replace(/([A-Z])/g, " $1").trim();
          toast.error(readableErr);

          if (decodedErr.selector === "0x0ed40fbd") {
            const signer = await provider!.getSigner();
            navigate({ to: "/room/$room_id", params: { room_id: signer.address } });
          }
        }
      }
    } catch (e) {
      console.log("e:", e);
    }
  };

  return {
    createRoom,
    getRoomInfo,
    selectWinner,
    getContract,
    getContractWithSigner,
    deleteMyRoom,
    handleEthersError,
  };
}
