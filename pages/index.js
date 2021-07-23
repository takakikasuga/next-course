import Link from 'next/link';

function HomePage({ products }) {
  console.log(products);
  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export const getStaticProps = async (context) => {
  console.log('(Re)Generateing...');
  console.log('context', context);
  // データ取得に失敗した場合
  // return { notFound: true };
  // return { redirect: {destination:"/no-data"}};
  return {
    props: {
      products: [
        {
          id: 'p1',
          title: 'Product 1',
          description: 'This is product 1'
        },
        {
          id: 'p2',
          title: 'Product 2',
          description: 'This is product 2'
        },
        {
          id: 'p3',
          title: 'Product 3',
          description: 'This is product 3'
        }
      ]
    },
    // 本番環境では10秒ごとに再生成される
    revalidate: 10
  };
};

export default HomePage;
