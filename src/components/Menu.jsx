import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCart } from "./CartContext";

// Menu data for all categories and dishes
const menuData = [
  {
    category: "Filipino-Cuisine",
    dishes: [
      {
        name: "Adobo Chicken",
        image: "https://source.unsplash.com/400x300/?filipino-food",
        description:
          "Slow-cooked soy-marinated chicken with garlic and vinegar.",
        price: "$12.99",
      },
      {
        name: "Adobo Fish",
        image: "https://source.unsplash.com/400x300/?filipino-food",
        description: "Slow-cooked soy-marinated fish with garlic and vinegar.",
        price: "$12.99",
      },
      {
        name: "Sinigang na Baboy",
        image: "https://source.unsplash.com/400x300/?sinigang",
        description: "Tamarind pork soup with vegetables and rich flavor.",
        price: "$10.99",
      },
      {
        name: "Pancit Bihon",
        image: "https://source.unsplash.com/400x300/?pancit",
        description: "Stir-fried rice noodles with vegetables and pork.",
        price: "$9.99",
      },
      {
        name: "Lechon Kawali",
        image: "https://source.unsplash.com/400x300/?lechon",
        description: "Crispy fried pork belly served with liver sauce.",
        price: "$13.99",
      },
    ],
  },
  {
    category: "PuertoRican-Cuisine",
    dishes: [
      {
        name: "Mofongo",
        image: "https://source.unsplash.com/400x300/?mofongo",
        description:
          "Mashed plantains with garlic, pork cracklings, and broth.",
        price: "$11.99",
      },
      {
        name: "Arroz con Gandules",
        image: "https://source.unsplash.com/400x300/?rice",
        description: "Puerto Rican rice with pigeon peas and pork.",
        price: "$10.50",
      },
      {
        name: "Tostones",
        image: "https://source.unsplash.com/400x300/?tostones",
        description: "Twice-fried plantain slices, crispy and salty.",
        price: "$6.99",
      },
      {
        name: "Pastelón",
        image: "https://source.unsplash.com/400x300/?plantain-lasagna",
        description: "Sweet plantain lasagna with beef and cheese.",
        price: "$12.50",
      },
    ],
  },
  {
    category: "Fusion-Cuisine A la Carte",
    dishes: [
      {
        name: "Adobo Empanadas",
        image: "https://source.unsplash.com/400x300/?empanadas",
        description:
          "Fusion empanadas filled with Filipino-style adobo chicken.",
        price: "$8.99",
      },
      {
        name: "Lechon Tacos",
        image: "https://source.unsplash.com/400x300/?tacos",
        description: "Puerto Rican-style pork belly tacos with Filipino slaw.",
        price: "$10.99",
      },
      {
        name: "Ube Flan",
        image: "https://source.unsplash.com/400x300/?ube",
        description: "Velvety purple yam custard topped with caramel sauce.",
        price: "$7.99",
      },
      {
        name: "Spam Musubi w/ Mofongo",
        image: "https://source.unsplash.com/400x300/?spam",
        description: "A tropical twist on the Hawaiian favorite.",
        price: "$9.50",
      },
    ],
  },
  {
    category: "Pick Your Own",
    dishes: [
      {
        name: "Build Your Bowl",
        image: "https://source.unsplash.com/400x300/?rice-bowl",
        description: "Choose your base, protein, and toppings — your way.",
        price: "$11.99",
      },
      {
        name: "Island Skewers",
        image: "https://source.unsplash.com/400x300/?bbq-skewers",
        description: "Skewers of pork, shrimp, or tofu with island spices.",
        price: "$9.99",
      },
      {
        name: "Tropical Spring Rolls",
        image: "https://source.unsplash.com/400x300/?spring-rolls",
        description: "Fresh veggies and meats wrapped in rice paper.",
        price: "$8.49",
      },
      {
        name: "Fusion Plate Sampler",
        image: "https://source.unsplash.com/400x300/?fusion-food",
        description: "Pick any 3 small bites across cuisines.",
        price: "$14.99",
      },
    ],
  },
];

export default function Menu() {
  const [quantities, setQuantities] = useState({});

  // Get addToCart from cart context
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Make sure quantity input is at least 1
  const handleQuantityChange = (dishName, value) => {
    const val = Math.max(1, Number(value));
    if (!isNaN(val)) {
      setQuantities((prev) => ({ ...prev, [dishName]: val }));
    }
  };

  // Add selected dish and quantity to cart
  const handleAddToCart = (dish, quantity) => {
    addToCart(dish, Number(quantity));
  };

  return (
    <MenuSection id="menu">
      <h1 className="title" data-aos="fade-down">
        Our Menu
      </h1>

      {menuData.map((category, idx) => (
        <div key={idx}>
          <h2 className="category" data-aos="fade-right">
            {category.category}
          </h2>
          <div className="cards">
            {category.dishes.map((dish, i) => {
              const quantity = quantities[dish.name] || 1;
              return (
                <div className="card" key={i} data-aos="zoom-in">
                  <img src={dish.image} alt={dish.name} />
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <span className="price">{dish.price}</span>

                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                      margin: "0.5rem 0",
                    }}
                  >
                    <label htmlFor={`qty-${i}`}>Qty:</label>
                    <input
                      id={`qty-${i}`}
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(dish.name, e.target.value)
                      }
                      style={{
                        width: "60px",
                        padding: "0.3rem",
                        borderRadius: "4px",
                        textAlign: "center",
                      }}
                    />
                  </div>

                  <button onClick={() => handleAddToCart(dish, quantity)}>
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </MenuSection>
  );
}

// Styled component for the layout
const MenuSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;

  .title {
    text-align: center;
    font-size: 2.5rem;
    color: #e63946;
    margin-bottom: 3rem;
  }

  .category {
    font-size: 1.8rem;
    color: #1d3557;
    margin: 2rem 0 1rem;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .card {
    background-color: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 420px;

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 1rem;
      flex-shrink: 0;
    }

    h3 {
      margin: 0.5rem 0;
      color: #333;
      flex-shrink: 0;
    }

    p {
      font-size: 0.9rem;
      color: #666;
      margin: 0.3rem 0 0.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      flex-grow: 1;
    }

    .price {
      font-weight: bold;
      color: #1d3557;
      margin-bottom: 1rem;
      flex-shrink: 0;
    }

    button {
      background-color: #e63946;
      color: white;
      padding: 0.5rem 1.2rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.3s ease;
      flex-shrink: 0;

      &:hover {
        background-color: #d62839;
      }
    }
  }

  @media (max-width: 900px) {
    .cards {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
  }

  @media (max-width: 500px) {
    .cards {
      grid-template-columns: 1fr;
    }

    .card {
      height: auto;
      p {
        -webkit-line-clamp: unset;
      }
    }
  }
`;
