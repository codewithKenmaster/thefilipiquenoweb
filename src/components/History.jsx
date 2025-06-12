import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

export default function History() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Section id="history">
      <div className="title">
        <h1 className="color_title">Our History</h1>
        <p>
          From the heart of Puerto Rico to the soul of the Philippines, our
          fusion cuisine is a celebration of two vibrant cultures. Our story is
          one of family, flavor, and tradition.
        </p>
      </div>

      {/* Block 1: Image Left, Text Right */}
      <div className="history-block" data-aos="fade-right">
        <img
          src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2"
          alt="kitchen"
        />
        <div className="text">
          <h2>Where It All Began</h2>
          <p>
            Our founders brought together the spices and soul of Puerto Rican
            cuisine with the heartwarming dishes of the Philippines. It started
            as a dream to serve more than meals — to serve memories.
          </p>
        </div>
      </div>

      {/* Block 2: Text Left, Image Right */}
      <div className="history-block reverse" data-aos="fade-left">
        <div className="text">
          <h2>A Blend of Cultures</h2>
          <p>
            Every dish tells a story — of migration, of family recipes passed
            down, and of two islands uniting in the universal language of food.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
          alt="food"
        />
      </div>
    </Section>
  );
}

const Section = styled.section`
  padding: 4rem 2rem;
  background-color: #fff;

  .title {
    text-align: center;
    margin-bottom: 3rem;

    .color_title {
      color: #e63946;
      font-size: 2.5rem;
    }

    p {
      max-width: 700px;
      margin: 0 auto;
      color: #444;
      line-height: 1.6;
    }
  }

  .history-block {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 3rem 0;
    flex-wrap: wrap;

    img {
      flex: 1;
      width: 45%;
      border-radius: 1rem;
      object-fit: cover;
    }

    .text {
      flex: 1;
      h2 {
        color: #333;
        margin-bottom: 1rem;
      }
      p {
        color: #555;
        line-height: 1.6;
      }
    }
  }

  .history-block.reverse {
    flex-direction: row-reverse;
  }

  @media (max-width: 768px) {
    .history-block,
    .history-block.reverse {
      flex-direction: column;
      text-align: center;

      img {
        width: 100%;
      }

      .text {
        padding-top: 1rem;
      }
    }
  }
`;
