import clsx from 'clsx';

interface FormCardBarberProps {
  id: string | number; // Tipos específicos
  selectedId: string | number | null; // Tipos específicos
  handleClick: (id: string | number, dataBarber: any) => void; // Función que recibe id y no retorna nada
  dataBarber: any
}

const CardBarber = (props: FormCardBarberProps) => {
  const { id, selectedId, handleClick, dataBarber } = props;
  console.log("dataBarber card", dataBarber)
  return (
    <div className={clsx("barberCard", { "selected": id === selectedId })}>
      <div className="content" onClick={() => handleClick(id, dataBarber)}>
        <img
          src={`${process.env.REACT_APP_URL_BASE}${dataBarber.imagen}`}
          className="img_card_barber"
          alt={`${dataBarber.firstName} ${dataBarber.lastName}`}
        />
      </div>
      <p className="name_barber_card">{dataBarber?.firstName} {dataBarber?.lastName}</p>
    </div>
  );
}

export default CardBarber;
