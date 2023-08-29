import React, { useState } from "react";
import SearchBar from "./searchBox/SearchBar";
import Main from "./chart/Main";
import PriceSelector from "./priceSelector/PriceSelector";
import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell
} from "@mui/material";
import DateRangeLabelGenerator from "./dateRangeSelector/DateRangeSelector";

function App() {
  const [stocksList, setStocksList] = useState<any>([]);
  const [price, setPrice] = useState<any>("");
  const [dateRange, setDateRange] = useState<string[]>([]);

  const stock = (data: any) => {
    setStocksList([...data]);
  };

  const priceRange = (data: any) => {
    setPrice(data);
  };

  const datePicker = (data: any) => {
    setDateRange(data);
    console.log("date : ", data);
  };

  return (
    <div className="App">
      {/* <h1>Stock Market Application</h1> */}

      <TableContainer component={Paper} sx={{bgcolor:'#eee'}} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <SearchBar stock={stock} />
              </TableCell>
              <TableCell align="center">
                <PriceSelector priceRange={priceRange} />
              </TableCell>
              <TableCell align="center">
                <DateRangeLabelGenerator datePicker={datePicker} />
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <div className="container">
        <Main stocksList={stocksList} price={price} dateRange={dateRange} />
      </div>
    </div>
  );
}

export default App;