import { Box, Button, Grid } from "@mui/material"
import { CSSProperties } from "react";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { motion } from 'framer-motion';

interface FormCalendarProps {
  availableTimes: string[]
  selectedTime: string | null
  onSelectTime: (time: string | null) => void
}

const ListHoursAvailability = (props: FormCalendarProps) => {
  const { availableTimes, onSelectTime, selectedTime } = props;

  const handleSelectTime = (time: string) => {
    const newSelectedTime = time === selectedTime ? null : time;
    onSelectTime(newSelectedTime);
  };

  return (
    <>
      {availableTimes.length > 0 && (
        <Grid container spacing={2} >
          {availableTimes.map((time: any, index) => (
            <Grid item xs={4} md={3} key={index} style={{ '--i': index } as CSSProperties} className={`grid_item ${selectedTime !== null ? 'no-animation' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01 }}
              >
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
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

export default ListHoursAvailability