import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useSWR(
    'https://nextjs-course-3645a-default-rtdb.firebaseio.com/sales.json'
  );

  useEffect(() => {
    console.log('data', data);
    if (data) {
      const tranformSales = [];
      for (const key in data) {
        console.log('key', key);
        tranformSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume
        });
      }
      setSales(tranformSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://nextjs-course-3645a-default-rtdb.firebaseio.com/sales.json')
  //     .then((response) => {
  //       console.log('response', response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('data.sales', data.sales);
  //       const tranformSales = [];

  //       for (const key in data) {
  //         console.log('key', key);
  //         tranformSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume
  //         });
  //       }
  //       console.log('tranformSales', tranformSales);
  //       setSales(tranformSales);
  //       setIsLoading(false);
  //     });
  // }, []);
  if (error) return <p>Fialed to load...</p>;

  if (!data && !sales) return <p>Loading...</p>;

  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        );
      })}
    </ul>
  );
};

export const getStaticProps = async (context) => {
  const response = await fetch(
    'https://nextjs-course-3645a-default-rtdb.firebaseio.com/sales.json'
  );

  const data = await response.json();

  const tranformSales = [];

  for (const key in data) {
    console.log('key', key);
    tranformSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume
    });
  }
  console.log('tranformSales', tranformSales);
  return {
    props: {
      sales: tranformSales
    },
    revalidate: 10
  };
};

export default LastSalesPage;
