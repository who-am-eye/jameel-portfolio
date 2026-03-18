import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: #fafbfc;
  border-radius: 0;
  overflow: hidden;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  transition: background-color 0.225s ease-in-out, color 0.225s ease-in-out;
  display: block;
  text-decoration: none;
  color: #171819;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background-color: #171819;
    color: white;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    height: 180px; /* smaller images on tiny screens */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
  ${props => props.isSmartWaste && `
    width: 70%;
    height: auto;
    object-fit: contain;
  `}
`;

const Info = styled.div`
  padding: 20px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  
  @media (min-width: 769px) {
    height: 140px; /* fixed height for desktop */
    position: relative;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    min-height: 100px;
    justify-content: space-between;
    height: auto; /* flexible height on mobile */
  }
`;

const TitleContainer = styled.div`
  margin-bottom: auto;

  @media (min-width: 769px) {
    height: 46px; /* fixed title area - fits 2 lines */
    overflow: hidden;
    margin-bottom: 12px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 4px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  transition: text-decoration 0.5s ease;
  display: inline-block;
  
  ${CardContainer}:hover & {
    text-decoration: underline;
  }
  
  @media (min-width: 769px) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 2.8em; /* approximately 2 lines */
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 4.5em; /* approximately 3 lines */
  }
`;

const Subtitle = styled.div`
  font-size: 15px;
  color: inherit;
  opacity: 0.7;
  margin-bottom: 8px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  transition: color 0.5s ease;
  
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const Spacer = styled.div`
  flex: 1;
  min-height: 4px;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const BottomInfo = styled.div`
  @media (min-width: 769px) {
    position: absolute;
    bottom: 16px;
    left: 20px;
    right: 20px;
  }
  
  @media (max-width: 768px) {
    padding-top: 12px;
  }
`;

const Tags = styled.div`
  font-size: 13px;
  opacity: 0.6;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-family: 'Space Grotesk', Arial, sans-serif;
  transition: color 0.5s ease;
`;

const Tag = styled.span`
  position: relative;
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    height: 10px;
    width: 1px;
    background-color: currentColor;
    opacity: 0.7;
  }
`;


const getSubtitleText = (title, subtitle) => {
  return subtitle;
};


const ProjectCard = ({ image, title, subtitle, tags, id }) => {
  // smartwaste check - match by title not id
  const isSmartWaste = title === 'SmartWaste';
  
  // photography projects except aab
  const isPhotographyWithoutDate = title.startsWith('Photography:') && 
                                  title !== 'Photography: Aab Collection';
  
  const subtitleText = getSubtitleText(title, subtitle);
  
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={image} alt={title} isSmartWaste={isSmartWaste} />
      </ImageContainer>
      <Info>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <Spacer />
        <BottomInfo>
          {subtitle && (
            <Subtitle>{subtitle}</Subtitle>
          )}
          <Tags>
            {tags.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </Tags>
        </BottomInfo>
      </Info>
    </CardContainer>
  );
};

export default ProjectCard;
