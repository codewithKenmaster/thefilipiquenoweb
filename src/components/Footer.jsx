import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const [animate, setAnimate] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if footer is in viewport (adjust threshold as needed)
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Trigger animation
        setAnimate(true);
      } else {
        // Reset animation so it can trigger again on re-scroll
        setAnimate(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check in case footer is already in view on load
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FooterWrapper ref={footerRef} animate={animate}>
      <Content>
        <Section>
          <h2>Contact Us</h2>
          <Address>
            1234 Mabuhay St., Barangay Matobato, Calbayog City, Philippines
          </Address>
          <Info>Email: info@thefilipiqueñofusion.com</Info>
          <Info>Phone: +63 912 345 6789</Info>
        </Section>
        <Section>
          <h2>Follow Us</h2>
          <Icons>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
            <a
              href="/"
              aria-label="Flip Icon"
              onClick={(e) => e.preventDefault()}
            ></a>
          </Icons>
        </Section>
      </Content>
      <Copyright>
        &copy; {new Date().getFullYear()} Filipino Fusion. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  } 
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animate css snippet to reuse
const animateCss = css`
  animation: ${fadeIn} 1s ease forwards;
`;

const FooterWrapper = styled.footer`
  background-color: #e63946; /* same as order button */
  color: white;
  height: 400px;
  max-width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow-x: hidden;

  /* Conditionally apply animation */
  ${({ animate }) => (animate ? animateCss : "")}

  @media (max-width: 768px) {
    height: 350px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    height: 280px;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 6rem;
  max-width: 900px;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const Section = styled.div`
  text-align: center;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
`;

const Address = styled.p`
  font-size: 1.1rem;
  line-height: 1.4;
  max-width: 300px;
  margin: 0 auto 0.7rem;
`;

const Info = styled.p`
  font-size: 1.1rem;
  margin: 0.2rem 0;
`;

const Icons = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 2.2rem;
  justify-content: center;

  a {
    color: white;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
      color: #d62839;
    }
  }
`;

const Copyright = styled.div`
  margin-top: 3rem;
  font-size: 1rem;
  opacity: 0.85;
  text-align: center;
`;
