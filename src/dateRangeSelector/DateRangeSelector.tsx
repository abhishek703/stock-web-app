import React, { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface Props {
  datePicker: (arg1: string[]) => void; // Define the type of your function prop
}

const DateRangeLabelGenerator: React.FC<Props> = ({ datePicker }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [labels, setLabels] = useState<string[]>([]);

  const handleGenerateLabels = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDateObj <= endDateObj) {
      const labelsArray: string[] = [];
      const currentDate = new Date(startDateObj);

      while (currentDate <= endDateObj) {
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        labelsArray.push(`${year}-${month}`);

        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      setLabels(labelsArray);
    } else {
      setLabels([]);
    }
  };

  useEffect(() => {
    datePicker(labels);
  }, [labels]);

  return (
    <Box>
        <Box>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          sx={{ ml: 2 }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          sx={{ ml: 1 }}
        />
        <Button
          variant="outlined"
          sx={{ mt: 3, ml: 1 }}
          onClick={handleGenerateLabels}
        >
          select Dates
        </Button>
      </Box>
    </Box>
  );
};

export default DateRangeLabelGenerator;
