import React from "react";
import { StepIndicatorProps } from "../../../types/PaymentTypes";

const StepIndicator: React.FC<StepIndicatorProps> = ({
    stepNumber,
    title,
    isActive,
    isClickable,
    onClick,
}) => {
    return (
        <div
            className={`d-flex align-items-center gap-3 ${isClickable ? "cursor-pointer" : ""}`}
            onClick={isClickable ? onClick : undefined}
        >
            <div
                className={`rounded-circle d-flex align-items-center justify-content-center ${isActive ? "bg-primary text-white" : "bg-secondary"
                    }`}
                style={{ width: "32px", height: "32px" }}
            >
                {stepNumber}
            </div>
            <h5 className="mb-0">{title}</h5>
        </div>
    );
};

export default StepIndicator;