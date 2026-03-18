import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  margin-top: 56px;
  margin-bottom: 32px;
  text-align: left;
`;

const MainTitle = styled.h1`
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 72px;
  font-weight: 500;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    font-size: 40px;
    flex-direction: column;
    align-items: flex-start;
  }
  
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

const AnimatedTextContainer = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  min-height: 72px; /* match font-size to maintain height */
  font-size: inherit;
  
  @media (max-width: 768px) {
    min-height: 40px; /* match mobile font-size */
    margin-top: 5px;
    font-size: 40px;
  }
  
  @media (max-width: 480px) {
    min-height: 40px;
    font-size: 40px;
  }
`;

const StaticText = styled.span`
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 4px;
  height: 60px;
  background-color: #222;
  margin-left: 3px;
  position: relative;
  top: 0px;
  transform: translateY(0);
  animation: blink 0.7s step-end infinite;
  
  @media (max-width: 768px) {
    height: 50px;
  }
  
  @media (max-width: 480px) {
    height: 50px;
  }
  
  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const TypedChar = styled.span`
  display: inline-block;
  opacity: 0;
  animation: fadeIn 0.2s ease-in forwards;
  white-space: pre; /* preserve spaces */
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 40px;
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    60% { opacity: 0.3; }
    100% { opacity: 1; }
  }
`;

const SubTitle = styled.div`
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-weight: 300;
  font-size: 25px;
  line-height: 1.3;
  letter-spacing: 0;
  margin-top: 20px;
  margin-bottom: 0;
  white-space: preserve;
  color: #BDBDBD;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;


const Hero = () => {
  const roles = [
    "Jameel ",
    "a problem solver ",
    "a producer ",
    "a photographer ",
    "a graphic designer ",
    "a nerd :) "
  ];
  
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeedRef = useRef(100);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
          typingSpeedRef.current = Math.random() * 30 + 70; // random speed 70-100ms
        } else {
          // pause at end before deleting
          typingSpeedRef.current = 700;
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
          typingSpeedRef.current = Math.random() * 20 + 30; // random speed 30-50ms
        } else {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
          typingSpeedRef.current = 300;
        }
      }
      
      timeoutRef.current = setTimeout(handleTyping, typingSpeedRef.current);
    };
    
    timeoutRef.current = setTimeout(handleTyping, typingSpeedRef.current);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isDeleting, roleIndex, roles]);

  // render each char as its own span so we get fade-in effect
  const renderTypedText = () => {
    return displayText.split('').map((char, index) => (
      <TypedChar key={`${roleIndex}-${index}`} style={{ animationDelay: `${index * 0.01}s` }}>
        {char}
      </TypedChar>
    ));
  };

  return (
    <HeroContainer>
      <MainTitle>
        <StaticText>Hi, I'm&nbsp;</StaticText>
        <AnimatedTextContainer>
          {renderTypedText()}
          <Cursor />
        </AnimatedTextContainer>
      </MainTitle>
      <SubTitle>
        Here are some of my projects
      </SubTitle>
    </HeroContainer>
  );
};

export default Hero;
