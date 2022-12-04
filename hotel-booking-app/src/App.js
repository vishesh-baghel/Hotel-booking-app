import "./App.css";
import { useState } from "react";

// const API_KEY = "www.omdbapi.com/?apikey=c4b00c87";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product: { name, price, stocked } }) {
  const nameStyle = {
    color: stocked ? "black" : "red",
  };

  return (
    <tr>
      <td style={nameStyle}>{name}</td>
      <td>{price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {"  "}Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable products={products} />
    </div>
  );
}

const today = new Date();

function formatDate(date) {
  return date.toLocaleDateString();
}

const App = () => {
  const status = "Loading...";
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS} />
      <h1>Is it still {status}</h1>
      <h1>Today's date is: {formatDate(today)}</h1>
      <h2>I want to test some CSS in react</h2>
      <ul style={{ backgroundColor: "blue", color: "pink" }}>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
  );
};

export default App;
