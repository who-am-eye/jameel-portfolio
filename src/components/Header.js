import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FilterContext } from '../App';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  background-color: white;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 25px 18px 50px;
  font-size: 15px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  backdrop-filter: blur(5px);
  box-sizing: border-box;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(380px * 3 + 24px * 2); /* 3 cards + 2 gaps */
    height: 1px;
    background-color: #f2f2f2;
    margin-left: 35px; /* increased to move divider more to the right */
    
    @media (max-width: 1100px) {
      width: calc(100% - 40px);
      left: auto;
      right: auto;
      transform: none;
      margin-left: 0;
    }
  }
  
  @media (max-width: 1100px) {
    padding: 18px 25px 18px 50px;
  }
  
  @media (max-width: 768px) {
    padding: 18px 20px 4.5px 20px;
  }
`;

const Left = styled.div`
  color: #171819;
  font-weight: 500;
  margin-right: auto;
  margin-left: -8px;
  text-align: left;
  
  @media (max-width: 768px) {
    margin-left: 0;
    display: flex;
    align-items: center;
    margin-top: -10px;
    height: 24px;
  }
`;

const Logo = styled(Link)`
  color: #171819;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s;
  white-space: nowrap;
  
  &:hover {
    opacity: 0.7;
  }
`;

const TimeDisplay = styled.span`
  font-weight: 400;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    display: none; /* desktop only */
  }
`;

const MobileTimeDisplay = styled(TimeDisplay)`
  display: none;
  
  @media (max-width: 768px) {
    display: inline;
    margin-left: 8px;
    font-size: 13px;
    line-height: 24px;
  }
`;

const Divider = styled.span`
  margin: 0 8px;
  display: none;
  
  @media (max-width: 768px) {
    display: inline;
    // margin: 0px 6px;
    margin-left: 10px;
    margin-right: 3px;
    font-size: 13px;
    line-height: 24px;
  }
`;

const Center = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 20px; /* slight adjustment to center */
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #171819;
  padding: 0;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
`;

const Right = styled.div`
  color: #171819;
  font-weight: 400;
  text-align: right;
  margin-left: auto;
  margin-right: -55px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 0;
  margin-left: auto;
  color: #171819;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="5" width="24" height="2" fill="currentColor"/>
    <rect y="11" width="24" height="2" fill="currentColor"/>
    <rect y="17" width="24" height="2" fill="currentColor"/>
  </svg>
);

const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(23, 24, 25, 0.95);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 24px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const MenuItem = styled.button`
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-decoration: none;
  font-family: 'Space Grotesk', Arial, sans-serif;
  transition: opacity 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    opacity: 0.7;
  }
`;

// spacer for fixed header
const HeaderSpacer = styled.div`
  height: 84px;
  width: 100%;
  
  @media (max-width: 768px) {
    height: 40px; /* extra height for safari mobile */
  }
`;


function getLondonTime() {
  const now = new Date();
  // london time, accounts for dst
  const options = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false };
  return now.toLocaleTimeString('en-GB', options);
}


const Header = ({ initialLoad = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(getLondonTime());
  const { resetFilter } = useContext(FilterContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuRef = useRef(null);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }
    
    // listen for outside clicks when open
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // navigation
  const handleNavigation = (path) => {
    closeMenu();
    
    // avoid navigating to current page
    if (location.pathname !== path) {
      if (path === '/') {
        resetFilter();
      }
      navigate(path);
    }
  };

  // update every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getLondonTime());
    }, 60000);
    
    setTime(getLondonTime());
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeaderWrapper>
        <motion.div
          initial={initialLoad ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeaderContainer>
            <Left>
              <Logo to="/">JAMEEL ANSARI</Logo>
              {/* mobile time display */}
              <Divider>|</Divider>
              <MobileTimeDisplay>LONDON, UK - {time}</MobileTimeDisplay>
            </Left>
            <Center>
              <MenuButton onClick={toggleMenu}>MENU</MenuButton>
            </Center>
            <Right>
              <TimeDisplay>LONDON, UK - {time}</TimeDisplay>
            </Right>
            <MobileMenuButton onClick={toggleMenu} aria-label="Menu">
              <HamburgerIcon />
            </MobileMenuButton>
          </HeaderContainer>
        </motion.div>
      </HeaderWrapper>
      
      {/* spacer so content isn't hidden under header */}
      <HeaderSpacer />
      
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div ref={menuRef}>
              <CloseButton onClick={closeMenu}>✕</CloseButton>
              <MenuList>
                <MenuItem onClick={() => handleNavigation('/')}>HOME</MenuItem>
                <MenuItem onClick={() => handleNavigation('/about')}>ABOUT</MenuItem>
                <MenuItem onClick={() => handleNavigation('/contact')}>CONTACT</MenuItem>
              </MenuList>
            </div>
          </MenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
