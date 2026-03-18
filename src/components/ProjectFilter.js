import React, { useState } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  margin: 32px 0 16px 0;
  text-align: left;
  
  @media (max-width: 768px) {
    margin: 20px 0 10px 0;
    width: 100%;
  }
`;

const Label = styled.span`
  color: #666;
  font-size: 14px;
  letter-spacing: 0.04em;
  margin-right: 16px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  margin-bottom: 10px;
  display: block;
`;

const FilterList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8px;
    width: 100%;
  }
`;

const FilterButton = styled.button`
  background: ${({ $isActive }) => ($isActive ? '#171819' : '#f5f7fa')};
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#171819')};
  border: none;
  border-radius: 0;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: 'Space Grotesk', Arial, sans-serif;
  text-transform: uppercase;
  &:hover {
    background: #171819;
    color: #fff;
  }
  
  @media (max-width: 768px) {
    padding: 8px 0;
    font-size: 12px;
    width: 100%;
    text-align: center;
  }
`;


const filters = [
  'All',
  'Technology',
  'UI/UX',
  'Music',
  'Crafts',
  'Photography',
];


const ProjectFilter = ({ selected, onFilterChange }) => {
  const [active, setActive] = useState(selected || 'All');

  const handleClick = (filter) => {
    setActive(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  return (
    <FilterContainer>
      <Label>PROJECT TYPE</Label>
      <FilterList>
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            $isActive={active === filter}
            onClick={() => handleClick(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </FilterList>
    </FilterContainer>
  );
};

export default ProjectFilter;
