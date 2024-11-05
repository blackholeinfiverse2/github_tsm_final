// src/context/Web3Context.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { walletAbi } from "../utils/wallet"; // Import your wallet ABI
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

type Web3ContextType = {
  account: string | null;
  contract: ethers.Contract | null;
  isWalletConnected: boolean;
  isAuthenticated: boolean;
  employeeAddress: string | null;
  setEmployeeAddress: (address: string | null) => void;
  connectWallet: () => Promise<void>;
  registerEmployee: (add: string, employeeName: string) => Promise<void>;
  createTask: (taskName: string, employeeAddress: string) => Promise<void>;
  completeTask: (taskId: number, employeeAddress: string) => Promise<void>;
  fetchAdditionalContractInfo: () => Promise<ContractInteractionDataType | null>;
  completedTaskIds: Set<number>;
  userRole: string | null;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
};

type ContractInteractionDataType = {
  employeeId: number;
  name: string;
  totalTasks: number;
  totalTasksCompleted: number;
  taskNames: string[];
  taskStartTimes: number[];
  taskEndTime: number[];
};

const walletAddress = "0xc6543eE6A10e187422811E781C89FDd16030Fde9";

const Web3Context = createContext<Web3ContextType | undefined>(undefined);
const provider = new ethers.JsonRpcProvider(
  "https://eth-holesky.g.alchemy.com/v2/vCs7XkwchsoJQiMyuKkJQNzVpoOXf4Li"
);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [employeeAddress, setEmployeeAddress] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(() => {
    return sessionStorage.getItem("userRole") || null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole) {
      navigate("/role-selection"); // Redirect to role selection if no role is set
    }
  }, [userRole, navigate]);

  const [completedTaskIds, setCompletedTaskIds] = useState<Set<number>>(() => {
    const savedIds = localStorage.getItem("completedTaskIds");
    return new Set<number>(savedIds ? JSON.parse(savedIds) : []);
  });
  
  const isAuthenticated = !!account && isWalletConnected;

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts: string[] = await provider.send("eth_requestAccounts", []);

        setAccount(accounts[0]);
        setIsWalletConnected(true);

        const signer = await provider.getSigner();
        const contractWithSigner = new ethers.Contract(walletAddress, walletAbi, signer);
        setContract(contractWithSigner);

        // Optional: Set user role here if you want to navigate after wallet connection
        // navigate("/role-selection");
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Connection failed. Please try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask.");
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signers = await provider.listAccounts();

          if (signers.length > 0) {
            const accounts = await Promise.all(
              signers.map((signer) => signer.getAddress())
            );

            setAccount(accounts[0]);
            setIsWalletConnected(true);
            setContract(new ethers.Contract(walletAddress, walletAbi, provider));
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  useEffect(() => {
    // Whenever userRole changes, update sessionStorage
    if (userRole) {
      sessionStorage.setItem("userRole", userRole);
    }
  }, [userRole]);

  const registerEmployee = async (add: string, employeeName: string) => {
    if (contract && add) {
      try {
        const tx = await contract.registerEmployee(add, employeeName);
        await tx.wait();
        console.log("Employee registered successfully!");
      } catch (error) {
        console.error("Error registering employee:", error);
      }
    }
  };

  const createTask = async (taskName: string, employeeAddress: string) => {
    if (contract) {
      try {
        const tx = await contract.createTask(taskName, employeeAddress);
        await tx.wait();
        alert("Task created successfully!");
        console.log("Task created successfully!");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  const fetchAdditionalContractInfo = async (): Promise<ContractInteractionDataType | null> => {
    if (contract) {
      try {
        const interactionData = await contractInteraction();
        console.log("Contract Interaction Data:", interactionData);
        return interactionData;
      } catch (error) {
        console.error("Error occurred", error);
        return null;
      }
    }
    return null;
  };

  const contractInteraction = async (): Promise<ContractInteractionDataType | null> => {
    if (!contract) return null;

    try {
      const empDetail = await contract.employeeDetail(account);
      return {
        employeeId: empDetail[0], // Assuming this is the correct mapping
        name: empDetail[1],
        totalTasks: empDetail[2],
        totalTasksCompleted: empDetail[3],
        taskNames: empDetail[4],
        taskStartTimes: empDetail[5],
        taskEndTime: empDetail[6],
      };
    } catch (error) {
      console.error("Error occurred", error);
      return null;
    }
  };

  const completeTask = async (taskId: number, employeeAddress: string) => {
    if (contract) {
      try {
        const tx = await contract.completeTask(taskId, employeeAddress);
        await tx.wait();

        const updatedTaskIds = new Set(completedTaskIds);
        updatedTaskIds.add(taskId);
        setCompletedTaskIds(updatedTaskIds);
        localStorage.setItem("completedTaskIds", JSON.stringify(Array.from(updatedTaskIds)));

        console.log(`Task ${taskId} completed successfully for employee ${employeeAddress}!`);
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        contract,
        employeeAddress,
        isWalletConnected,
        isAuthenticated,
        connectWallet,
        fetchAdditionalContractInfo,
        registerEmployee,
        userRole,
        setEmployeeAddress,
        setUserRole,
        createTask,
        completeTask,
        completedTaskIds,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3Context must be used within a Web3Provider");
  }
  return context;
};
