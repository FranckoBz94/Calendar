import { Box, Card, IconButton } from "@mui/material";
import React, { useState } from "react";
// import ModalContent from "./ModalContent";
import dayjs from "dayjs";
import "./css/style.css"
import "./css/bootstrap.min.css"
import sectionTittleIcon from './img/logo.png'; // Importa la imagen
import MotionModalLanding from "components/Modal/Modal_landing";
import ModalContentNew from "./ModalContentNew";
import { DateContants } from "utils/DateContants";
import CloseIcon from '@mui/icons-material/Close';
import Staff from "./ComponentsLanding/Staff";
// import cutter from "./img/icon/cutter.svg"
import about1 from "./img/about_us_1.png"
import about2 from "./img/about_us_2.png"
import about3 from "./img/about_us_3.png"
import Pricing from "./ComponentsLanding/Pricing";
import DataTeam from "./ComponentsLanding/DataTeam";

dayjs.locale('es');

const Landing = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  const dates = DateContants.generateDates(startDate, endDate);
  console.log("dias prox", dates)
  return (
    <div>
      <MotionModalLanding
        isOpen={openModal}
        handleClose={handleCloseModal}
      >
        <Box m={1} position="relative">
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 999 }}
          >
            <CloseIcon />
          </IconButton>
          <Card>
            <ModalContentNew dates={dates} />
          </Card>
        </Box>
      </MotionModalLanding>
      <div className="main_menu home_menu">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="index.html"> <img src={sectionTittleIcon} alt="logo" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span className="menu_icon"></span>
                </button>

                <div className="collapse navbar-collapse main-menu-item"
                  id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="index.html">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="about.html">About</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="service.html">Service</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Blog
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="blog.html"> blog</a>
                        <a className="dropdown-item" href="single-blog.html">Single blog</a>

                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        pages
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                        <a className="dropdown-item" href="team.html">team</a>
                        <a className="dropdown-item" href="price.html">price</a>
                        <a className="dropdown-item" href="elements.html">Elements</a>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="contact.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="banner_part">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="banner_text">
                <div className="banner_text_iner">
                  <h5>Autogestioná tu turno</h5>
                  <h1>Sistema de reservas</h1>
                  <p>Divide give Dominion wont deep he them seed thing open sixth beast dont yea very
                    it meat yielding for air in without one upon it without, his creepeth tree
                    gathering behold and, greater have given deep his</p>
                  <div className="banner_btn">
                    <a href="#" className="btn_1" onClick={() => handleOpenModal()}>Nuevo turno</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about_part">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-4 col-lg-6">
              <div className="about_img ">
                <img src={about1} className="Quote" alt="" />
                <img src={about2} className="about_img_2" alt="" />
                <img src={about3} className="about_img_3" alt="" />
              </div>
            </div>
            <div className="col-md-7 offset-md-1 col-lg-3 offset-lg-1">
              <div className="about_text">
                <h5>Sobre nosotros</h5>
                <h2>Conéctate con tu estilo ideal</h2>
                <p>Nuestro compromiso es ofrecerte un servicio que refleje tu estilo y personalidad. Creemos que
                  cada detalle cuenta, y es por eso que utilizamos productos de la más alta calidad para garantizar
                  resultados excepcionales. Nos esforzamos por brindarte una experiencia única en cada visita,
                  cuidando de cada aspecto de tu bienestar y estilo.</p>
                <p>Trabajamos con dedicación para proporcionarte un servicio de primera, asegurando que cada
                  cliente se sienta especial y satisfecho. Ya sea que busques renovar tu imagen o mantener tu
                  estilo actual, estamos aquí para ayudarte a alcanzar tus objetivos de belleza con la calidad que mereces.</p>
              </div>
            </div>
          </div>
        </div>
      </section >
      <Staff />
      <DataTeam />
      <Pricing />
      <section className="regervation_part section_padding">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-7">
              <div className="regervation_part_iner">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input type="email" className="form-control" id="inputEmail4" placeholder="Name *" />
                    </div>
                    <div className="form-group col-md-6">
                      <input type="password" className="form-control" id="inputPassword4"
                        placeholder="Email address *" />
                    </div>
                    <div className="form-group col-md-6">
                      <select className="form-control" id="Select">
                        <option value="2">Name of service</option>
                        <option value="3">Name of service</option>
                        <option value="4">Name of service</option>
                        <option value="5">Name of service</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <input type="text" className="form-control" id="pnone" placeholder="Phone number *" />
                    </div>
                    <div className="form-group col-md-6">
                      <div className="input-group date">
                        <input id="datepicker" type="text" className="form-control" placeholder="Date *" />
                      </div>
                    </div>
                    <div className="form-group time_icon col-md-6">
                      <select className="form-control" id="Select2">
                        <option value="1">8 AM TO 10AM</option>
                        <option value="1">10 AM TO 12PM</option>
                        <option value="1">12PM TO 2PM</option>
                        <option value="1">2PM TO 4PM</option>
                        <option value="1">4PM TO 6PM</option>
                        <option value="1">6PM TO 8PM</option>
                        <option value="1">4PM TO 10PM</option>
                        <option value="1">10PM TO 12PM</option>
                      </select>
                    </div>
                  </div>


                  <div className="regerv_btn">
                    <a href="#" className="regerv_btn_iner">Make an Appointment</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-sm-6 col-lg-4">
              <div className="single-footer-widget footer_1">
                <h4>Sobre nosotros</h4>
                <p>¿Quieres tener aún más éxito? Aprenda a amar el aprendizaje y el crecimiento. Cuanto más esfuerzo pongas en mejorar tus habilidades, mayor será la recompensa que obtendrás. Date cuenta de que las cosas
                </p>
                <p className="mt-3" >Cuanto más te esfuerces en mejorar tus habilidades, mayor será tu nivel.</p>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-lg-4">
              <div className="single-footer-widget footer_2">
                <h4>Contacto</h4>
                <div className="contact_info">
                  <span className="ti-home"></span>
                  <h5>Ubicacion, Provincia, Ciudad</h5>
                  <p>Av Calle Nueva 1234</p>
                </div>
                <div className="contact_info">
                  <span className="ti-headphone-alt"></span>
                  <h5>+54 123456789</h5>
                  <p>Lunes a viernes de 9:00Hs a 18:00Hs.</p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-8 col-lg-4">
              <div className="single-footer-widget footer_3">
                <h4>Información</h4>
                <p>Manténgase actualizado con nuestras últimas tendencias. Siempre que intente mejorar sus habilidades, lo más probable es que sea recompensado por lograr estas cosas.</p>
                <div className="form-wrap" id="mc_embed_signup">
                  <form target="_blank"
                    action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                    method="get" className="form-inline">
                    <input className="form-control" name="EMAIL" placeholder="Your Email Address" required type="email" />
                    <button className="btn btn-default text-uppercase"><i className="ti-angle-right"></i></button>
                    <div style={{ position: "absolute", left: "-5000px" }}>
                      <input name="b_36c4fd991d266f23781ded980_aefe40901a"
                        type="text" />
                    </div>

                    <div className="info"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright_part">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <p className="footer-text m-0">
                  Copyright
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default Landing;
