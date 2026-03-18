import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import aboutImage from '../assets/about-me.jpeg';
import { projects } from './ProjectGrid';

const ABOUT_LEFT_PADDING = '100px';

const AboutContainer = styled.div`
  margin-top: 0;
  text-align: left;
  width: 100%;
`;

const AboutSection = styled.div`
  background-color: #171819;
  color: white;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-top: -80px;
  padding-top: 140px;
  padding-bottom: 120px;
  min-height: 520px;
  
  @media (max-width: 768px) {
    padding-top: 100px;
    padding-bottom: 80px;
    min-height: auto;
    margin-top: -60px;
  }
`;

const AboutContentRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${ABOUT_LEFT_PADDING};
  padding-right: 40px;
  position: relative;
  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const TextColumn = styled.div`
  flex: 1;
  min-width: 0;
  padding-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 1100px) {
    padding-right: 0;
  }
`;

const AboutHeader = styled.h1`
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 72px;
  font-weight: 500;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.01em;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const Subtitle = styled.div`
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-weight: 300;
  font-size: 25px;
  line-height: 1.3;
  letter-spacing: 0;
  margin-top: 20px;
  margin-bottom: 40px;
  color: #BDBDBD;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 30px;
  }
`;

const ParagraphGroup = styled.div`
  max-width: 520px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 20px;
  
  /* hide single line breaks on mobile */
  @media (max-width: 768px) {
    br:not(.paragraph-break) {
      display: none;
    }
    font-size: 16px;
    margin-bottom: 16px;
    line-height: 1.5;
  }
`;

const ImageColumn = styled.div`
  width: 400px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  margin-top: 0;
  padding-top: 0;
  margin-right: 50px;
  @media (max-width: 1100px) {
    width: 100%;
    align-items: flex-start;
    margin-top: 40px;
    margin-left: 0;
  }
  
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const AboutImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
`;

const ProjectsSection = styled.div`
  margin-top: 80px;
  max-width: 1200px;
  margin: 80px auto 0;
  padding-left: ${ABOUT_LEFT_PADDING};
  padding-right: 40px;
  
  @media (max-width: 1100px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const ProjectsHeader = styled.div`
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-weight: 300;
  font-size: 25px;
  line-height: 1.3;
  letter-spacing: 0;
  margin-bottom: 40px;
  color: #171819;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding-left: 0;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-left: 0;
    gap: 16px;
  }
`;

const CardWrapper = styled.div`
  width: 380px;
  cursor: pointer;
  @media (min-width: 769px) {
    height: 360px; /* fixed height for desktop cards */
  }
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const SeeAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-top: 40px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #171819;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    margin-top: 24px;
    font-size: 15px;
  }
`;

const Arrow = styled.span`
  margin-right: 8px;
`;


const About = () => {
  // first 3 projects, sorted
  const topProjects = [...projects]
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);
  
  const totalProjects = projects.length;
  
  const handleCardClick = (project) => {
    window.location.href = project.link;
  };
  
  return (
    <AboutContainer>
      <AboutSection>
        <AboutContentRow>
          <TextColumn>
            <AboutHeader>About</AboutHeader>
            <Subtitle>:~$ whoami</Subtitle>
            <ParagraphGroup>
              <Paragraph>
              Born and raised in South London, I am very much a <br />self-starter with a real interest in tech. I dabble in creative projects and I'm always finding something new to learn. I'm a real nerd at heart.
              </Paragraph>
              <Paragraph>
              Taking part in a few community projects over the <br />years has made me realise that supporting others <br />is something I really value.
              </Paragraph>
              <Paragraph>
              I've got some exciting projects in the works at the moment, I'm looking forward to sharing more soon!
              </Paragraph>
            </ParagraphGroup>
          </TextColumn>
          <ImageColumn>
            <AboutImage src={aboutImage} alt="About Me" />
          </ImageColumn>
        </AboutContentRow>
      </AboutSection>

      <ProjectsSection>
        <ProjectsHeader>Check out some of my projects</ProjectsHeader>
        <ProjectsGrid>
          {topProjects.map(project => (
            <CardWrapper key={project.id} onClick={() => handleCardClick(project)}>
              <ProjectCard {...project} />
            </CardWrapper>
          ))}
        </ProjectsGrid>
        <SeeAllLink to="/">
          <Arrow>→</Arrow> See all projects [{totalProjects}]
        </SeeAllLink>
      </ProjectsSection>
    </AboutContainer>
  );
};

export default About;
