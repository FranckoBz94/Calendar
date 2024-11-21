import { Box, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
// import ModalContent from "./ModalContent";
import dayjs from "dayjs";
import "./css/style.css"
import "./css/bootstrap.min.css"
// import sectionTittleIcon from './img/logo.png'; // Importa la imagen
import MotionModalLanding from "components/Modal/Modal_landing";
import ModalContentNew from "./ModalContentNew";
import { DateContants } from "utils/DateContants";
import CloseIcon from '@mui/icons-material/Close';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Staff from "./ComponentsLanding/Staff";
import about1 from "./img/about_us_1.png"
import about2 from "./img/about_us_2.png"
import about3 from "./img/about_us_3.png"
import Pricing from "./ComponentsLanding/Pricing";
import DataTeam from "./ComponentsLanding/DataTeam";
import Navbar from "./NavBar";
import store from "redux/store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllDays } from "redux/actions/hoursAction";

dayjs.locale('es');

const Landing = () => {
  const [openModal, setOpenModal] = useState(false)
  const [hiddenDays, setHiddenDays] = useState<number[]>([]);

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  type RootState = ReturnType<typeof store.getState>
  const storeComplete: any = useSelector((state: RootState) => state)
  const { days } = useSelector((state: RootState) => storeComplete.days, shallowEqual);
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 19);

  const dispatch = useDispatch()
  useEffect(() => {
    if (days && days.length > 0) {
      const calculatedHiddenDays = days.reduce((acc: number[], day: any, index: number) => {
        if (!day.is_open) {
          acc.push(day.id); // Usa el índice para los días de la semana
        }
        return acc;
      }, []);
      console.log("calculatedHiddenDays", calculatedHiddenDays);
      setHiddenDays(calculatedHiddenDays);
    }
  }, [days]);

  useEffect(() => {
    dispatch(getAllDays() as any)
  }, [])

  const dates = DateContants.generateDates(startDate, endDate, hiddenDays);

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
            <Navbar />
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

                    <a href="#" className="btn_1" style={{ borderRadius: 10 }} onClick={() => handleOpenModal()}><EventNoteIcon sx={{ mr: 1 }} />Nuevo turno</a>
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
