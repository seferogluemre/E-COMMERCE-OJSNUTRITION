import React from "react";
import { Button } from "react-bootstrap";
import { SuccessScreenProps } from "../../../types/PaymentTypes";

const SuccessScreen: React.FC<SuccessScreenProps> = ({ navigate }) => {
    return (
        <div className="text-center py-5" id="success-screen">
            <div className="mb-4">
                <img src="/assets/success_gif.gif" alt="Success" className="mb-3 success_image" width={100} height={100} />
                <h2 className="text-success fs-2">Ödemeniz başarıyla alındı.</h2>
                <div className="d-flex justify-content-center column-gap-3">
                    <Button className="btn btn-primary" onClick={() => navigate("/")}>
                        Anasayfa
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SuccessScreen;