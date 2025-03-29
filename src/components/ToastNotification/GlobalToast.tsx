import { useToastStore } from "../../store/toast/ToastStore";
import ToastNotification from "./ToastNotification";

const GlobalToast = () => {
  const { message, showToast, hideToast } = useToastStore();

  return (
    <ToastNotification message={message} showToast={showToast} onClose={hideToast} />
  );
};

export default GlobalToast;
