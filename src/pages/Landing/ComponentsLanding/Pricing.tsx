import { Avatar } from "@mui/material"
import { useEffect } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { getAllServices } from "redux/actions/servicesAction"
import store from "redux/store"

const Pricing = () => {
  type RootState = ReturnType<typeof store.getState>
  const dispatch = useDispatch()
  const storeComplete: any = useSelector((state: RootState) => state)
  const services = useSelector((state: RootState) => storeComplete.services, shallowEqual);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllServices() as any);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="priceing_part ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-lg-6 col-sm-10">
            <div className="section_tittle">
              <h2>Costos de nuestros servicios</h2>
              <p>Ofrecemos una amplia carta de servicios para que pueda elegir el que mas se ajuste a sus necesidades.</p>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          {services && services.map((service: any) => {
            return (
              <div className="col-md-6 col-lg-6" key={service.id}>
                <div className="single_pricing_item" >
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 56, height: 56, float: "left", display: "flex" }}
                  />
                  <div className="single_pricing_text">
                    <h5>{service.name_service}</h5>
                    <h6>{service.price_service}</h6>
                    <p style={{ marginBottom: "5px" }}>Tiempo aproximado del servicio: {service.minutes_service} minutos</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Pricing