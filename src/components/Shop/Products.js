import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          itemId="1"
          title="Test"
          price={6}
          description="This is a first product - amazing!"
        />
        <ProductItem
          itemId="2"
          title="Test1"
          price={8}
          description="This is second product"
        />
      </ul>
    </section>
  );
};

export default Products;
