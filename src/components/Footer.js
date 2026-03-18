import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FOOTER_LEFT_PADDING = '40px';

const FooterWrapper = styled.div`
  width: 100vw;
  background-color: #171819;
  margin-top: 100px;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  font-family: 'Space Grotesk', Arial, sans-serif;
`;

const FooterContainer = styled.footer`
  color: white;
  padding: 40px 0 60px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: ${FOOTER_LEFT_PADDING};
  padding-right: 40px;
  
  @media (max-width: 1100px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const Copyright = styled.div`
  font-size: 14px;
  opacity: 0.6;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterNav = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;


const Footer = () => {
  return (
    <FooterWrapper className="FooterWrapper">
      <FooterContainer>
        <FooterContent>
          <TopSection>
            <Copyright>
              <div>Site built by Jameel Ansari.</div>
              <div>© 2025 All Rights Reserved</div>
            </Copyright>
            <FooterNav>
              <FooterLink to="/">HOME</FooterLink>
              <FooterLink to="/about">ABOUT</FooterLink>
              <FooterLink to="/contact">CONTACT</FooterLink>
            </FooterNav>
          </TopSection>
        </FooterContent>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
