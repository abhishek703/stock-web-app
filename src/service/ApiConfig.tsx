import axios from "axios";

export const fetchStocks = () => {
  return axios.get(
    "https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=XNYS&token=cjgukc9r01qh977esd6gcjgukc9r01qh977esd70"
  );
};

export const fetchPriceList = async (stock: any) => {
  // const stocks = [1, 2];
  console.log("APIstocks : ", stock);

  const resultPromises = stock.map(async (endpoint: any) => {
    console.log("endpoint : ", endpoint.displaySymbol);

    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${endpoint.displaySymbol}&resolution=1&from=1679476980&to=1679649780&token=cjk2ll9r01qorp967ot0cjk2ll9r01qorp967otg`
    );
    response.data.name = `${endpoint?.displaySymbol}`;
    return response.data;
  });

  const results = await Promise.all(resultPromises);
  return results;
};
