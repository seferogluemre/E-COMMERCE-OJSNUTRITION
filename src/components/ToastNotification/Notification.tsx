import React from "react";
import { BiCheck, BiError, BiInfoCircle } from "react-icons/bi";

export type NotificationType = "success" | "error" | "info";

interface NotificationProps {
  type: NotificationType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <BiCheck className="text-success" size={23} />;
      case "error":
        return <BiError className="text-danger" size={23} />;
      case "info":
        return <BiInfoCircle className="text-primary" size={23} />;
    }
  };

  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-danger";
      case "info":
        return "alert-primary";
    }
  };

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div
        className={`animate-fade-in alert ${getAlertClass()} d-flex align-items-center shadow`}
        style={{ minWidth: "350px" }}
      >
        <div className="me-2">{getIcon()}</div>
        <div className="flex-grow-1">{message}</div>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Notification;
