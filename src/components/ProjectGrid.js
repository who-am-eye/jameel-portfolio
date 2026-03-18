import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import smartWasteImg from '../assets/smartwaste/smart-waste.jpg';
import healthcareImg from '../assets/healthcare-app/healthcare-cover.jpg';
import mindOverTechImg from '../assets/mindovertech/mindovertech-cover.jpg';
import hiveImg from '../assets/hive/hive-cover.jpg';
import vulnerabilityImg from '../assets/5.webp';
import startupImg from '../assets/startup/coming-soon-cover.jpg';
import researchPaperImg from '../assets/research-paper/research-paper-1.jpg';
import peoplePhotoCover from '../assets/people/people-7.jpg';
import mhunchoImg from '../assets/dbe-x-mhuncho/dbe.webp';
import zionFosterImg from '../assets/zion-foster/zion foster.jpg';
import trapboyFreddyImg from '../assets/trapboy-freddy/trapboy-freddy-cover.jpg';
import crochetCoverImg from '../assets/crochet-gary-the-snail/cover.jpg';
import crochetPenguinCoverImg from '../assets/crochet-penguin/penguin.jpg';
import crochetMushroomsCoverImg from '../assets/crochet-mushrooms/mushrooms.jpg';
import wildlifePhotoCover from '../assets/wildlife/owl-2.jpg';
import aabCoverImg from '../assets/aab/cover.jpg';
import { motion, AnimatePresence } from 'framer-motion';

const GridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  position: relative;
  min-height: 2420px; /* 6 rows: 16 projects / 3 cols */
  
  @media (max-width: 1100px) {
    /* tablet/mobile */
    min-height: 3200px;
  }
  
  @media (max-width: 768px) {
    /* small mobile */
    min-height: 3360px;
    padding: 0;
  }
