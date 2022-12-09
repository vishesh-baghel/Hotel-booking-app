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

function getImageUrl(person, size = "s") {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}

function Avatar({ person, size }) {
  return (
    <img
      src={getImageUrl(person)}
      className="Avatar"
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  return <div className="Card">{children}</div>;
}

function Profile({ person, imageSize = 50 }) {
  const imageSrc = getImageUrl(person, "l");
  return (
    <section className="Profile">
      <h2>{person.name}</h2>
      <img
        src={imageSrc}
        alt={person.name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li>Profession: {person.profession}</li>
        <li>Discovery: {person.discovery}</li>
        <li>Awards: {person.awards.join(", ")}</li>
      </ul>
    </section>
  );
}

function Gallary() {
  return (
    <div>
      <h2>Notable scientists</h2>
      <Profile
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
          profession: "Physicist",
          discovery: "Quantum entanglement",
          awards: ["Nobel Prize", "Fields Medal"],
        }}
      />
      <Profile
        person={{
          name: "akilu lemma",
          imageId: "OKS67lh",
          profession: "Physicist",
          discovery: "Quantum entanglement",
          awards: ["Nobel Prize", "Fields Medal"],
        }}
      />
    </div>
  );
}

function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="Item Item-packed">{name}😁😁</li>;
  } else {
    return (
      <del>
        <li className="Item">{name}</li>
      </del>
    );
  }
}

function PackingList() {
  return (
    <section className="PackingList">
      <ul>
        <Item name="Toothbrush" isPacked={true} />
        <Item name="Toothpaste" isPacked={true} />
        <Item name="Towel" isPacked={false} />
      </ul>
    </section>
  );
}

const people = [
  {
    id: 0, // Used in JSX as a key
    name: "Creola Katherine Johnson",
    profession: "mathematician",
    accomplishment: "spaceflight calculations",
    imageId: "MK3eW3A",
  },
  {
    id: 1, // Used in JSX as a key
    name: "Mario José Molina-Pasquel Henríquez",
    profession: "chemist",
    accomplishment: "discovery of Arctic ozone hole",
    imageId: "mynHUSa",
  },
  {
    id: 2, // Used in JSX as a key
    name: "Mohammad Abdus Salam",
    profession: "physicist",
    accomplishment: "electromagnetism theory",
    imageId: "bE7W1ji",
  },
  {
    id: 3, // Used in JSX as a key
    name: "Percy Lavon Julian",
    profession: "chemist",
    accomplishment:
      "pioneering cortisone drugs, steroids and birth control pills",
    imageId: "IOjWm71",
  },
  {
    id: 4, // Used in JSX as a key
    name: "Subrahmanyan Chandrasekhar",
    profession: "astrophysicist",
    accomplishment: "white dwarf star mass calculations",
    imageId: "lrWQx8l",
  },
];

function List() {
  const listItems = people.map((person) => {
    return (
      <ul>
        <li key={person.id}>
          <h2>{person.name}</h2>
          <p>{person.profession}</p>
          <p>{person.accomplishment}</p>
          <img src={getImageUrl(person)} alt={person.name} />
        </li>
      </ul>
    );
  });
  return <div>{listItems}</div>;
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
      <Card>
        <Avatar
          person={{ name: "Katsuko Saruhashi", imageId: "YfeOqp2" }}
          size={100}
        />
        <Avatar
          person={{ name: "akilu lemma", imageId: "OKS67lh" }}
          size={50}
        />
      </Card>
      <Gallary />
      <PackingList />
      <List />
    </div>
  );
};

export default App;
