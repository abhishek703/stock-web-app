import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button, Grid, IconButton, Paper } from "@mui/material";
import { fetchStocks } from "../service/ApiConfig";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  stock: (arg1: []) => void; // Define the type of your function prop
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  height: 30,
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

const SearchBox: React.FC<Props> = ({ stock }) => {
  const [stocks, setStocks] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [selectdData, setSelectdData] = useState<[]>([]);
  const [data, setData] = useState<{}>({});

  useEffect(() => {
    fetchStocks()
      .then((res) => {
        setStocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchFilter = (searchValue: string) => {
    const filtered = stocks.filter((item: any) =>
      item?.symbol.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    filtered
      .filter((item: any) => item.displaySymbol == searchValue)
      .forEach((element: any) => {
        setData(element);
      });
    setSelectdData(filtered);
  };

  const handleSubmit = () => {
    let array = [];
    array.push(data);
    if (filteredData.length < 3) {
      setFilteredData([...filteredData, ...array]);
    }
  };

  const removeStock = (stock: any) => {
    setFilteredData((prevTodos: any) =>
      prevTodos.filter((f: any) => stock.displaySymbol != f.displaySymbol)
    );
  };

  useEffect(() => {
    stock(filteredData);
  }, [filteredData]);

  return (
    <Box sx={{ display: "flex", backgroundColor: "" }}>
      <Grid columns={{ xs: 1, sm: 1, md: 1 }} sx={{ backgroundColor: "" }}>
        <Grid columns={{ xs: 1, sm: 1, md: 1 }}>
          <Stack spacing={2} sx={{ backgroundColor: "", width: 300, ml: 10 }}>
            <Autocomplete
              id="free-solo-demo"
              onChange={(event, newValue) => searchFilter(newValue || "")}
              freeSolo
              options={selectdData.map((option: any) => option.symbol)}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="freeSolo"
                  onChange={(e) => searchFilter(e.target.value)}
                />
              )}
            />
            {`${
              filteredData.length >= 3 ? "You can select maximum 3 stocks" : ""
            }`}
            <Button
              disabled={filteredData.length >= 3}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              select stock
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid sx={{ display: "flex" }}>
        {filteredData.map((d: any, i: Number) => {
          return (
            <Grid
              item
              xs={2}
              sx={{ display: "flex", ml: 0.5, mt: 1 }}
              sm={4}
              md={4}
              key={`test-${i}`}
            >
              <Item>
                {d.displaySymbol}
                <IconButton onClick={() => removeStock(d)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SearchBox;
