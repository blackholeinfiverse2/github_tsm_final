import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";

// Define the props for ConfirmatioDialog component
interface ConfirmatioDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  msg?: string | null;
  setMsg?: (msg: string | null) => void;
  onClick?: () => void;
  type?: "delete" | "restore" | "restoreAll";
  setType?: (type: "delete" | "restore" | "restoreAll") => void;
}

const ConfirmatioDialog: React.FC<ConfirmatioDialogProps> = ({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) => {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center px-4">
        <h3>
          <p
            className={clsx(
              "p-3 rounded-full",
              type === "restore" || type === "restoreAll"
                ? "text-yellow-600 bg-yellow-100"
                : "text-red-600 bg-red-200"
            )}
          >
            <FaQuestion size={60} />
          </p>
        </h3>

        <p className="text-center text-gray-500 text-sm md:text-base">
          {msg ?? "Are you sure you want to delete the selected record?"}
        </p>

        <div className="bg-gray-50 py-3 flex flex-col sm:flex-row-reverse gap-4 w-full">
          <Button
            type="button"
            className={clsx(
              "px-8 text-sm font-semibold text-white w-full sm:w-auto",
              type === "restore" || type === "restoreAll"
                ? "bg-yellow-600"
                : "bg-red-600 hover:bg-red-500"
            )}
            onClick={onClick}
            label={type === "restore" ? "Restore" : "Delete"}
          />

          <Button
            type="button"
            className="bg-white px-8 text-sm font-semibold text-gray-900 w-full sm:w-auto border"
            onClick={() => closeDialog()}
            label="Cancel"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmatioDialog;

// Define the props for UserAction component
interface UserActionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClick?: () => void;
}

export const UserAction: React.FC<UserActionProps> = ({
  open,
  setOpen,
  onClick = () => {},
}) => {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center px-4">
        <h3>
          <p className={clsx("p-3 rounded-full", "text-red-600 bg-red-200")}>
            <FaQuestion size={60} />
          </p>
        </h3>

        <p className="text-center text-gray-500 text-sm md:text-base">
          {"Are you sure you want to activate or deactivate this account?"}
        </p>

        <div className="bg-gray-50 py-3 flex flex-col sm:flex-row-reverse gap-4 w-full">
          <Button
            type="button"
            className={clsx(
              "px-8 text-sm font-semibold text-white w-full sm:w-auto",
              "bg-red-600 hover:bg-red-500"
            )}
            onClick={onClick}
            label={"Yes"}
          />

          <Button
            type="button"
            className="bg-white px-8 text-sm font-semibold text-gray-900 w-full sm:w-auto border"
            onClick={() => closeDialog()}
            label="No"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
