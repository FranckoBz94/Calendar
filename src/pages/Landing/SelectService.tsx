import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface Service {
  id: number;
  name_service: string;
  minutes_service: number;
  price_service: number;
}

interface SelectServiceStepProps {
  services: Service[];
  onChangeSelectService: (e: any) => void;
  selectedService: any;
  dataBarber: any;
}

const StyledCard = styled(Card)(({ selected }: { selected: boolean }) => ({
  borderRadius: '8px',
  border: selected ? '2px solid #fff' : '2px solid #333',
  backgroundColor: selected ? '#403e4b' : '#403e4b',
  color: '#fff',
  cursor: 'pointer',
  height: "100%",
  transition: '0.3s ease-in-out',
  padding: '5px',
  boxShadow: selected
    ? 'inset 0 0 0 1px #333, 0 8px 16px rgba(247, 195, 49, 0.4)'
    : 'inset 0 0 0 1px #333, 0 4px 8px rgba(0, 0, 0, 0.2)', '&:hover': {
      boxShadow: '0 8px 16px rgba(247, 195, 49, 0.4)',
    },
}));

const SelectService: React.FC<SelectServiceStepProps> = ({ services, selectedService, onChangeSelectService, dataBarber }) => {
  const serviceSelected = (service: Service) => {
    onChangeSelectService(service);
  };

  const clearSelection = () => {
    onChangeSelectService(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {selectedService !== null ? (
            <Grid item xs={12} key={selectedService?.id} style={{ height: '100%' }}>
              <Box display="flex" flexDirection="column" height="100%">
                <StyledCard selected={true} style={{ flexGrow: 1 }}>
                  <Box style={{ height: "100%" }}>
                    <CardContent style={{ borderRadius: 5, padding: 11 }}>
                      <Grid container>
                        <Grid item md={9} xs={8} display="flex" alignItems="center">
                          <Box display="flex" justifyContent="center" alignItems="center" height="100%" mr={3}>
                            <Avatar alt="Avatar" sx={{ width: 56, height: 56 }} src={`${process.env.REACT_APP_URL_BASE}${dataBarber.imagen}`} />
                          </Box>
                          <Box display="block">
                            <Typography variant="body1" style={{ color: '#ddd  ' }}>
                              Servicio Seleccionado:
                            </Typography>
                            <Typography variant="h6" style={{ fontWeight: 600, color: '#f7c331' }}>
                              {selectedService?.name_service}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={3} xs={4} display="flex" alignItems="center" justifyContent="center">
                          <Button
                            variant="contained"
                            onClick={clearSelection}
                            sx={{ p: 1 }}
                            className="btn_change"
                            style={{ width: "100%" }}
                          >
                            Cambiar
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Box>
                </StyledCard>
              </Box>
            </Grid>
          ) : (
            services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <StyledCard
                  selected={selectedService?.id === service.id}
                  onClick={() => serviceSelected(service)}
                  style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100px" }}
                >
                  <Grid container style={{ height: "100%", width: "100%" }} alignItems="center">
                    <Grid item xs={3}>
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <Avatar alt="Avatar" sx={{ width: 56, height: 56 }} src={`${process.env.REACT_APP_URL_BASE}${dataBarber.imagen}`} />
                      </Box>
                    </Grid>
                    <Grid item xs={9}>
                      <Box ml={1}>
                        <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '4px', color: '#f7c331' }}>
                          {service.name_service}
                        </Typography>
                        <Typography variant="body1" style={{ fontWeight: 500, color: '#ccc' }}>
                          {`${service.price_service}`}
                        </Typography>
                        <Typography variant="caption" style={{ color: '#ccc' }}>
                          {`Tiempo: ${service.minutes_service} minutos`}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </StyledCard>
              </Grid>
            ))

          )}
        </Grid>
      </Grid>
    </Grid >
  );
};

export default SelectService;
