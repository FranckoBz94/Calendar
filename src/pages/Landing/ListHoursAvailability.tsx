import { Box, Button, Grid } from "@mui/material"
import { useState } from "react";
// import { useDispatch } from "react-redux";

interface FormCalendarProps {
  availableTimes: string[]
  onSelectTime: (time: string | null) => void
}

const ListHoursAvailability = (props: FormCalendarProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { availableTimes, onSelectTime } = props;
  console.log(availableTimes)

  const handleSelectTime = (time: string) => {
    console.log("time", time)
    const newSelectedTime = time === selectedTime ? null : time;
    setSelectedTime(newSelectedTime);
    onSelectTime(newSelectedTime);
  };

  return (
    <>
      {availableTimes.length > 0 && (
        <Grid container spacing={2} mt={1}>
          {availableTimes.map((time: any, index) => (
            <Grid item xs={6} key={index}>
              <Box display="flex" flexDirection="row" width="100%">
                <Box flex={selectedTime === time.start ? 1 : 2}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ fontWeight: selectedTime === time.start ? 'bold' : 'normal' }}
                    onClick={() => handleSelectTime(time.start)}
                    className={selectedTime === time.start ? "hourSelected" : ""}
                  >
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