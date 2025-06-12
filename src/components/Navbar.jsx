import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
      </ul>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;
  position: relative;
  z-index: 10; /* Keep navbar on top */

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

    /* Animate bars into X when open */
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
  }

  /* Responsive styles */
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
      /* Fullscreen overlay */
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
      z-index: 9998; /* Just below toggle */

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
