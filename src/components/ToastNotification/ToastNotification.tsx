import { Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./_ToastNotification.scss";
import { ToastNotificationProps } from "../../types/ToastTypes";

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  delay = 3000,
  showToast,
  onClose,
}) => {
  return (
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 9999 }}>
      <Toast show={showToast} onClose={onClose} delay={delay} autohide>
        <Toast.Body className="text-dark">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;
