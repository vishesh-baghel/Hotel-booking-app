import "./App.css";
import { initialTravelPlan } from "./places";
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

  //eslint-disable-next-line
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

function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  function handleMouseMove(e) {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  }

  return (
    <div
      onPointerMove={handleMouseMove}
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "red",
          borderRadius: "50%",
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          height: 20,
          width: 20,
        }}
      ></div>
    </div>
  );
}

function EmailForm() {
  const [person, setPerson] = useState({
    firstName: "vishesh",
    lastName: "baghel",
    email: "visheshbaghel99@gmail.com",
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
    },
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value,
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(
      `Thank you for subscribing ${person.firstName} ${person.lastName} and you have given the permission ${person.subscribe} and your city is changed to ${person.address.city}`
    );
  }

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });
  }

  function handleCityInAddressChange(e) {
    setPerson({
      ...person,
      address: {
        ...person.address,
        city: e.target.value,
      },
    });
  }
  return (
    <div
      style={{
        border: "1px solid black",
      }}
    >
      <h1>Subscribe to our newsletter</h1>
      <form onSubmit={handleSubmit}>
        <lable>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={person.firstName}
            onChange={handleFirstNameChange}
          />
        </lable>
        <br />
        <lable>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={person.lastName}
            onChange={handleLastNameChange}
          />
        </lable>
        <br />
        <lable>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={person.email}
            onChange={handleEmailChange}
          />
        </lable>
        <br />
        <lable>
          Change address:{" "}
          <input type="text" onChange={handleCityInAddressChange} />
        </lable>
        <br />
        <lable>
          <input name="subscribe" type="text" onChange={handleChange} />
        </lable>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

let nextId = 0;
function ArtistList() {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState([]);

  function handleSubmit() {
    setName("");
    setArtist([...artist, { id: nextId++, name: name }]);
  }

  function handleAddition(e) {
    setName(e.target.value);
  }

  return (
    <div>
      <h1>Artist List</h1>
      <form>
        <input type="text" value={name} onChange={handleAddition} />
        <button type="submit" onChange={handleSubmit}>
          Add artist
        </button>
      </form>
      <ul>
        {artist.map((artist) => (
          <li key={nextId++}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
}

let initialArtists = [
  { id: 0, name: "Marta Colvin Andrade" },
  { id: 1, name: "Lamidi Olonade Fakeye" },
  { id: 2, name: "Louise Nevelson" },
];

function DeleteFromList() {
  const [artists, setArtists] = useState(initialArtists);

  return (
    <div>
      <h2>Delete from list:</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}{" "}
            <button
              onChange={() =>
                setArtists(artists.filter((a) => a.id !== artist.id))
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

let initialShapes = [
  { id: 0, type: "circle", x: 50, y: 100 },
  { id: 1, type: "square", x: 150, y: 100 },
  { id: 2, type: "circle", x: 250, y: 100 },
];

function ShapeEditor() {
  const [shapes, setShapes] = useState(initialShapes);

  function handleClick() {
    const nextShapes = shapes.map((shape) => {
      if (shape.type === "square") {
        return shape;
      } else {
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    setShapes(nextShapes);
  }

  return (
    <div>
      <h2>Shape editor</h2>
      <button onClick={handleClick}>Move circles down</button>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          style={{
            position: "absolute",
            background: "red",
            left: shape.x,
            top: shape.y,
            width: 20,
            height: 20,
            border: shape.type === "circle" ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}

function VisualStates({ status }) {
  if (status === "success") {
    return <h4>That's right !!💥💥</h4>;
  }

  return (
    <form>
      <textarea
        placeholder="type something bitch!!"
        disabled={status === "submitting"}
      />
      <br />
      <button disabled={status === "submitting" || status === "empty"}>
        Submit
      </button>
      {status === "error" && (
        <p className="error">
          God has not forsaken you. Seems like something's broke!!🤯🤯
        </p>
      )}
    </form>
  );
}

let statuses = ["empty", "typing", "submitting", "success", "error"];

function StatesOfForm() {
  return (
    <>
      <h1>Different visual states of a form</h1>
      {statuses.map((status) => (
        <section key={status}>
          <h3>Form ({status}):</h3>
          <VisualStates status={status} />
        </section>
      ))}
    </>
  );
}

function Picture() {
  const [isActive, setIsActive] = useState(false);

  let backgroundClassName = "background";
  let pictureClassName = "picture";

  if (isActive) {
    pictureClassName += "picture--active";
  } else {
    backgroundClassName += "background--active";
  }

  return (
    <div
      className={backgroundClassName}
      style={{ border: "5px solid black" }}
      onClick={() => setIsActive(false)}
    >
      <img
        onClick={(e) => {
          e.stopPropagation();
          setIsActive(true);
        }}
        className={pictureClassName}
        src="https://i.imgur.com/5qwVYb1.jpeg"
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
      />
    </div>
  );
}

//eslint-disable-next-line
function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("john");
  const [lastName, setLastName] = useState("doe");

  return (
    <div style={{ marginTop: "20px", border: "5px solid black" }}>
      <form
        onSubmit={(e) => {
          setIsEditing(true);
        }}
      >
        <label>
          FirstName:{" "}
          {isEditing ? (
            <input
              onChange={(e) => {
                e.preventDefault();
                setFirstName(e.target.value);
              }}
            />
          ) : (
            { firstName }
          )}
        </label>
        <br />
        <label>
          LastName:{" "}
          {isEditing ? (
            <input
              onChange={(e) => {
                e.preventDefault();
                setLastName(e.target.value);
              }}
            />
          ) : (
            { lastName }
          )}
        </label>
      </form>
    </div>
  );
}

const initialItems = [
  { title: "pretzels", id: 0 },
  { title: "crispy seaweed", id: 1 },
  { title: "granola bar", id: 2 },
];

function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find((item) => item.id === selectedId);

  function handleItemChange(id, e) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: e.target.value,
          };
        } else {
          return item;
        }
      })
    );
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={(e) => {
                handleItemChange(item.id, e);
              }}
            />{" "}
            <button
              onClick={() => {
                setSelectedId(item.id);
              }}
            >
              Choose
            </button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}

function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const root = plan[0];
  const planetId = root.childIds;

  return (
    <>
      <h2>Travel plans</h2>
      <ol>
        {planetId.map((id) => (
          <PlaceTree key={id} id={id} placesById={plan} />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, placesById }) {
  const place = placesById[id];
  const childIds = place.childIds;

  return (
    <li>
      {place.title}
      {childIds.length > 0 && (
        <ol>
          {childIds.map((childIds) => (
            <PlaceTree key={childIds} id={childIds} placesById={placesById} />
          ))}
        </ol>
      )}
    </li>
  );
}

const initialItemsList = [
  { id: 0, title: "Warm socks", packed: true },
  { id: 1, title: "Travel journal", packed: false },
  { id: 2, title: "Watercolors", packed: false },
];

function TravelPlanItemList() {
  const [items, setItems] = useState(initialItemsList);

  let nextId = 3;
  let packed = items.filter((item) => item.packed).length;
  let total = items.length;

  function handleAddItem(title) {
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false,
      },
    ]);
  }

  function handleChangeItem(nextItem) {
    setItems(
      items.map((item) => {
        if (item.id === nextItem.id) {
          return nextItem;
        } else {
          return item;
        }
      })
    );
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div style={{ border: "3px solid black", marginTop: "20px" }}>
      <h3>List of Items for vacation</h3>
      <Additem onAdditem={handleAddItem} />
      <PackedList
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
      />
      <br />
      {packed} of {total} items packed
    </div>
  );
}

function Additem({ onAddItem }) {
  const [title, setTitle] = useState("");

  return (
    <form>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />{" "}
      <button
        onClick={() => {
          onAddItem(title);
          setTitle("");
        }}
      >
        Add
      </button>
    </form>
  );
}

function PackedList({ items, onChangeItem, onDeleteItem }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={(e) => {
                onChangeItem({
                  ...item,
                  packed: e.target.checked,
                });
              }}
            />{" "}
            {item.title}
          </label>{" "}
          <button onClick={() => onDeleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

const initialLetters = [
  {
    id: 0,
    subject: "Ready for adventure?",
    isStarred: true,
  },
  {
    id: 1,
    subject: "Time to check in!",
    isStarred: false,
  },
  {
    id: 2,
    subject: "Festival Begins in Just SEVEN Days!",
    isStarred: false,
  },
];

function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedId, setHighlightedId] = useState(null);

  function handleHover(letterId) {
    setHighlightedId(letterId);
  }

  function handleStar(starredId) {
    setLetters(
      letters.map((letter) => {
        if (letter.id === starredId) {
          return {
            ...letter,
            isStarred: !letter.isStarred,
          };
        } else {
          return letter;
        }
      })
    );
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={letter.id === highlightedId}
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}

function Letter({ letter, isHighlighted, onHover, onToggleStar }) {
  return (
    <li
      className={isHighlighted ? "highlighted" : ""}
      onFocus={() => {
        onHover(letter.id);
      }}
      onPointerMove={() => {
        onHover(letter.id);
      }}
    >
      <button
        onClick={() => {
          onToggleStar(letter.id);
        }}
      >
        {letter.isStarred ? "Unstar" : "Star"}
      </button>
      {letter.subject}
    </li>
  );
}

function Accordian() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <Panel
        title="Tab 1"
        isActive={activeIndex === 0}
        onShow={() => {
          setActiveIndex(0);
        }}
      >
        <p>Tab 1 content</p>
      </Panel>
      <Panel
        title="Tab 2"
        isActive={activeIndex === 1}
        onShow={() => {
          setActiveIndex(1);
        }}
      >
        <p>Tab 2 content</p>
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>Show the tab</button>
      )}
    </div>
  );
}

const foods = [
  {
    id: 0,
    name: "Sushi",
    description:
      "Sushi is a traditional Japanese dish of prepared vinegared rice",
  },
  {
    id: 1,
    name: "Dal",
    description:
      "The most common way of preparing dal is in the form of a soup to which onions, tomatoes and various spices may be added",
  },
  {
    id: 2,
    name: "Pierogi",
    description:
      "Pierogi are filled dumplings made by wrapping unleavened dough around a savoury or sweet filling and cooking in boiling water",
  },
  {
    id: 3,
    name: "Shish kebab",
    description:
      "Shish kebab is a popular meal of skewered and grilled cubes of meat.",
  },
  {
    id: 4,
    name: "Dim sum",
    description:
      "Dim sum is a large range of small dishes that Cantonese people traditionally enjoy in restaurants for breakfast and lunch",
  },
];

function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter((item) =>
    item.name.split(" ").some((word) => word.toLowerCase().startsWith(query))
  );
}

function SearchBarForList({ query, onChange }) {
  return (
    <form>
      Search: <input type="text" value={query} onChange={onChange} />
    </form>
  );
}

function SearchResults({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

function FilterableList() {
  const [query, setQuery] = useState("");
  const result = filterItems(foods, query);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div style={{ border: "2px solid grey", marginTop: "20px" }}>
      <SearchBarForList query={query} onChange={handleChange} />
      <hr />
      <SearchResults items={result} />
    </div>
  );
}

function CounterBox() {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const [showB, setShowB] = useState(true);
  const [isFancy, setIsFancy] = useState(false);

  let className = "counter";

  function handleFancyStyle(e) {
    setIsFancy(e.target.checked);

    if (isFancy) {
      className += " fancy";
    }
  }

  return (
    <div
      className={className}
      style={{ border: "1px solid grey", margin: "2px" }}
    >
      <p style={{ border: "1px solid grey", margin: "20px 20px" }}>
        Counter: {countA}{" "}
        <button
          style={{ margin: "10px 10px" }}
          onClick={() => {
            setCountA(countA + 1);
          }}
        >
          Add one
        </button>
        <hr />
        {showB && (
          <p style={{ border: "1px solid grey", margin: "20px 20px" }}>
            {" "}
            Counter: {countB}
            <button
              style={{ margin: "10px 10px" }}
              onClick={() => {
                setCountB(countB + 2);
              }}
            >
              Add two
            </button>
          </p>
        )}
      </p>
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={(e) => {
            setShowB(e.target.checked);
          }}
        />{" "}
        Show second box
      </label>
      <br />
      <label>
        <input type="checkbox" checked={isFancy} onChange={handleFancyStyle} />{" "}
        use Fancy style: {isFancy ? "Yes" : "No"}
      </label>
    </div>
  );
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
      <MovingDot />
      <EmailForm />
      <ArtistList />
      <DeleteFromList />
      <ShapeEditor />
      <StatesOfForm />
      <Picture />
      {/* <EditProfile /> */}
      <Menu />
      <TravelPlan />
      <TravelPlanItemList />
      <MailClient />
      <Accordian />
      <FilterableList />

      <CounterBox />
    </div>
  );
};

export default App;
