import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

let set_pizza = null;
let openItem = {
  pizzaName: "Focaccia",
  pizzaDesc: "Bread with italian olive oil and rosemary",
  price: 6,
  pizzaImage: "pizzas/focaccia.jpg",
  isSoldOut: false,
};

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

//sideBanner

function SideBanner() {
  return (
    <div>
      <div
        style={{
          height: "800px",
          backgroundImage: `url(${process.env.PUBLIC_URL + '/pizzas/banner.jpg'})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
        className="side-banner"
      ></div>
    </div>
  );
}

//header title

function HeaderTitle() {
  return (
    <div>
      <div>
        <h1 className="pizza-title">Menu</h1>
      </div>
      <div className="pizza-sub-title">PIZZA</div>
    </div>
  );
}

//Order Button

function OrderNowBtn() {
  return (
    <div>
      <div className="button-container">
        <button className="order-now-btn">Order Online</button>
      </div>
    </div>
  );
}

//Separator
function Separator() {
  return (
    <div className="separator">
      <div className="line">
        <div className="circle"></div>
      </div>
    </div>
  );
}

// Pizza Item
function PizzaItem({ pizzaName, pizzaDesc, price, isSoldOut, pizzaImage }) {
  if (isSoldOut) {
    return (
      <div>
        <div className="list-item">
          <div className="left-info">
            <h2 className="pizza-name-soldout">{pizzaName}</h2>
            <p className="pizza-desc-soldout">{pizzaDesc}</p>
          </div>
          <div className="right-info">
            <span className="pizza-price-soldout">${price}</span>
            <span className="tag-soldout">Sold Out</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          onClick={() =>
            openModal(pizzaName, pizzaDesc, price, isSoldOut, pizzaImage)
          }
          className="list-item"
        >
          <div className="left-info">
            <h2 className="pizza-name">{pizzaName}</h2>
            <p className="pizza-desc">{pizzaDesc}</p>
          </div>
          <div className="right-info">
            <span className="pizza-price">${price}</span>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div>
  //     <div className="list-item">
  //       <div className="left-info">
  //         <h2 className="pizza-name">{pizzaName}</h2>
  //         <p className="pizza-desc">
  //           {pizzaDesc}
  //         </p>
  //       </div>
  //       <div className="right-info">
  //         <span className="pizza-price">${price}</span>
  //       </div>
  //     </div>
  //   </div>
  // );
}

//Pizza Lists

function PizzaList() {
  return (
    <ul>
      {pizzaData.map((pizza) => (
        <li key={pizza.name} className="list-of-pizza">
          <PizzaItem
            pizzaName={pizza.name}
            pizzaDesc={pizza.ingredients}
            price={pizza.price}
            isSoldOut={pizza.soldOut}
            pizzaImage={pizza.photoName}
          />
        </li>
      ))}
    </ul>
  );
}

//Modal of Pizza
function Modal(img, title, price, ingredient) {
  const [pizza, setPizza] = useState({});

  set_pizza = setPizza;



  return (
    <div className="modal">
      <div className="popup-modal"></div>

      <div className="modal-container">
        <span className="close-modal">X</span>
        <div className="modal-banner">
          <img src={pizza.pizzaImage} alt={pizza.pizzaName} />
          <h2 className="modal-pizza-name">{pizza.pizzaName}</h2>
        </div>
        <div className="modal-content">
          <p className="modal-ing">
            {" "}
            <strong>Ingredients:</strong> {pizza.pizzaDesc}
          </p>

          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Price</th>
              </tr>
            </thead>
            
            <tbody>
            
            <tr>
              <td>X</td>
              <td>$16</td>
            </tr>

            <tr>
              <td>XL</td>
              <td>$24</td>
            </tr>
            
            </tbody>
          </table>

          <OrderNowBtn />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Modal />
      <div className="container">
        <div className="column-1">
          <SideBanner />
        </div>
        <div className="column-2">
          <HeaderTitle />
          <PizzaList />
          <OrderNowBtn />
        </div>

        <Separator />
      </div>
    </div>
  );
}

const root = createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//helper function

function openModal(pizzaName, pizzaDesc, price, isSoldOut, pizzaImage) {
  document.querySelector(".modal").classList.add("open"); //limited no more execution logic
  openItem = {
    pizzaName,
    pizzaDesc,
    price,
    isSoldOut,
    pizzaImage,
  };

  set_pizza(openItem);

  const getModal = document.querySelector(".modal");
  getModal.addEventListener("click", closeModal);
}

function closeModal(e) {
  document.querySelector(".modal").classList.remove("open");
}
