import { Box, Button, Grid } from "@mui/material"
import { CSSProperties } from "react";
import ContentCutIcon from '@mui/icons-material/ContentCut';

interface FormCalendarProps {
  availableTimes: string[]
  selectedTime: string | null
  onSelectTime: (time: string | null) => void
}



const ListHoursAvailability = (props: FormCalendarProps) => {
  const { availableTimes, onSelectTime, selectedTime } = props;
  console.log(availableTimes)

  const handleSelectTime = (time: string) => {
    const newSelectedTime = time === selectedTime ? null : time;
    onSelectTime(newSelectedTime);
  };



  return (
    <>
      {availableTimes.length > 0 && (
        <Grid container spacing={2} mt={1}>
          {availableTimes.map((time: any, index) => (
            <Grid item xs={4} md={3} key={index} style={{ '--i': index } as CSSProperties} className="grid_item">
              <Box display="flex" flexDirection="row" width="100%">
                <Box flex={selectedTime === time.start ? 1 : 2} display="flex" alignItems="center">
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ fontWeight: selectedTime === time.start ? 'bold' : 'normal' }}
                    onClick={() => handleSelectTime(time.start)}
                    className={`btn_hours ${selectedTime === time.start ? "hourSelected" : ""}`}
                  >
                    {selectedTime === time.start && (
                      <ContentCutIcon style={{ position: "absolute", left: "5px", fontSize: "15px" }} />
                    )}
                    {time.start}
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

export default ListHoursAvailability