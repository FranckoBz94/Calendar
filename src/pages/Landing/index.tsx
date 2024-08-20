import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import ModalContent from "./ModalContent";
import dayjs from "dayjs";
import "./css/style.css"
import "./css/bootstrap.min.css"
import sectionTittleIcon from './img/logo.png'; // Importa la imagen
import MotionModalLanding from "components/Modal/Modal_landing";

dayjs.locale('es');

const Landing = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  return (
    <div>
      <MotionModalLanding
        isOpen={openModal}
        handleClose={handleCloseModal}
      >
        <Box m={1} position="relative">
          <Card>
            <ModalContent />
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
                <img src="../img/about_us_1.png" className="about_img_1" alt="" />
                <img src="../img/about_us_2.png" className="about_img_2" alt="" />
                <img src="../img/about_us_3.png" className="about_img_3" alt="" />
              </div>
            </div>
            <div className="col-md-7 offset-md-1 col-lg-3 offset-lg-1">
              <div className="about_text">
                <h5>About us</h5>
                <h2>Connect with your dream style</h2>
                <p>Seed spirit replenish cattle one moved air created. Them fill dont be fed isnt to he
                  shall god good spirit they are the. Hath Itself their second ifruitful a moving
                  their creature living every i replenish land and had hen lesser for their good
                  quality products</p>
                <p>Seed spirit replenish cattle one moved air created. Them fill dont be fed isnt to he shall
                  god good spirit they are the. Hath Itself their second ifruitful a moving their creature
                  living every</p>
                <a href="#" className="btn_3">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section >
      <section className="service_part section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-lg-6 col-sm-10">
              <div className="section_tittle">
                <img src="/img/section_tittle_icon.png" alt="icon" />
                <h2>Service Expectation</h2>
                <p>Good morning forth gathering doesnt god gathering man and had moveth there dry sixth</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="single_service_part">
                <img src="./img/service/single_service_1.png" alt="" />
                <div className="single_service_text">
                  <h4>Stylish Hair Cut</h4>
                  <p>Good morning forth gathering does god gathering man and had moveth there
                    dry so dominion rule divided had</p>
                  <a href="#" className="btn_3">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="single_service_part">
                <img src="img/service/single_service_2.png" alt="" />
                <div className="single_service_text">
                  <h4>Wedding Hair</h4>
                  <p>Good morning forth gathering does god gathering man and had moveth there
                    dry so dominion rule divided had</p>
                  <a href="#" className="btn_3">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="single_service_part">
                <img src="img/service/single_service_3.png" alt="" />
                <div className="single_service_text">
                  <h4>Color & Hair Wash</h4>
                  <p>Good morning forth gathering does god gathering man and had moveth there
                    dry so dominion rule divided had</p>
                  <a href="#" className="btn_3">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="our_offer">
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-lg-12">
              <div className="single_offer_part">
                <div className="single_offer">
                  <img src="img/offer_img_1.png" alt="offer_img_1" />
                  <div className="hover_text">
                    <img src="img/icon/cutter.svg" alt="#" />
                    <h2>Best Equipment</h2>
                    <p>Winged day grass creepeth us second signs</p>
                    <a href="#" className="offer_btn"><span className="flaticon-slim-right"></span></a>
                  </div>
                </div>
              </div>
              <div className="single_offer_part">
                <div className="single_offer">
                  <img src="img/offer_img_2.png" alt="offer_img_1" />
                  <div className="hover_text">
                    <img src="img/icon/cutter.svg" alt="#" />
                    <h2>Best Price</h2>
                    <p>Winged day grass creepeth us second signs </p>
                    <a href="#" className="offer_btn"><span className="flaticon-slim-right"></span></a>
                  </div>
                </div>
              </div>
              <div className="single_offer_part">
                <div className="single_offer">
                  <img src="img/offer_img_3.png" alt="offer_img_1" />
                  <div className="hover_text">
                    <img src="img/icon/cutter.svg" alt="#" />
                    <h2>Fitness Equipment</h2>
                    <p>Winged day grass creepeth us second signs</p>
                    <a href="#" className="offer_btn"><span className="flaticon-slim-right"></span></a>
                  </div>
                </div>
              </div>
              <div className="single_offer_part">
                <div className="single_offer">
                  <img src="img/offer_img_4.png" alt="offer_img_1" />
                  <div className="hover_text">
                    <img src="img/icon/cutter.svg" alt="#" />
                    <h2>Fitness Training</h2>
                    <p>Winged day grass creepeth us second signs</p>
                    <a href="#" className="offer_btn"><span className="flaticon-slim-right"></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="priceing_part">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-lg-6 col-sm-10">
              <div className="section_tittle">
                <img src="img/section_tittle_icon.png" alt="icon" />
                <h2>Pricing Plan</h2>
                <p>Good morning forth gathering doesnt god gathering man and had moveth there dry sixth
                  dominion rule divided behold after had he did not move .</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-6">
              <div className="single_pricing_item">
                <img src="img/pricing_img/pricing_img_1.png" alt="" />
                <div className="single_pricing_text">
                  <h5>Hair Cut</h5>
                  <h6>$10.00</h6>
                  <p>Their days lesser and every firmament</p>
                </div>
              </div>
              <div className="single_pricing_item">
                <img src="img/pricing_img/pricing_img_2.png" alt="" />
                <div className="single_pricing_text">
                  <h5>Hair Color</h5>
                  <h6>$10.00</h6>
                  <p>Their days lesser and every firmament</p>
                </div>
              </div>
              <div className="single_pricing_item">
                <img src="img/pricing_img/pricing_img_3.png" alt="" />
                <div className="single_pricing_text">
                  <h5>Hair Straight</h5>
                  <h6>$10.00</h6>
                  <p>Their days lesser and every firmament</p>
                </div>
              </div>
              <div className="single_pricing_item">
                <img src="img/pricing_img/pricing_img_4.png" alt="" />
                <div className="single_pricing_text">
                  <h5>Shampoo</h5>
                  <h6>$10.00</h6>
                  <p>Their days lesser and every firmament</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="single_pricing_item">
                <img src="img/pricing_img/pricing_img_5.png" alt="" />
                <div className="single_pricing_text">
                  <h5>Hair Wash</h5>
                  <h6>$10.00</h6>
                  <p>Their days lesser and every firmament</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="review_part gray_bg section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="client_review_part owl-carousel">
                <div className="client_review_single">
                  <img src="img/Quote.png" className="Quote" alt="quote" />
                  <div className="client_review_text">
                    <p>Also made from. Give may saying meat there from heaven it lights face had is gathered
                      god dea earth light for life may itself shall whales made theyre blessed whales
                      also made from give
                      may saying meat. There from heaven it lights face had amazing place</p>
                  </div>
                  <div className="client_img">
                    <img src="img/client/client_1.png" alt="" />
                  </div>
                  <h4>Mosan Cameron, <span>Executive of fedex</span></h4>
                </div>
                <div className="client_review_single">
                  <img src="img/Quote.png" className="Quote" alt="quote" />
                  <div className="client_review_text media-body">
                    <p>Also made from. Give may saying meat there from heaven it lights face had is gathered
                      god dea earth light for life may itself shall whales made theyre blessed whales
                      also made from give
                      may saying meat. There from heaven it lights face had amazing place</p>
                  </div>
                  <div className="client_img">
                    <img src="img/client/client_1.png" alt="" />
                  </div>
                  <h4>Mosan Cameron, <span>Executive of fedex</span></h4>
                </div>
                <div className="client_review_single">
                  <img src="img/Quote.png" className="Quote" alt="quote" />
                  <div className="client_review_text">
                    <p>Also made from. Give may saying meat there from heaven it lights face had is gathered
                      god dea earth light for life may itself shall whales made theyre blessed whales
                      also made from give
                      may saying meat. There from heaven it lights face had amazing place</p>
                  </div>
                  <div className="client_img">
                    <img src="img/client/client_1.png" alt="" />
                  </div>
                  <h4>Mosan Cameron, <span>Executive of fedex</span></h4>
                </div>
                <div className="client_review_single">
                  <img src="img/Quote.png" className="Quote" alt="quote" />
                  <div className="client_review_text">
                    <p>Also made from. Give may saying meat there from heaven it lights face had is gathered
                      god dea earth light for life may itself shall whales made theyre blessed whales
                      also made from give
                      may saying meat. There from heaven it lights face had amazing place</p>
                  </div>
                  <div className="client_img">
                    <img src="img/client/client_1.png" alt="" />
                  </div>
                  <h4>Mosan Cameron, <span>Executive of fedex</span></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="artist_part">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-lg-6 col-sm-10">
              <div className="section_tittle">
                <img src="img/section_tittle_icon.png" alt="icon" />
                <h2>Meet Our Artist</h2>
                <p>Good morning forth gathering doesnt god gathering man and had moveth there dry sixth
                  dominion rule divided behold after had he did not move .</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="single_blog_item">
                <div className="single_blog_img">
                  <img src="img/artist/artist_1.png" alt="artist" />
                </div>
                <div className="single_text">
                  <div className="single_blog_text text-center">
                    <h3>Adam Billiard</h3>
                    <p>Chef Master</p>
                    <div className="social_icon">
                      <a href="#"> <i className="ti-facebook"></i> </a>
                      <a href="#"> <i className="ti-twitter-alt"></i> </a>
                      <a href="#"> <i className="ti-instagram"></i> </a>
                      <a href="#"> <i className="ti-skype"></i> </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="single_blog_item">
                <div className="single_blog_img">
                  <img src="img/artist/artist_2.png" alt="artist" />
                </div>
                <div className="single_text">
                  <div className="single_blog_text text-center">
                    <h3>Fred Macyard</h3>
                    <p>Chef Master</p>
                    <div className="social_icon">
                      <a href="#"> <i className="ti-facebook"></i> </a>
                      <a href="#"> <i className="ti-twitter-alt"></i> </a>
                      <a href="#"> <i className="ti-instagram"></i> </a>
                      <a href="#"> <i className="ti-skype"></i> </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="single_blog_item">
                <div className="single_blog_img">
                  <img src="img/artist/artist_3.png" alt="artist" />
                </div>
                <div className="single_text">
                  <div className="single_blog_text text-center">
                    <h3>Justin Stuard</h3>
                    <p>Chef Master</p>
                    <div className="social_icon">
                      <a href="#"> <i className="ti-facebook"></i> </a>
                      <a href="#"> <i className="ti-twitter-alt"></i> </a>
                      <a href="#"> <i className="ti-instagram"></i> </a>
                      <a href="#"> <i className="ti-skype"></i> </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                        <option value="1" selected>Select service*</option>
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
                        <option value="" selected>Time *</option>
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
      <section className="blog_part service_part section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_tittle">
                <img src="img/section_tittle_icon.png" alt="icon" />
                <h2>Latest Style News</h2>
                <p>Good morning forth gathering doesnt god gathering man and had moveth there
                  dry sixth dominion rule divided behold after had he did not move .</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="single_service_part">
                <img src="img/service/single_service_1.png" alt="" />
                <div className="single_service_text">
                  <p> <a href="blog.html">art, illustration</a> <span>|</span> March 30, 2019</p>
                  <h4> <a href="#">There our you divide itseld..</a></h4>
                  <p>Man moveth days wherein youre that made years he after us light let moved.</p>
                  <a href="#" className="btn_3">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="single_service_part">
                <img src="img/service/single_service_2.png" alt="" />
                <div className="single_service_text">
                  <p> <a href="blog.html">art, illustration</a> <span>|</span> March 30, 2019</p>
                  <h4> <a href="#">One which won two divide..</a></h4>
                  <p>Man moveth days wherein youre that made years he after us light let moved.</p>
                  <a href="#" className="btn_3">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="single_service_part">
                <img src="img/service/single_service_3.png" alt="" />
                <div className="single_service_text">
                  <p> <a href="blog.html">art, illustration</a> <span>|</span> March 30, 2019</p>
                  <h4> <a href="#">There our you divide itseld..</a></h4>
                  <p>Man moveth days wherein youre that made years he after us light let moved.</p>
                  <a href="#" className="btn_3">Read More</a>
                </div>
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
                <h4>About Us</h4>
                <p>Do you want to be even more successful? Learn to love learning and growth.
                  The more effort you put into improving your skills, the bigger the payoff you
                  will get. Realize that things </p>
                <p className="mt-3" >The more effort you put into improving your skills, the bigger the stil now</p>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-lg-4">
              <div className="single-footer-widget footer_2">
                <h4>Contact us</h4>
                <div className="contact_info">
                  <span className="ti-home"></span>
                  <h5>Los angeles, United States</h5>
                  <p>659, Rocky beach bullevard, santa monica, Rocky beach, USA.</p>
                </div>
                <div className="contact_info">
                  <span className="ti-headphone-alt"></span>
                  <h5>+44 6532 986 652</h5>
                  <p>Mon to Fri 9am to 6 pm.</p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-8 col-lg-4">
              <div className="single-footer-widget footer_3">
                <h4>Newsletter</h4>
                <p>Stay updated with our latest trends The more effort you put into improving your skills, the bigger the payoff you will get realize that things.</p>
                <div className="form-wrap" id="mc_embed_signup">
                  <form target="_blank"
                    action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                    method="get" className="form-inline">
                    <input className="form-control" name="EMAIL" placeholder="Your Email Address" required type="email" />
                    <button className="btn btn-default text-uppercase"><i className="ti-angle-right"></i></button>
                    <div style={{ position: "absolute", left: "-5000px" }}>
                      <input name="b_36c4fd991d266f23781ded980_aefe40901a" value=""
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
