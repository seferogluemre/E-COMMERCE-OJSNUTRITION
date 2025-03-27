import { Accordion } from "react-bootstrap";
import { NutritionalContent } from "../ProductDetail";

interface ProductInfoAccordionProps {
    features: string;
    usage: string;
    nutritionalContent: NutritionalContent;
    gramSize: number;
    totalServices: number;
}

const ProductInfoAccordion: React.FC<ProductInfoAccordionProps> = ({
    features,
    usage,
    nutritionalContent,
    gramSize,
    totalServices,
}) => {
    return (
        <div className="properties pt-1">
            <div className="text-start pb-3">
                <span>Son kullanma tarihi: 07.2025</span>
            </div>
            <div className="accordion-container">
                <Accordion className="accordion border-0">
                    <Accordion.Item eventKey="0" className="border-0">
                        <Accordion.Header className="accordion-header">
                            Özellikler
                        </Accordion.Header>
                        <Accordion.Body className="accordion-body">
                            {features}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="border-0">
                        <Accordion.Header className="accordion-header">
                            Besin içerigi
                        </Accordion.Header>
                        <Accordion.Body className="accordion-body">
                            <div className="d-flex justify-content-between">
                                <span className="fs-5">Besin degeri</span>{" "}
                                {`${gramSize}gram, ${totalServices} servis`}
                            </div>
                            <div className="list pt-4">
                                {nutritionalContent.nutrition_facts.ingredients.map(
                                    (data, index) => (
                                        <div
                                            className="d-flex mb-1 justify-content-between"
                                            key={index}
                                        >
                                            <li className="list-unstyled">{data.name}</li>
                                            <li className="list-unstyled">
                                                {data.amounts}
                                            </li>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="features-list pt-3">
                                {nutritionalContent.ingredients.map(
                                    (aroma, index) => (
                                        <p className="" key={index}>
                                            <strong className="fs-6 text-danger">
                                                {aroma.aroma}:{" "}
                                            </strong>
                                            <span>{aroma.value}</span>
                                        </p>
                                    )
                                )}
                            </div>
                            <div className="amino-acid-facts-list">
                                {nutritionalContent.amino_acid_facts && (
                                    <div className="list pt-4">
                                        {nutritionalContent.amino_acid_facts.ingredients.map(
                                            (data, index) => (
                                                <div
                                                    className="d-flex mb-1 justify-content-between"
                                                    key={index}
                                                >
                                                    <li className="list-unstyled">
                                                        {data.name}
                                                    </li>
                                                    <li className="list-unstyled">
                                                        {data.amounts}
                                                    </li>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className="border-0">
                        <Accordion.Header className="accordion-header">
                            Kullanım Şekli
                        </Accordion.Header>
                        <Accordion.Body className="accordion-body">
                            {usage}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};

export default ProductInfoAccordion;