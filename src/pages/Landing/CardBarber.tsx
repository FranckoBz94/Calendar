// CardBarber.tsx
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
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  border: '2px solid #f0f0f0',
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '10px',
    backgroundColor: '#f7c331',
  },
}));

const CardBarber = (props: FormCardBarberProps) => {
  const { id, selectedId, handleClick, dataBarber } = props;
  return (
    <BarberCardContainer className={clsx({ "selected": id === selectedId })} onClick={() => handleClick(id, dataBarber)}>
      <Box display="flex" flexDirection="column" height="100%">
        <Box sx={{ height: { xs: '150px', sm: '200px', md: '250px' }, width: '100%', overflow: 'hidden' }}>
          <CardMedia
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
            component="img"
            alt={`${dataBarber.firstName} ${dataBarber.lastName}`}
            src={`${process.env.REACT_APP_URL_BASE}${dataBarber.imagen}`}
            title={`${dataBarber.firstName} ${dataBarber.lastName}`}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold', marginBottom: '0px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: { xs: '1.15rem', md: '1.25rem' } }}>
            {dataBarber?.firstName}
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: { xs: '1.15rem', md: '1.25rem' } }}>
            {dataBarber?.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Staff Barberia
          </Typography>
        </Box>
      </Box>
    </BarberCardContainer>
  );
}

export default CardBarber;
