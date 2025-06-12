import React from "react";
import styled from "styled-components";
import hero from "../assets/food_background.jpg";

export default function Hero() {
  return (
    <Section id="home">
      <div className="background">
        <img src={hero} alt="no pic"></img>
      </div>
      <div className="content">
        <div className="sale">
          <h1>
            Your Favorite PuertoRican-Filipino <span>Fusion</span> Restaurant
          </h1>
          <em>
            With love, with passion, and with heart — we bring more than just
            food to the table. We share our culture, our roots, and our
            traditions. Mi casa es tu casa."{" "}
            <span className="owner">– Keny F. Jimenez</span>
          </em>
          <button>
            <a href="#menu" className="active">
              SEE THE MENU
            </a>
          </button>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  height: 90vh;
  width: 100vw;
  position: relative;
  .background {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      filter: brightness(40%);
      object-fit: cover;
    }
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    .sale {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem; /* space between h1 and button */

      h1 {
        color: white;
        font-size: 2.5rem;
        max-width: 80%;
        span {
          color: #1785e7;
        }
      }

      em {
        color: white;
        .owner {
          color: aqua;
        }
      }

      button {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border: none;
        background-color: #e63946;
        color: white;
        border-radius: 0.5rem;
        cursor: pointer;

        a {
          text-decoration: none;
          font-weight: 600;
          color: white;
        }
      }
    }
  }
`;
