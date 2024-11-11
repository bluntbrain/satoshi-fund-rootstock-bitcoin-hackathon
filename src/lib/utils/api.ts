import { useState, useEffect } from 'react';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export interface CoinData {
  current_price: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
}

export const useBitcoinPrice = () => {
  const [data, setData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          `${COINGECKO_API}/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_last_updated_at=true`
        );
        const json = await response.json();
        setData({
          current_price: json.bitcoin.usd,
          price_change_percentage_24h: json.bitcoin.usd_24h_change,
          price_change_24h: json.bitcoin.usd_24h_vol,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Bitcoin price');
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
export const useHistoricalBitcoinData = (days: number = 7) => {
  interface HistoricalDataPoint {
    date: string;
    price: number;
  }

  const [data, setData] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `${COINGECKO_API}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
        );
        const json = await response.json();
        
        // format data for charts
        const formattedData = json.prices.map(([timestamp, price]: [number, number]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price: price,
        }));
        
        setData(formattedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch historical data');
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [days]);

  return { data, loading, error };
};