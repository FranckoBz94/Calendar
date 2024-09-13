import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
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
  selectedService: any
}

const StyledCard = styled(Card)(({ selected }: { selected: boolean }) => ({
  borderRadius: '8px',
  border: selected ? '2px solid #fff' : '2px solid #333',
  backgroundColor: selected ? '#2e2e2e' : '#1c1c1c',
  color: '#fff',
  cursor: 'pointer',
  height: "100%",
  transition: '0.3s ease-in-out',
  padding: '5px', // Ajusta este valor según necesites
  boxShadow: selected
    ? 'inset 0 0 0 1px #333, 0 8px 16px rgba(247, 195, 49, 0.4)'
    : 'inset 0 0 0 1px #333, 0 4px 8px rgba(0, 0, 0, 0.2)', '&:hover': {
      boxShadow: '0 8px 16px rgba(247, 195, 49, 0.4)',
    },
}));

const SelectService: React.FC<SelectServiceStepProps> = ({ services, selectedService, onChangeSelectService }) => {

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
                    <CardContent style={{ border: "1px solid #fff", borderRadius: 5, padding: 11 }}>
                      <Grid container>
                        <Grid item md={8} xs={7} display="flex" alignItems="center">
                          <Typography variant="h6" style={{ fontWeight: 600, color: '#f7c331' }}>
                            {selectedService?.name_service}
                          </Typography>
                        </Grid>
                        <Grid item md={4} xs={5} display="flex" alignItems="center" justifyContent="center">
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
              <Grid item xs={6} sm={4} md={4} key={service.id}>
                <StyledCard
                  selected={selectedService?.id === service.id}
                  onClick={() => serviceSelected(service)}
                  style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "130px" }}
                >
                  <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '8px', color: '#f7c331' }}>
                    {service.name_service}
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: 500, color: '#ccc' }}>
                    {`${service.price_service}`}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#ccc' }}>
                    {`Tiempo: ${service.minutes_service} minutos`}
                  </Typography>
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
