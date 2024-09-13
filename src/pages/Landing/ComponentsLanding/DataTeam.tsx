import cutter from "../img/icon/cutter.svg"
import offerImg1 from "../img/offer_img_1.png"
import offerImg2 from "../img/offer_img_2.png"
import offerImg3 from "../img/offer_img_3.png"
import offerImg4 from "../img/offer_img_4.png"

const DataTeam = () => {
    return (
        <section className="our_offer">
            <div className="container-fluid">
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        <div className="single_offer_part">
                            <div className="single_offer">
                                <img src={offerImg1} alt="offer_img_1" />
                                <div className="hover_text">
                                    <img src={cutter} alt="#" />
                                    <h2>Profesionales</h2>
                                    <p>Contamos con las mejores herramientas para ofrecerte un servicio de alta calidad</p>
                                </div>
                            </div>
                        </div>
                        <div className="single_offer_part">
                            <div className="single_offer">
                                <img src={offerImg2} alt="offer_img_1" />
                                <div className="hover_text">
                                    <img src={cutter} alt="#" />
                                    <h2>Mejor Precio</h2>
                                    <p>Calidad superior a precios que se ajustan a tu presupuesto.</p>
                                    <a href="#" className="offer_btn"><span className="flaticon-slim-right"></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="single_offer_part">
                            <div className="single_offer">
                                <img src={offerImg3} alt="offer_img_1" />
                                <div className="hover_text">
                                    <img src={cutter} alt="#" />
                                    <h2>Fitness</h2>
                                    <p>Equípate con lo último en tecnología para entrenar con estilo.</p>
                                    <a href="#" className="offer_btn"><span className="flaticon-slim-right"></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="single_offer_part">
                            <div className="single_offer">
                                <img src={offerImg4} alt="offer_img_1" />
                                <div className="hover_text">
                                    <img src={cutter} alt="#" />
                                    <h2>Personalizado</h2>
                                    <p>Juntos encontraremos el mejor estilo para usted.</p>
                                    <a href="#" className="offer_btn"><span className="flaticon-slim-right"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DataTeam