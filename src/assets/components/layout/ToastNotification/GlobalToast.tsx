import { useToastStore } from "../../../../store/toast/ToastStore";
import ToastNotification from "./ToastNotification";

const GlobalToast = () => {
  const { message, show, hideToast } = useToastStore();

  return (
    <ToastNotification message={message} show={show} onClose={hideToast} />
  );
};

export default GlobalToast;
