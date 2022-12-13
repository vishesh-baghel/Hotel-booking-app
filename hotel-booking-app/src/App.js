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

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>Play</Button>
      <Button onClick={onUploadImage}>Upload</Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function Toolbar2() {
  return <AlertButton message="uploading">Upload is on the way!!</AlertButton>;
}

function AlertButton({ message, children }) {
  function handleClick() {
    alert(message);
  }
  return <button onClick={handleClick}>{children}</button>;
}

function EventPropogation() {
  return (
    <div onClick={() => alert("parent clicked!!")}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          alert("child clicked!!");
        }}
      >
        Click me
      </button>
      <button onClick={() => alert("second child clicked!!")}>
        Click me too
      </button>
    </div>
  );
}

function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("submitting!!");
      }}
    >
      <input />
      <button type="submit">Submit</button>
    </form>
  );
}

function CheckLocalVariable() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <>
      <button onClick={handleClick}>click me to increase the counter.</button>
      <p> The count is: {count}</p>
    </>
  );
}

const sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description:
      "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description:
      "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];

function SulptureGallery() {
  const [index, setIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);

  function changeIndex() {
    setIndex(index + 1);
  }

  const handleClick = () => {
    setShowImage(!showImage);
  };

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrev() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNext() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  let sculpture = sculptureList[index];
  return (
    <div className="sculpture-gallery">
      <button onClick={handlePrev} disabled={!hasPrev}>
        Previous
      </button>
      <button onClick={handleNext} disabled={!hasNext}>
        Next
      </button>
      <h1>Sculputure Name:{sculpture.name}</h1>
      <h2>Artist:{sculpture.artist}</h2>
      <button onClick={handleClick}>
        {showImage ? "Hide Image" : "Show Image"}
      </button>
      {showImage && <img src={sculpture.url} alt={sculpture.alt} />}
    </div>
  );
}

function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("");
  if (isSent) {
    return <p>Thank you for your feedback!!</p>;
  } else {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSent(true);
        }}
      >
        <textarea
          placeholder="Your feedback"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}

function MessageSender() {
  const [message, setMessage] = useState("Hello!");
  const [to, setTo] = useState("vishesh");

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You sent ${message} to ${to}`);
    }, 3000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{" "}
        <select value={to} onChange={(e) => setTo(e.targer.value)}>
          <option value="vishesh">Vishesh</option>
          <option value="sarah">Sarah</option>
        </select>
      </label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}

function TrafficLight() {
  const [walk, setWalk] = useState(false);

  function handleClick() {
    setWalk(!walk);
    alert(walk ? "Stop is next" : "Walk is next");
  }
  return (
    <>
      <button onClick={handleClick}>Change to: {walk ? "Walk" : "Stop"}</button>
      <h1 style={{ color: walk ? "darkgreen" : "darkred" }}>
        {walk ? "Walk" : "Stop"}
      </h1>
    </>
  );
}

function CheckQueueFeature() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // setCount(count + 1);
    setCount((n) => n + 1);
    setCount(23);
  }

  return <button onClick={handleClick}>Increment count: {count}</button>;
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
      <Toolbar
        onPlayMovie={() => alert("Played movie")}
        onUploadImage={() => alert("Uploaded movie")}
      />
      <Toolbar2 />
      <EventPropogation />
      <Signup />
      <CheckLocalVariable />
      <SulptureGallery />
      <FeedbackForm />
      <MessageSender />
      <TrafficLight />
      <CheckQueueFeature />
    </div>
  );
};

export default App;
