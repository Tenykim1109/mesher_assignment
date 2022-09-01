import axios from 'axios';

export const getDollarPrice = async (
  quantity: number,
  symbol: string,
  symbol2: string
) => {
  let dollarPrice = 0.0;
  let dollarPrice2 = 0.0;
  let anotherCount = 0.0;

  // WBTC 심볼은 Query에 BTC로 입력해야함
  if (symbol === 'WBTC') {
    symbol = 'BTC';
  }

  if (symbol2 === 'WBTC') {
    symbol2 = 'BTC';
  }

  try {
    const response = await axios.get(
      `/v2/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          Accept: 'application/json',
          'X-CMC_PRO_API_KEY': process.env.REACT_APP_API_KEY!,
        },
      }
    );

    const response2 = await axios.get(
      `/v2/cryptocurrency/quotes/latest?symbol=${symbol2}`,
      {
        headers: {
          Accept: 'application/json',
          'X-CMC_PRO_API_KEY': process.env.REACT_APP_API_KEY!,
        },
      }
    );

    // 첫 번째 토큰의 개당 USD 가격
    const symbolUSD = response.data.data[symbol][0].quote.USD.price;

    // 두 번째 토큰의 개당 USD 가격
    const symbol2USD = response2.data.data[symbol2][0].quote.USD.price;

    // 1달러에 첫 번째 토큰, 두 번째 토큰을 몇개 살 수 있는가?
    const symbolPerDollar = 1 / Number(symbolUSD);
    const symbol2PerDollar = 1 / Number(symbol2USD);

    console.log(response2.data.data[symbol2][0].quote.USD.price);

    console.log(`1달러당 ${symbol} ${symbolPerDollar}개`);
    console.log(`1달러당 ${symbol2} ${symbol2PerDollar}개`);

    // symbol1의 주문 개수 * 개당 USD 가격 = 총 USD 가격
    dollarPrice = quantity * symbolUSD;
    dollarPrice2 = dollarPrice;

    // symbol2는 몇개를 사야 하는가?
    anotherCount = dollarPrice2 * symbol2PerDollar;
    console.log(`${symbol2}는 ${anotherCount}개 살 수 있다.`);
  } catch (err) {
    console.log('Error occured');
    console.log(err);
    dollarPrice = -1;
    anotherCount = -1;
  }

  // 소수점 10자리까지 표시 후 return
  return [dollarPrice.toFixed(10), anotherCount.toFixed(10)];
};
