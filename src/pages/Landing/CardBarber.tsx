import { makeStyles } from "@mui/styles";
import clsx from 'clsx';

interface FormCardBarberProps {
  id: string | number; // Tipos específicos
  selectedId: string | number | null; // Tipos específicos
  handleClick: (id: string | number, dataBarber: any) => void; // Función que recibe id y no retorna nada
  dataBarber: any
}

const useStyles = makeStyles({
  selected: {
    border: "1px solid green",
    borderRadius: "5px",
  }
});

const CardBarber = (props: FormCardBarberProps) => {
  const { id, selectedId, handleClick, dataBarber } = props;
  const classes = useStyles(); // Mover esto dentro del componente
  console.log("dataBarber card", dataBarber)
  return (
    <div className={clsx('barber_card', { [classes.selected]: id === selectedId })}>
      <div style={{ height: '100%', cursor: 'pointer' }} onClick={() => handleClick(id, dataBarber)}>
        <img src={`${process.env.REACT_APP_URL_BASE}${dataBarber.imagen}`} className="img_card_barber" alt="" />
        <p className="name_barber_card">{dataBarber?.firstName} {dataBarber?.lastName}</p>
      </div>
    </div>
  );
}

export default CardBarber;
