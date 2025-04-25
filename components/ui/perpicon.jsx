import React from 'react';
import styled from 'styled-components';

const perpLogo = () => {
  return (
    <StyledWrapper>
      <div className="button-container">
        <button className="brutalist-button perplexity button-1">
          <div className="perplexity-logo">
            {/* Perplexity logo SVG */}
            <img src="/perplexity.svg" alt="Perplexity logo" className="perplexity-icon" />
          </div>
          <div className="button-text">
            <span>Sonar by</span>
            <span>Perplexity</span>
          </div>
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  /* Common styles for both buttons */
  .brutalist-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    color: #e5dede;
    font-weight: bold;
    text-decoration: none;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  /* Styles for the first button */
  .button-1 {
    background-color: #000000;
    border: 3px solid #42c498;
    border-radius: 12px;
    box-shadow: 4px 4px 1px #000000;
  }

  .button-1:hover {
    background-color: #1a5c46;
    border-color: #030504;
    transform: translate(-6px, -6px) rotate(1deg);
    box-shadow: 10px 10px 0 #000000, 15px 15px 20px rgba(64, 164, 122, 0.2);
  }

  .button-1::before,
  .button-1::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: 0.6s;
  }

  .button-1::before {
    left: -100%;
  }
  .button-1::after {
    left: 100%;
  }

  .button-1:hover::before {
    animation: swipeRight 1.5s infinite;
  }
  .button-1:hover::after {
    animation: swipeLeft 1.5s infinite;
  }

  @keyframes swipeRight {
    100% {
      transform: translateX(200%) skew(-45deg);
    }
  }

  @keyframes swipeLeft {
    100% {
      transform: translateX(-200%) skew(-45deg);
    }
  }

  /* Hover effects */
  .brutalist-button:hover .perplexity-logo {
    transform: translateY(-10px);
  }

  .brutalist-button:hover .perplexity-icon {
    width: 40px;
    height: 40px;
  }

  /* Styles for the Perplexity logo and text */
  .perplexity-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 3;
  }

  .perplexity-icon {
    width: 64px;
    height: 64px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .button-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.2;
    text-align: center;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 3;
  }

  .button-text span:first-child {
    font-size: 12px;
    font-weight: normal;
  }

  .button-text span:last-child {
    font-size: 16px;
  }

  .brutalist-button:hover .perplexity-logo {
    transform: translateY(-10px);
  }

  .brutalist-button:hover .perplexity-icon {
    width: 40px;
    height: 40px;
    animation: spin-and-zoom 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
  }

  .brutalist-button:hover .button-text {
    opacity: 1;
    max-height: 60px;
    margin-top: 8px;
  }

  @keyframes spin-and-zoom {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }

  .brutalist-button:hover .button-text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .brutalist-button:active .perplexity-icon,
  .brutalist-button:active .button-text {
    transform: scale(0.95);
  }
`;

export default perpLogo;
