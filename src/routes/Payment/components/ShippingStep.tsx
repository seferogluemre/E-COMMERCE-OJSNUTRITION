
import React from "react";
import { Card } from "react-bootstrap";
import { BsTruck } from "react-icons/bs";
import { type UserAddress } from "../../../services/api/collections/Addresses";

interface ShippingStepProps {
    selectedAddress: UserAddress | null;
}

const ShippingStep: React.FC<ShippingStepProps> = ({ selectedAddress }) => {
    if (!selectedAddress) return null;

    return (
        <Card className="mt-4">
            <Card.Body>
                <div className="d-flex align-items-center gap-2 mb-3">
                    <BsTruck className="text-secondary" size={20} />
                    <h5 className="mb-0">Teslimat Adresi</h5>
                </div>
                <div>
                    <p className="text-danger fw-medium mb-1">{selectedAddress.title}</p>
                    <p className="mb-1">
                        {selectedAddress.first_name} {selectedAddress.last_name}
                    </p>
                    <p className="text-secondary mb-1">{selectedAddress.full_address}</p>
                    <p className="text-secondary mb-1">
                        {selectedAddress.city} / {selectedAddress.district}
                    </p>
                    <p className="text-primary mb-0">{selectedAddress.phone_number}</p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ShippingStep;