import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import FiveStar from "../FiveStars/FiveStar";
import { useState } from "react";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerData: FooterSection[] = [
  {
    title: "OJSNUTRİTİON",
    links: [
      { title: "İletişim", href: "#" },
      { title: "Hakkımızda", href: "#" },
      { title: "Sıkça Sorulan Sorular", href: "#" },
      { title: "KVKK", href: "#" },
      { title: "Çalışma İlkelerimiz", href: "#" },
      { title: "Satış Sözleşmesi", href: "#" },
      { title: "Garanti ve İade Koşulları", href: "#" },
      { title: "Gerçek Müşteri Yorumları", href: "#" },
      { title: "Blog", href: "#" },
    ],
  },
  {
    title: "Kategoriler",
    links: [
      { title: "Protein", href: "/" },
      { title: "Spor Gıdaları", href: "/" },
      { title: "Sağlık", href: "/" },
      { title: "Gıda", href: "/" },
      { title: "Vitamin", href: "/" },
      { title: "Aksesuar", href: "/" },
      { title: "Tüm Ürünler", href: "/products" },
      { title: "Paketler", href: "/" },
      { title: "Lansmana Özel Fırsatlar", href: "/" },
    ],
  },
  {
    title: "Popüler Ürünler",
    links: [
      { title: "Whey Protein", href: "#" },
      { title: "Cream of Rice", href: "#" },
      { title: "Creatine", href: "#" },
      { title: "BCAA+", href: "#" },
      { title: "Pre-Workout", href: "#" },
      { title: "Fitness Paketi", href: "#" },
      { title: "Collagen", href: "#" },
      { title: "Günlük Vitamin Paketi", href: "#" },
      { title: "ZMA", href: "#" },
    ],
  },
];

const Footer: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  //   EXPANDED Statinde arama yaparak fonksiyona gönderdigimiz indexi arıyoruz eger var ise filter ile bu diziyi temizleyip kapanmasını saglıyoruz
  //  eger index false dönerse yani expanded statinde bulunmazsa kapalı demektir ve açtık

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        {/* Top Section */}
        <div className="mb-5">
          <div className="d-flex align-items-center mb-4">
            {[...Array(1)].map((_, index) => (
              <FiveStar key={index} />
            ))}
            <span className="ml-2">(300.000+)</span>
          </div>

          <div className="row mb-5">
            <div className="col-md-6">
              <h2 className="h3 fs-4 font-weight-bold">
                LABORATUVAR TESTLİ ÜRÜNLER
                <br />
                AYNI GÜN & ÜCRETSİZ KARGO
                <br />
                MEMNUNİYET GARANTİSİ
              </h2>
            </div>
            <div className="col-md-6">
              <p className="">
                300.000'den fazla ürün yorumumuza dayanarak, ürünlerimizi
                seveceğinize eminiz. Eğer herhangi bir sebeple memnun
                kalmazsanız, bizimle iletişime geçtiğinizde çözüme
                kavuşturacağız.
              </p>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="row mb-5">
          {footerData.map((section, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="d-flex align-items-center justify-content-between d-md-none"
                onClick={() => toggleSection(index)}
                style={{ cursor: "pointer" }}
              >
                <h1 className="h5 fs-5 font-weight-bold mb-0">
                  {section.title}
                </h1>
                {expandedSections.includes(index) ? (
                  <IoRemoveOutline size={24} />
                ) : (
                  <IoAddOutline size={24} />
                )}
              </div>
              <h1 className="h5 fs-5 font-weight-bold d-none d-md-block">
                {section.title}
              </h1>
              <ul
                className={`list-unstyled ${
                  expandedSections.includes(index) ? "d-block" : "d-none"
                } d-md-block`}
              >
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="nav-link">
                    <a
                      href={link.href}
                      className="text-white opacity-50 text-decoration-none text-light"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className=" border-muted pt-4 d-flex flex-column ">
          <div className=" text-md-left">
            <p className="text-white opacity-50" style={{ fontSize: "14px" }}>
              Copyright ©YUNUS EMRE SEFEROĞLU - Tüm Hakları Saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
