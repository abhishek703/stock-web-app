import * as React from "react";
import { fetchPriceList } from "../service/ApiConfig";
import LineChart from "./LineChart";
import { Button } from "@mui/material";

interface Props {
  stocksList: [];
  price: ""; // Define the type of your function prop
  dateRange: string[];
}

const Main: React.FC<Props> = ({ stocksList, price, dateRange }) => {
  const [priceList, setpriceList] = React.useState<any[]>([]);
  const [graphData, setGraphData] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchPriceList(stocksList)
      .then((res) => {
        setpriceList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stocksList]);

  const showChart = () => {
    setGraphData([]);
    priceList.map((p, i) =>
      setGraphData((prev) => [
        ...prev,
        {
          label: p.name,
          data: p[price],
          borderColor: `rgb(${(i + 1) * 255}, ${(i + 1) * 99}, ${
            (i + 1) * 132
          })`,
          backgroundColor: `rgb(${(i + 1) * 255}, ${(i + 1) * 99}, ${
            (i + 1) * 132
          })`
        }
      ])
    );
  };

  return (
    <>
      <div>
        <Button onClick={showChart}>Show Chart</Button>
      </div>
      <div>
        <LineChart graphData={graphData} dateRange={dateRange} />
      </div>
    </>
  );
};

export default Main;
