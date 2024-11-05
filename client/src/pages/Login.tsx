import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useWeb3Context} from "../context/Web3Context";
import { Navigate } from "react-router-dom";

// Define types for form data
interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { connectWallet, isWalletConnected } = useWeb3Context();
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    await connectWallet();
    setIsConnecting(false);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  useEffect(() => {
    // Auto-connect wallet if needed
    handleConnect();
  }, []);

  if (isWalletConnected) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-10 flex-col md:flex-row items-center justify-center">
        {/* Left Side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Manage all your tasks in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-5xl 2xl:text-6xl font-black text-center text-blue-700">
              <span>Black Hole Infiverse</span>
              <span>Task Manager</span>
            </p>
            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(handleConnect)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div>
              <p className="text-blue-600 text-3xl font-bold text-center">
                Welcome back!
              </p>
              <p className="text-center text-base text-gray-700">
                Keep all your credentials safe.
              </p>
            </div>
            <button
              className="w-full h-12 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition duration-200 mt-6 text-xl flex justify-center items-center"
              onClick={handleConnect}
              disabled={isConnecting} // Disable button while connecting
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
