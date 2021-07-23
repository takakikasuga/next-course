import React, { Fragment } from 'react';

const ProductDetailPage = (props) => {
  console.log('props', props);
  const { loadedProduct } = props;
  console.log('loadedProduct', loadedProduct);
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const productId = params.pid;
  console.log('context', context);
  console.log('呼び出しを喰らいました。');

  const dummyProducts = [
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
  ];

  const product = dummyProducts.find((dummyProduct) => {
    return dummyProduct.id === productId;
  });

  // fallback: true;の場合にnotFoundページを返却する
  if (!product) return { notFound: true };

  return {
    props: {
      loadedProduct: product
    }
  };
};

export const getStaticPaths = async () => {
  // fallback: true;
  // 全てのページを生成せずにリクエストが到達直前に生成されるようにする
  // fallback: "blocking";
  // データを取得するまで待ってくれる
  return {
    paths: [{ params: { pid: 'p1' } }],
    fallback: true
  };
};

export default ProductDetailPage;