`;

const CardWrapper = styled(motion.div)`
  width: 380px;
  position: absolute;
  transform-origin: center center;
  cursor: pointer;
  
  @media (min-width: 769px) {
    height: 360px; /* fixed height for desktop cards */
  }
  
  @media (max-width: 768px) {
    /* narrower on mobile */
    width: calc(50% - 12px);
    max-width: 380px;
    display: flex;
    height: auto; /* flexible height on mobile */
    
    /* equal height per row */
    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;


// all projects
export const projects = [
  {
    id: 1,
    order: 6,
    image: smartWasteImg,
    title: 'SmartWaste',
    subtitle: 'Jun 2022',
    tags: ['UI/UX', 'Technology'],
    link: '/project/smartwaste'
  },
  {
    id: 2,
    order: 15,
    image: healthcareImg,
    title: 'Healthcare Travel App',
    subtitle: 'Feb 2024',
    tags: ['UI/UX'],
    link: '/project/healthcare'
  },
  {
    id: 3,
    order: 8,
    image: mindOverTechImg,
    title: 'Mind Over Tech App',
    subtitle: 'Apr 2022',
    tags: ['UI/UX'],
    link: '/project/mindovertech'
  },
  {
    id: 4,
    order: 1,
    image: hiveImg,
    title: 'Hive Community Project',
    subtitle: 'Jan 2024',
    tags: ['UI/UX'],
    link: '/project/hive'
  },
  {
    id: 5,
    order: 0,
    image: vulnerabilityImg,
    title: 'How I Found a Vulnerability in a $25M E-Commerce Company',
    subtitle: 'Sep 2024',
    tags: ['Technology'],
    link: '/project/how-i-found-a-vulnerability-in-a-$25m-company'
  },
  {
    id: 6,
    order: 11,
    image: startupImg,
    title: 'Work In Progress: [*******].gg',
    subtitle: 'ETA Sep 2025',
    tags: ['Technology'],
    link: '/project/startup-wip'
  },
  {
    id: 7,
    order: 13,
    image: researchPaperImg,
    title: 'Security Threats & Cryptography Paper',
    subtitle: 'Nov 2021',
    tags: ['Technology'],
    link: '/project/security-threats-&-cryptography-paper'
  },
  {
    id: 8,
    order: 5,
    image: peoplePhotoCover,
    title: 'Photography: People & Places',
    subtitle: '',
    tags: ['Photography'],
    link: '/project/photography-people-and-places'
  },
  {
    id: 9,
    order: 2,
    image: mhunchoImg,
    title: 'How I Produced for a 5-Billion-Stream Artist Duo',
    subtitle: 'Jan 2025',
    tags: ['Music'],
    link: '/project/how-i-produced-for-a-5-billion-stream-artist-duo'
  },
  {
    id: 10,
    order: 4,
    image: crochetCoverImg,
    title: 'Crochet: Gary The Snail',
    subtitle: 'Sep 2024',
    tags: ['Crafts'],
    link: '/project/crochet-gary-the-snail'
  },
  {
    id: 11,
    order: 10,
    image: wildlifePhotoCover,
    title: 'Photography: Wildlife',
    subtitle: '',
    tags: ['Photography'],
    link: '/project/photography-wildlife'
  },
  {
    id: 12,
    order: 3,
    image: aabCoverImg,
    title: 'Photography: Aab Collection',
    subtitle: 'Aug 2023',
    tags: ['Photography'],
    link: '/project/photography-aab-collection'
  },
  {
    id: 13,
    order: 9,
    image: crochetPenguinCoverImg,
    title: 'Crochet: Penguin',
    subtitle: 'Sep 2025',
    tags: ['Crafts'],
    link: '/project/crochet-penguin'
  },
  {
    id: 14,
    order: 14,
    image: crochetMushroomsCoverImg,
    title: 'Crochet: Mushrooms',
    subtitle: 'Apr 2023',
    tags: ['Crafts'],
    link: '/project/crochet-mushrooms'
  },
  {
    id: 15,
    order: 7,
    image: zionFosterImg,
    title: 'How I Produced for Zion Foster',
    subtitle: 'Oct 2024',
    tags: ['Music'],
    link: '/project/how-i-produced-for-zion-foster'
  },
  {
    id: 16,
    order: 12,
    image: trapboyFreddyImg,
    title: 'How I Produced for a Top 100 Artist',
    subtitle: 'Aug 2025',
    tags: ['Music'],
    link: '/project/how-i-produced-for-a-top-100-artist'
  },
];


// figure out position based on screen size
const getPosition = (orderIndex, width) => {
  // desktop: 3 cols
  if (width > 768) {
    const col = (orderIndex - 1) % 3;
    const row = Math.floor((orderIndex - 1) / 3);
    return {
      x: col * 404, // 380px card width + 24px gap
      y: row * 400  // fixed height for desktop cards + gap
    };
  } 
  // mobile: 2 cols
  else {
    const col = (orderIndex - 1) % 2;
    const row = Math.floor((orderIndex - 1) / 2);
    const availableWidth = width - 40; // 20px padding on each side
    const cardWidth = (availableWidth - 20) / 2; // 2 cards with 20px gap between
    const gapWidth = 20;
    return {
      x: col * (cardWidth + gapWidth),
      y: row * 360
    };
  }
};


const ProjectGrid = ({ activeFilter }) => {
  const [positions, setPositions] = useState({});
  const [initialRender, setInitialRender] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  
  const cardRefs = useRef({});
  const [rowHeights, setRowHeights] = useState({});
  
  // filter by active tag - 'all' = show everything
  const filteredProjects = activeFilter && activeFilter !== 'All' 
    ? projects.filter(project => project.tags.includes(activeFilter))
    : projects;
  
  // group into rows for mobile
  const getProjectRows = () => {
    if (windowWidth <= 768) {
      const sortedProjects = [...filteredProjects].sort((a, b) => a.order - b.order);
      const rows = {};
      
      sortedProjects.forEach((project, index) => {
        const row = Math.floor(index / 2);
        if (!rows[row]) rows[row] = [];
        rows[row].push(project.id);
      });
      
      return rows;
    }
    return {};
  };
  
  // recalculate on resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      const newPositions = {};
      const sortedProjects = [...filteredProjects].sort((a, b) => a.order - b.order);
      sortedProjects.forEach((project, index) => {
        newPositions[project.id] = getPosition(index + 1, newWidth);
      });
      setPositions(newPositions);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [filteredProjects]); // need filteredProjects as dep

  // recalculate when filter changes
  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    
    const newPositions = {};
    // sort then recalc
    const sortedProjects = [...filteredProjects].sort((a, b) => a.order - b.order);
    sortedProjects.forEach((project, index) => {
      // index-based positioning
      newPositions[project.id] = getPosition(index + 1, windowWidth);
    });
    setPositions(newPositions);
  }, [filteredProjects, initialRender, windowWidth]);

  // initial positions
  useEffect(() => {
    const initialPositions = {};
    const sortedProjects = [...filteredProjects].sort((a, b) => a.order - b.order);
    sortedProjects.forEach((project, index) => {
      // index-based positioning
      initialPositions[project.id] = getPosition(index + 1, windowWidth);
    });
    setPositions(initialPositions);
  }, [filteredProjects, windowWidth]);

  // equalize card heights on mobile
  useEffect(() => {
    if (windowWidth <= 768) {
      // small delay for dom to update
      const timeoutId = setTimeout(() => {
        const projectRows = getProjectRows();
        const newRowHeights = {};
        
        // get tallest in row
        Object.entries(projectRows).forEach(([row, projectIds]) => {
          let maxHeight = 0;
          
          projectIds.forEach(id => {
            const cardElement = cardRefs.current[id];
            if (cardElement) {
              const cardHeight = cardElement.getBoundingClientRect().height;
              maxHeight = Math.max(maxHeight, cardHeight);
            }
          });
          
          if (maxHeight > 0) {
            newRowHeights[row] = maxHeight;
            
            // set uniform height
            projectIds.forEach(id => {
              const cardElement = cardRefs.current[id];
              if (cardElement) {
                cardElement.style.height = `${maxHeight}px`;
              }
            });
          }
        });
        
        setRowHeights(newRowHeights);
      }, 200);
      
      return () => clearTimeout(timeoutId);
    }
  }, [filteredProjects, windowWidth]);

  // z-index for stacking cards
  const getZIndex = (projectId) => {
    // sort projects by order first
    const sortedProjects = [...filteredProjects].sort((a, b) => a.order - b.order);
    // reversed so cards slide from under
    const index = sortedProjects.findIndex(p => p.id === projectId);
    return sortedProjects.length - index;
  };

  // row number for project (mobile)
  const getRowNumber = (projectId) => {
    const sortedProjects = [...filteredProjects].sort((a, b) => a.order - b.order);
    const index = sortedProjects.findIndex(p => p.id === projectId);
    return Math.floor(index / 2); // 2 columns on mobile
  };

  const handleCardClick = (project) => {
    window.location.href = project.link;
  };

  return (
    <GridContainer>
      <AnimatePresence>
        {filteredProjects
          .sort((a, b) => a.order - b.order)
          .map((project, index) => {
            const zIndexValue = getZIndex(project.id);
            const rowNumber = getRowNumber(project.id);
            
            return (
              <CardWrapper
                key={project.id}
                style={{ zIndex: zIndexValue }}
                initial={{ 
                  opacity: 0, 
                  x: positions[project.id]?.x || 0, 
                  y: positions[project.id]?.y || 0,
                }}
                animate={{ 
                  opacity: 1, 
                  x: positions[project.id]?.x || 0, 
                  y: positions[project.id]?.y || 0,
                }}
                exit={{ 
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 50,
                  mass: 1,
                  duration: 0.4,
                  opacity: { duration: 0.15 }
                }}
                onClick={() => handleCardClick(project)}
                ref={el => cardRefs.current[project.id] = el}
                data-row={rowNumber}
              >
                <ProjectCard 
                  {...project} 
                  id={project.id}
                />
              </CardWrapper>
            );
          })}
      </AnimatePresence>
    </GridContainer>
  );
};

export default ProjectGrid;
