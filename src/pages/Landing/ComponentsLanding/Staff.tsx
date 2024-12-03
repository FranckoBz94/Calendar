import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllBarbers } from "redux/actions/barbersAction";
import store from "redux/store";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import BrushIcon from '@mui/icons-material/Brush';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { Box } from "@mui/material";

const Staff = () => {
  type RootState = ReturnType<typeof store.getState>
  const dispatch = useDispatch()
  const storeComplete: any = useSelector((state: RootState) => state)
  const barbers = useSelector((state: RootState) => storeComplete.barbers, shallowEqual);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllBarbers() as any);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="artist_part" style={{ borderBottom: "1px solid #ddd", background: "#ddd" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-lg-6 col-sm-10">
            <div className="section_tittle">
              <Box sx={{ mb: 2, display: "flex", gap: 4, justifyContent: "center", background: "#bf720052", borderRadius: 25, padding: "8px" }}>
                <ContentCutIcon />
                <BrushIcon />
                <EventSeatIcon />
              </Box>
              <h2>Nuestro equipo de trabajo</h2>
              <p>Nuestro equipo está conformado por especialistas del cabello.
                La capacitación constante nos ayuda a tener una mejor opción para tu look.
                Nuestro deseo es poder brindarte lo mejor para tu imagen. GRACIAS POR ELEGIRNOS.</p>
            </div>
          </div>
        </div>
        <div className="row">
          {barbers && barbers.map((barber: any) => {
            return (
              <div className="col-sm-6 col-lg-4" key={barber.id}>
                <div className="single_blog_item h-100">
                  <div className="single_blog_img d-flex justify-content-center" >
                    <img src={`${process.env.REACT_APP_URL_BASE}${barber.imagen}`} alt="artist" style={{ borderRadius: "5px" }} />
                  </div>
                  <div className="single_text">
                    <div className="single_blog_text text-center">
                      <h3>{barber.firstName} {barber.lastName}</h3>
                      <p>Staff barberia</p>

                    </div>
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

export default Staff