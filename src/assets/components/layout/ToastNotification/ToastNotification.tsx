import { Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastNotificationProps } from "./Toast";
import "./_ToastNotification.scss";

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  delay = 3000,
  show,
  onClose,
}) => {
  return (
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 9999 }}>
      <Toast show={show} onClose={onClose} delay={delay} autohide>
        <Toast.Body className="text-dark">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;
