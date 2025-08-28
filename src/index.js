import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// Header
function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

//Menu
//********  1. you can pass "string" in props without using {} curly braces Note: Look at </Pizza> component*********.

function Menu() {
  return (
    <main className="menu">
      <h2 className="">Our Menu</h2>
      <PizzaList />
    </main>
  );
}

//Footer
function Footer() {
  const hour = new Date().getHours();
  const openHour = 11;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We're Happy to Wellcome You between {openHour}:00 to {closeHour}:00{" "}
        </p>
      )}
    </footer>
  );
}

//Pizza
function Pizza(props) {
  const soldoutStyle = props.soldOut
    ? { filter: " grayscale(100%)", color: "gray" }
    : {};

  return (
    <div className="pizza">
      <img style={soldoutStyle} src={props.photo} alt={props.name} />
      <div>
        <h3 style={soldoutStyle}>{props.name}</h3>
        <p style={soldoutStyle}>{props.ingredients}</p>
        <span style={soldoutStyle}>${props.price}</span>
      </div>
    </div>
  );
}

//Pizza List
function PizzaList() {
  const allPizzas = pizzaData;
  const countPizzas = allPizzas.length;
  return (
    <React.Fragment>
      {countPizzas > 0 && (
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <li key={pizza.name}>
              <Pizza
                name={pizza.name}
                photo={pizza.photoName}
                price={pizza.price}
                ingredients={pizza.ingredients}
                soldOut={pizza.soldOut}
              />
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
}

//Order
function Order(props) {
  return (
    <div className="order">
      <p>
        We are open until {props.closeHour}:00. Come and visit us or Order
        Online
      </p>
      <button className="btn order">Order Online</button>
    </div>
  );
}

const root = createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
