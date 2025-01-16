import FiveStar from "../../../assets/components/layout/FiveStars/FiveStar";
import ProductComment from "../ProductDetail/components/ProductComment/ProductComment";

function About() {
    return <>
        <div className="mt-1">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* İlk bölüm */}
                        <div className="d-flex flex-column gap-3">
                            <h4 className="fw-bolder">Sağlıklı ve Fit Yaşamayı Zevkli ve Kolay Hale Getirmek İçin Varız</h4>
                            <p className="mb-3">2016 yılından beri sporcu gıdaları, takviye edici gıdalar ve fonksiyonel gıdaları üreten bir firma olarak; müşterilerimize en kaliteli, lezzetli, tüketilmesi kolay ürünleri sunuyoruz. <br /><br /> Müşteri memnuniyeti ve sağlığı her zaman önceliğimiz olmuştur. Ürünlerimizde, yüksek kalite standartlarına bağlı olarak, sporcuların ve sağlıklı yaşam tutkunlarının ihtiyaçlarına yönelik besleyici çözümler sunuyoruz. Ürün yelpazemizdeki protein tozları, aminoasitler, vitamin ve mineral takviyeleri ile spor performansınızı desteklemek için ideal besin değerlerini sunuyoruz. <br /> <br />Sizin için sadece en iyisinin yeterli olduğunu biliyoruz. Bu nedenle, inovasyon, kalite, sağlık ve güvenlik ilkelerimizi korurken, sürekli olarak ürünlerimizi geliştirmeye ve yenilikçi beslenme çözümleri sunmaya devam ediyoruz.</p>
                            <small>istiyorsanız, bize katılın ve en besleyici çözümlerimizle tanışın. Sağlıklı ve aktif bir yaşam için biz her zaman yanınızdayız.</small>
                        </div>

                        {/* İkinci bölüm */}
                        <div className="d-flex flex-column gap-3 mt-4">
                            <h4 className="fw-bolder">1.000.000+ den Fazla Mutlu Müşteri</h4>
                            <p>Sanatçılardan profesyonel sporculara, doktordan öğrencilere hayatın her alanında sağlıklı yaşamı ve beslenmeyi hedefleyen 1.000.000'den fazla kişiye ulaştık.</p>
                        </div>

                        {/* Sertifikalar bölümü */}
                        <div className="mt-4">
                            <h4 className="fw-bolder mb-5">Sertifikalarımız</h4>
                            <div className="row">
                                <div className="col-12 aboutUs">
                                    <img className="me-2" style={{ width: 100, height: 100 }} src="/src/assets/images/certificatesImages/certificates1.png" alt="" />
                                    <img className="me-2" style={{ width: 100, height: 100 }} src="/src/assets/images/certificatesImages/certificates2.png" alt="" />
                                    <img className="me-2" style={{ width: 100, height: 100 }} src="/src/assets/images/certificatesImages/certificates3.png" alt="" />
                                    <img className="me-2" style={{ width: 100, height: 100 }} src="/src/assets/images/certificatesImages/certificates4.png" alt="" />
                                    <img className="me-2" style={{ width: 100, height: 100 }} src="/src/assets/images/certificatesImages/certificates5.png" alt="" />
                                    <img className="me-2" style={{ width: 100, height: 100 }} src="/src/assets/images/certificatesImages/certificates6.png" alt="" />
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap-3 py-3 my-3 border-top border-bottom">
                                <FiveStar />
                                <span className="text-primary">196900 Yorum</span>
                            </div>

                            <div>
                                <span className="d-inline-block bg-primary text-white p-2 m-1 rounded-pill fw-bolder">ÜRÜN İNCELEMELERİ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductComment />
        </div>
    </>
}

export default About;