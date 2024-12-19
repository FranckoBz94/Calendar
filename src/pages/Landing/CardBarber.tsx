import clsx from 'clsx';
import { styled } from "@mui/material/styles";
import { Box, Card, CardMedia, Typography } from '@mui/material';

interface FormCardBarberProps {
  id: string | number;
  selectedId: string | number | null;
  handleClick: (id: string | number, dataBarber: any) => void;
  dataBarber: any;
}

const BarberCardContainer = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '16px',
  cursor: "pointer",
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  border: '2px solid #f0f0f0',
  background: 'linear-gradient(to bottom, rgb(26 14 8 / 55%), rgb(61 40 24))',
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const CardBarber = (props: FormCardBarberProps) => {
  const { id, selectedId, handleClick, dataBarber } = props;

  return (
    <BarberCardContainer className={clsx({ "selected": id === selectedId })} onClick={() => handleClick(id, dataBarber)}>
      <Box display="flex" flexDirection="column" margin="auto" flexGrow={1} alignItems="center">
        <Box
          sx={{
            width: '100%',
            maxWidth: '200px', // Max ancho de la imagen
            aspectRatio: '1 / 1', // Proporción cuadrada
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            alt={`${dataBarber.firstName} ${dataBarber.lastName}`}
            src={`${process.env.REACT_APP_URL_BASE}${dataBarber.imagen}`}
            title={`${dataBarber.firstName} ${dataBarber.lastName}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', pt: 2 }}>
          <Typography variant="h6" color="textSecondary" sx={{
            fontWeight: 'bold',
            color: "#ccc",
            marginBottom: '0px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontSize: { xs: '1.15rem', md: '1.25rem' },
          }}>
            {dataBarber.firstName} {dataBarber.lastName}
          </Typography>
        </Box>
      </Box>

    </BarberCardContainer>
  );
}

export default CardBarber;
