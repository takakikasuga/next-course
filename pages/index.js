function HomePage({ products }) {
  console.log(products);
  return (
    <ul>
      {products.map((product) => {
        return <li key={product.id}>{product.title}</li>;
      })}
    </ul>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      products: [
        {
          id: 'p1',
          title: 'Product 1',
          description: 'This is product 1'
        }
      ]
    }
  };
};

export default HomePage;
