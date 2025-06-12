import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FiShoppingCart, FiX } from "react-icons/fi";
import { useCart } from "./CartContext";

export default function Navbar({ onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const openCartModal = () => {
    setCartModalOpen(true);
    if (onCartClick) onCartClick();
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]+/g, ""));
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <>
      <Nav>
        <div className="brand">
          <img src={logo} alt="logo" />
        </div>

        <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
        </div>

        <ul className={isOpen ? "links open" : "links"}>
          <li>
            <a href="#home" className="active" onClick={() => setIsOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#menu" onClick={() => setIsOpen(false)}>
              Menu
            </a>
          </li>
          <li>
            <a href="#history" onClick={() => setIsOpen(false)}>
              History
            </a>
          </li>
          <li>
            <a href="#footer" onClick={() => setIsOpen(false)}>
              Contact Us
            </a>
          </li>
          <li
            className="cart-icon"
            onClick={() => {
              setIsOpen(false);
              openCartModal();
            }}
            style={{ cursor: "pointer", position: "relative" }}
            aria-label="Open cart"
          >
            <FiShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </li>
        </ul>
      </Nav>

      {cartModalOpen && (
        <ModalOverlay onClick={() => setCartModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Your Cart</h2>
              <CloseButton onClick={() => setCartModalOpen(false)}>
                <FiX size={24} />
              </CloseButton>
            </ModalHeader>

            {cartItems.length === 0 ? (
              <EmptyMessage>Your cart is empty.</EmptyMessage>
            ) : (
              <>
                <CartList>
                  {cartItems.map(({ name, quantity, price }, i) => (
                    <CartItem key={i}>
                      <span>{name}</span>
                      <span>Qty: {quantity}</span>
                      <span>
                        $
                        {(
                          parseFloat(price.replace(/[^0-9.]+/g, "")) * quantity
                        ).toFixed(2)}
                      </span>
                    </CartItem>
                  ))}
                </CartList>
                <Total>Total: ${totalPrice.toFixed(2)}</Total>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;
  position: relative;
  z-index: 10;

  .brand {
    img {
      width: 200px;
      height: auto;
      margin-top: 1rem;
      cursor: pointer;
    }
  }

  .toggle {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 28px;
    height: 24px;
    cursor: pointer;

    .bar {
      width: 100%;
      height: 3px;
      background-color: #fc4958;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .bar.open:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    .bar.open:nth-child(2) {
      opacity: 0;
    }
    .bar.open:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  }

  .links {
    list-style: none;
    display: flex;
    gap: 2rem;
    align-items: center;

    li {
      a {
        color: #fc4958;
        font-weight: 600;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        transition: 0.3s ease-in-out;

        &:hover {
          color: #f9c7f4;
        }
      }
    }

    .cart-icon {
      color: #fc4958;
      position: relative;

      .cart-count {
        position: absolute;
        top: -8px;
        right: -10px;
        background-color: #e63946;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 0.7rem;
        font-weight: bold;
        user-select: none;
      }

      &:hover {
        color: #d62839;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 4vw;

    .brand img {
      width: 140px;
      margin-top: 0;
    }

    .toggle {
      display: flex;
      position: fixed;
      top: 1rem;
      right: 1.5rem;
      z-index: 9999;
    }

    .links {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: white;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2.5rem;
      padding: 0;
      margin: 0;
      list-style: none;
      opacity: 0;
      pointer-events: none;
      transform: translateY(-20px);
      transition: all 0.3s ease;
      z-index: 9998;

      &.open {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      li a {
        color: #333;
        font-weight: 700;
        font-size: 1.5rem;

        &:hover {
          color: #e63946;
        }
      }
    }
  }
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90vw;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 1.5rem 2rem;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
    color: #fc4958;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fc4958;
  cursor: pointer;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: #333;
`;

const Total = styled.div`
  text-align: right;
  font-weight: 700;
  font-size: 1.2rem;
  color: #e63946;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #999;
  font-style: italic;
  margin: 2rem 0;
`;
