import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import { Container, Row } from "react-bootstrap";
import "./SSS.scss";
import { FaRegCreditCard } from "react-icons/fa6";
import ContactForm from "../Contact/components/Form/Form";

interface SSSItem {
  request: string;
  reply: string;
}

interface SSSData {
  genel: SSSItem[];
  ürünler?: SSSItem[];
  kargo?: SSSItem[];
}

const SSS: SSSData = {
  genel: [
    {
      request: "OJS Nutrition Ürünlerinin menşei neresi?",
      reply:
        "Ürünlerin hammaddeleri ithal olup, paketlenmesi Türkiye'de yapılmaktadır. OJSNUTRİTİON marka ürünlerin menşei Türkiye'dir.",
    },
    {
      request: "OJSNUTRİTİON ürünlerinin menşei neresi?",
      reply:
        "Ürünlerin hammaddeleri ithal olup, paketlenmesi Türkiye'de yapılmaktadır. OJSNUTRİTİON marka ürünlerin menşei Türkiye'dir.",
    },
    {
      request: "Hangi sertifikalarınız var?",
      reply:
        "ISO 9001, ISO 22000 ve HELAL sertifikalarına sahip bir tesiste üretim yapmaktayız.",
    },
    {
      request: "Satılan ürünler garantili midir? Değişim var mı?",
      reply:
        "Satın aldığınız ürünler açılmamış ise 14 gün içerisinde iade hakkınız mevcuttur. Açılan ürünleri iade alamıyoruz.",
    },
    {
      request: "Sipariş verirken sorun yaşıyorum, ne yapmam gerekir?",
      reply: "Buraya tıklayarak bize mesaj bırakabilirsiniz.",
    },
    {
      request: "OJSNUTRİTİON ürünleri nerede satılıyor?",
      reply:
        "Ürünlerimizi www.ojsnutrition.com'da ve başlıca büyük alışveriş sitelerinde bulabilirsiniz.",
    },
    {
      request: "Yüksek proteinli ürünleri kimler kullanabilir?",
      reply:
        "15 yaş üstü bireyler kullanabilir. Özellikle spor yapan bireylerin protein ihtiyacı artar.",
    },
    {
      request: "Taksit seçeneği neden yok?",
      reply: "Yasalar gereği gıda ürünlerine taksit yapılması mümkün değildir.",
    },
    {
      request: "Siparişimi nasıl iptal edebilirim?",
      reply:
        "Siparişinizi iptal etmek için sipariş numaranızı ve iptal talebinizi belirten mailinizi iletebilirsiniz.",
    },
    {
      request:
        "Kapağın altındaki folyo açılmış veya tam yapışmamış gibi duruyor?",
      reply:
        "Ürünler size açılmadan, kapalı bir şekilde gönderilmektedir. Dış kapağının etrafında açılmadığına dair şeffaf emniyet bandını görebilirsiniz.",
    },
    {
      request: "Sattığınız ürünler ilaç mıdır?",
      reply:
        "İlaç değildir. PROTEİNOCEAN markalı ürünlerimiz sporcu gıdasıdır.",
    },
    {
      request: "Siparişimi teslim alırken nelere dikkat etmeliyim?",
      reply:
        "Koli dışında eziklik, yırtılma ve hasar olması durumunda kolileri teslim almayarak kargo yetkilisine tutanak tutturmalısınız.",
    },
    {
      request: "Kapıda ödeme hizmetiniz var mı?",
      reply: "250 TL ve üzeri alışverişlerinizde kapıda ödeme mevcuttur.",
    },
    {
      request: "Sipariş takibimi nasıl yapabilirim?",
      reply:
        "Siparişinizin güncel durumunu üyelik sayfanızda siparişlerim sekmesinden takip edebilirsiniz.",
    },
    {
      request:
        "İptal ve iade ettiğim ürünlerin tutarı hesabıma ne zaman aktarılır?",
      reply:
        "BKM kurallarına göre iade işlemleri, kredi kartları ile yapılan ödemelerde 1-3 iş günü içerisinde, debit kartlar ile yapılan ödemelerde ise 7-14 iş günü içerisinde kart hesabına yansımaktadır.",
    },
  ],
  ürünler: [
    {
      request: "OJSNUTRİTİON ürünlerinin menşei neresi?",
      reply:
        "Ürünlerin hammaddeleri ithal olup, paketlenmesi Türkiye'de yapılmaktadır. OJSNUTRİTİON marka ürünlerin menşei Türkiye'dir.",
    },
    {
      request: "Hangi sertifikalarınız var?",
      reply:
        "ISO 9001, ISO 22000 ve HELAL sertifikalarına sahip bir tesiste üretim yapmaktayız.",
    },
    {
      request: "Satılan ürünler garantili midir? Değişim var mı?",
      reply:
        "Satın aldığınız ürünler açılmamış ise 14 gün içerisinde iade hakkınız mevcuttur. Açılan ürünleri iade alamıyoruz.",
    },
    {
      request: "Yüksek proteinli ürünleri kimler kullanabilir?",
      reply:
        "15 yaş üstü bireyler kullanabilir. Özellikle spor yapan bireylerin protein ihtiyacı artar.",
    },
    {
      request: "Sattığınız ürünler ilaç mıdır?",
      reply:
        "İlaç değildir. OSJNUTRİTİON markalı ürünlerimiz sporcu gıdasıdır.",
    },
    {
      request:
        "İptal ve iade ettiğim ürünlerin tutarı hesabıma ne zaman aktarılır?",
      reply:
        "BKM kurallarına göre iade işlemleri, kredi kartları ile yapılan ödemelerde 1-3 iş günü içerisinde, debit kartlar ile yapılan ödemelerde ise 7-14 iş günü içerisinde kart hesabına yansımaktadır.",
    },
  ],
  kargo: [
    {
      request: "Siparişimi nasıl iptal edebilirim?",
      reply:
        "Siparişinizi iptal etmek için sipariş numaranızı ve iptal talebinizi belirten mailinizi iletebilirsiniz.",
    },
    {
      request: "Siparişimi teslim alırken nelere dikkat etmeliyim?",
      reply:
        "Koli dışında eziklik, yırtılma ve hasar olması durumunda kolileri teslim almayarak kargo yetkilisine tutanak tutturmalısınız.",
    },
    {
      request: "Kapıda ödeme hizmetiniz var mı?",
      reply: "250 TL ve üzeri alışverişlerinizde kapıda ödeme mevcuttur.",
    },
    {
      request: "Sipariş takibimi nasıl yapabilirim?",
      reply:
        "Siparişinizin güncel durumunu üyelik sayfanızda siparişlerim sekmesinden takip edebilirsiniz.",
    },
    {
      request: "Aynı gün kargo hizmetiniz var mı?",
      reply:
        "16:00'dan önceki siparişlerde aynı gün kargo hizmetimiz bulunmaktadır.",
    },
    {
      request: "Ücretsiz kargo hizmetiniz var mı?",
      reply: "150 TL üzeri siparişlerde ücretsiz kargo hizmetimiz mevcuttur.",
    },
  ],
};
function ControlledTabsExample() {
  const [key, setKey] = useState<string>("genel");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container className="my-5 pt-3">
      <Row className="d-flex justify-content-center">
        <div className="col-sm-12 col-lg-12 col-md-12">
          <div className="mb-3">
            <span className="m-3">
              <FaRegCreditCard className="fs-3 me-1" />
              {key}
            </span>
          </div>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => k && setKey(k)}
            className="mb-5 pb-5"
          >
            <Tab eventKey="genel" title="genel">
              <Accordion>
                {SSS.genel.map((item, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <Accordion.Item
                      className="accordion-item"
                      eventKey={index.toString()}
                    >
                      <Accordion.Header
                        onClick={() => handleToggle(index)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                        className="accordion-header"
                      >
                        <span>{item.request}</span>
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        {item.reply}
                      </Accordion.Body>
                    </Accordion.Item>
                  </div>
                ))}
              </Accordion>
            </Tab>
            <Tab eventKey="ürünler" title="ürünler">
              <Accordion>
                {SSS.ürünler ? (
                  SSS.ürünler.map((item, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                      <Accordion.Item
                        className="accordion-item"
                        eventKey={index.toString()}
                      >
                        <Accordion.Header
                          onClick={() => handleToggle(index)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                          className="accordion-header"
                        >
                          <span>{item.request}</span>
                        </Accordion.Header>
                        <Accordion.Body className="accordion-body">
                          {item.reply}
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  ))
                ) : (
                  <div>No items available.</div>
                )}
              </Accordion>
            </Tab>
            <Tab eventKey="kargo" title="kargo">
              <Accordion>
                {SSS.kargo ? (
                  SSS.kargo.map((item, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                      <Accordion.Item
                        className="accordion-item"
                        eventKey={index.toString()}
                      >
                        <Accordion.Header
                          onClick={() => handleToggle(index)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                          className="accordion-header"
                        >
                          <span>{item.request}</span>
                        </Accordion.Header>
                        <Accordion.Body className="accordion-body">
                          {item.reply}
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  ))
                ) : (
                  <div>No items available.</div>
                )}
              </Accordion>
            </Tab>
          </Tabs>
        </div>
      </Row>
      <Row className="mt-3">
        <ContactForm />
      </Row>
    </Container>
  );
}

export default ControlledTabsExample;
