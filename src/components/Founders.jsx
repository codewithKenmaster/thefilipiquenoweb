import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Founders() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <FounderSection>
      <h1 data-aos="fade-down">Meet the Founders</h1>

      {/* Keny Section */}
      <FounderRow data-aos="fade-right">
        <ImageWrapper>
          <img
            src="https://media.craiyon.com/2025-06-12/EAyg2QXpSGCMzlfMXP-YSQ.webp"
            alt="Keny Jimenez"
          />
        </ImageWrapper>
        <Bio>
          <h2>Keny Jimenez</h2>
          <p>
            A Puerto Rican born in Loíza, Puerto Rico, Keny is both the owner
            and developer of this website. Passionate about technology and
            culture, he brings the authentic Puerto Rican cuisine to this fusion
            culinary experience.
          </p>
        </Bio>
      </FounderRow>

      {/* Rose Ann Section */}
      <FounderRow data-aos="fade-left" reverse>
        <Bio>
          <h2>Rose Ann Jimenez</h2>
          <p>
            Married to Keny, Rose Ann hails from Tagapul-An, a beautiful island
            in Samar Province, Philippines. She brings the heart and soul of
            Filipino dishes, alongside her family, enriching this culinary
            fusion with tradition and love.
          </p>
        </Bio>
        <ImageWrapper>
          <img
            src="https://media.craiyon.com/2025-04-11/_8FLXtG4SOSq9MbincoqYg.webp"
            alt="Rose Ann Jimenez"
          />
        </ImageWrapper>
      </FounderRow>
    </FounderSection>
  );
}

const FounderSection = styled.section`
  max-width: 900px;
  margin: 4rem auto;
  padding: 0 1rem;
  text-align: left;

  h1 {
    text-align: center;
    font-size: 2.8rem;
    color: #e63946;
    margin-bottom: 3rem;
    font-weight: 700;
  }
`;

// Add typing for reverse prop to avoid react warning & destructure it properly
const FounderRow = styled.div.attrs((props) => ({
  reverse: props.reverse,
}))`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgb(0 0 0 / 0.15);

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    border-radius: 15px;
  }
`;

const Bio = styled.div`
  flex: 1;
  color: #333;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #1d3557;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding-top: 1.5rem;
  }
`;
