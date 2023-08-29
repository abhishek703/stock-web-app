import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  priceRange: (arg1: String) => void; // Define the type of your function prop
}

const PriceSelector: React.FC<Props> = ({ priceRange }) => {
  const [price, setPrice] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
  };

  React.useEffect(() => {
    priceRange(price);
  }, [price]);

  return (
    <Box sx={{ minWidth: 120, ml: 5, mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Price Selector</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={price}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"h"}>High</MenuItem>
          <MenuItem value={"l"}>Low</MenuItem>
          <MenuItem value={"c"}>Close</MenuItem>
          <MenuItem value={"o"}>Open</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PriceSelector;
