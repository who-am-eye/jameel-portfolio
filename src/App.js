import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ProjectFilter from './components/ProjectFilter';
import ProjectGrid from './components/ProjectGrid';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

// smartwaste imgs
import screen1 from './assets/smartwaste/screen-1.png';
import screen2 from './assets/smartwaste/screen-2.png';
import screen3 from './assets/smartwaste/screen-3.png';
import screen4 from './assets/smartwaste/screen-4.png';
import screen5 from './assets/smartwaste/screen-5.png';
import screen6 from './assets/smartwaste/screen-6.png';
import landingPage from './assets/smartwaste/landing-page.png';


// healthcare imgs
import healthcareLandingPage from './assets/healthcare-app/healthcare-landing-page.jpg';

// mind over tech imgs
import mindOverTechCover from './assets/mindovertech/mindovertech-cover.jpg';
import motScreen1 from './assets/mindovertech/screen-1.png';
import motScreen2 from './assets/mindovertech/screen-2.png';
import motScreen3 from './assets/mindovertech/screen-3.png';
import motScreen4 from './assets/mindovertech/screen-4.png';
import motScreen5 from './assets/mindovertech/screen-5.png';
import motScreen6 from './assets/mindovertech/screen-6.png';

// hive imgs
import hiveScreen1 from './assets/hive/screen-1.png';
import hiveScreen2 from './assets/hive/screen-2.png';
import hiveScreen3 from './assets/hive/screen-3.png';
import hiveScreen4 from './assets/hive/screen-4.png';


// startup imgs
import startupComingSoon from './assets/startup/coming-soon.jpg';

// research paper imgs
import researchPaper1 from './assets/research-paper/research-paper-1.jpg';
import researchPaper2 from './assets/research-paper/research-paper-2.jpg';


// photography - people
import people1 from './assets/people/people-1.jpg';
import people2 from './assets/people/people-2.jpg';
import people3 from './assets/people/people-3.jpg';
import people4 from './assets/people/people-4.jpg';
import people5 from './assets/people/people-5.jpg';
import people6 from './assets/people/people-6.jpg';
import people7 from './assets/people/people-7.jpg';
import people8 from './assets/people/people-8.jpg';
import people9 from './assets/people/people-9.jpg';
import people10 from './assets/people/people-10.jpg';
import architecture1 from './assets/people/architecture-1.jpg';
import architecture2 from './assets/people/architecture-2.jpg';
import market from './assets/people/market.jpg';
import me from './assets/people/me.jpg';
import palestine1 from './assets/people/palestine-1.jpg';
import palestine2 from './assets/people/palestine-2.jpg';

// photography - wildlife
import wildlife1 from './assets/wildlife/owl-1.jpg';
import wildlife2 from './assets/wildlife/owl-2.jpg';
import wildlife3 from './assets/wildlife/lizard.jpg';
import wildlife4 from './assets/wildlife/squirrel.jpg';
import wildlife5 from './assets/wildlife/village-1.jpg';
import wildlife6 from './assets/wildlife/village-2.jpg';


// aab collection
import aabCover from './assets/aab/cover.jpg';
import aabVideo1 from './assets/aab/aab-video-1.mp4';
import aabVideo2 from './assets/aab/aab-video-2.mp4';
import aabVideo3 from './assets/aab/aab-video-3.mp4';

// music - imgs + audio
import dbeImage from './assets/dbe-x-mhuncho/dbe.webp';
import mhunchoImage from './assets/dbe-x-mhuncho/mhuncho.jpg';
import loopAudio from './assets/dbe-x-mhuncho/loop.mp3';
import beatAudio from './assets/dbe-x-mhuncho/beat.mp3';
import snippetAudio from './assets/dbe-x-mhuncho/snippet.mp3';
import zionFosterAudio from './assets/zion-foster/loop.mp3';
import zionFosterSnippet from './assets/zion-foster/Zion Foster - Unreleased Snippet.m4a';
import zionFosterCover from './assets/zion-foster/zion foster.jpg';
import trapboyFreddyCover from './assets/trapboy-freddy/trapboy-freddy.jpg';
import trapboyFreddyAudio from './assets/trapboy-freddy/Deep Blue - 140bpm Eb Major - @dejavu.ldn.wav';


// crochet imgs
import crochetGary from './assets/crochet-gary-the-snail/gary.jpg';
import crochetYarn from './assets/crochet-gary-the-snail/yarn.jpg';
import crochetCover from './assets/crochet-gary-the-snail/cover.jpg';
import crochetPenguin from './assets/crochet-penguin/penguin.jpg';
import crochetMushrooms from './assets/crochet-mushrooms/mushrooms.jpg';


// vscode dark theme but no line highlights
const customStyle = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#1e1e1e',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: '#1e1e1e',
  }
};


// filter context
export const FilterContext = createContext({
  activeFilter: 'All',
  setActiveFilter: () => {},
  resetFilter: () => {}
});

// audio context
export const AudioContext = createContext({
  audioRefs: {},
  audioIsPlaying: {},
  audioProgress: {},
  audioCurrent: {},
  audioDuration: {},
  audioIsMuted: {},
  audioVolume: {},
  setAudioIsPlaying: () => {},
  togglePlay: () => {},
  seekAudio: () => {},
  toggleMute: () => {},
  changeVolume: () => {},
  formatTime: () => {},
});


// full-size image modal
const ImageModal = ({ image, isOpen, onClose }) => {
  // close on esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
  
  // backdrop click closes modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // clicking img also closes
  const handleImageClick = () => {
    onClose();
  };
  
  return (
    <div 
      className={`image-modal-overlay ${isOpen ? 'active' : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className="image-modal-content">
        <button className="image-modal-close" onClick={onClose}>×</button>
        <img src={image} alt="Full size preview" onClick={handleImageClick} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
};


// carousel - single or multi image
const ImageCarousel = ({ images, singleImageMode = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const imagesPerPage = singleImageMode ? 1 : 3;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  
  const handlePrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev === 0 ? totalPages - 1 : prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400); // must match css transition
  };
  
  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev === totalPages - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400); // must match css transition
  };
  
  const handleDotClick = (index) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };
  
  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };
  
  const getCurrentImages = () => {
    const startIdx = currentIndex * imagesPerPage;
    return images.slice(startIdx, startIdx + imagesPerPage);
  };
  
  const renderControls = () => (
    <div className="carousel-controls">
      <button className="carousel-button" onClick={handlePrev}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="carousel-dots">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <span 
            key={idx} 
            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
      <button className="carousel-button" onClick={handleNext}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
  
  return (
    <>
      <div className="carousel-container">
        {singleImageMode && renderControls()}
        <div className={`carousel-images ${isTransitioning ? 'transitioning' : ''} ${singleImageMode ? 'single-image-mode' : ''}`}>
          {getCurrentImages().map((img, idx) => (
            <div 
              className="carousel-image" 
              key={idx}
              onClick={() => openModal(img)}
            >
              <img src={img} alt={`App Screen ${idx + 1 + currentIndex * imagesPerPage}`} />
            </div>
          ))}
        </div>
        {!singleImageMode && renderControls()}
        {singleImageMode && (
          <div className="carousel-bottom-controls">
            {renderControls()}
          </div>
        )}
      </div>
      
      <ImageModal 
        image={modalImage} 
        isOpen={modalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};


// syntax highlighted code block
const CodeBlock = ({ language, code }) => {
  return (
    <div className="code-block-container">
      <SyntaxHighlighter 
        language={language} 
        style={customStyle}
        showLineNumbers={true}
        wrapLines={true}
        lineProps={() => ({
          style: { 
            display: 'block', 
            background: '#1e1e1e'
          }
        })}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};


// separate component - hooks need this
const AabCollectionPage = () => {
  // track pause state per video
  const [videoPaused, setVideoPaused] = useState({
    video1: false,
    video2: false,
    video3: false
  });
  
  const isMobile = window.innerWidth <= 768;
  
  // toggle video playback
  const togglePlay = (event, videoId) => {
    // mobile: don't allow pause
    if (isMobile) {
      event.preventDefault();
      return;
    }
    
    const video = event.target;
    if (video.paused) {
      video.play();
      setVideoPaused(prev => ({
        ...prev,
        [videoId]: false
      }));
    } else {
      video.pause();
      setVideoPaused(prev => ({
        ...prev,
        [videoId]: true
      }));
    }
  };
  
  // all videos for mobile layout
  const allVideos = [
    {
      id: 'video1',
      src: aabVideo1,
      paused: videoPaused.video1
    },
    {
      id: 'video2',
      src: aabVideo2,
      paused: videoPaused.video2
    },
    {
      id: 'video3',
      src: aabVideo3,
      paused: videoPaused.video3
    }
  ];
  
  return (
    <div className="project-details" data-project="photography-aab">
      <div className="photo-grid-container">
        {isMobile ? (
          // mobile: single col
          <div className="photo-column">
            {allVideos.map((video, index) => (
              <div 
                key={video.id} 
                className="video-grid-item"
                style={{animationDelay: `${0.05 * (index + 1)}s`}}
              >
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  disablePictureInPicture 
                  disableRemotePlayback 
                  className="autoplay-video"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        ) : (
          // desktop: 3 cols
          <>
            {/* video 1 */}
            <div className="photo-column">
              <div className={`video-grid-item ${videoPaused.video1 ? 'video-paused' : ''}`}>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  disablePictureInPicture 
                  disableRemotePlayback 
                  className="autoplay-video"
                  onClick={(e) => togglePlay(e, 'video1')}
                  onContextMenu={(e) => e.preventDefault()}
                  onPlay={() => setVideoPaused(prev => ({ ...prev, video1: false }))}
                  onPause={() => setVideoPaused(prev => ({ ...prev, video1: true }))}
                >
                  <source src={aabVideo1} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* video 2 */}
            <div className="photo-column">
              <div className={`video-grid-item ${videoPaused.video2 ? 'video-paused' : ''}`}>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  disablePictureInPicture 
                  disableRemotePlayback 
                  className="autoplay-video"
                  onClick={(e) => togglePlay(e, 'video2')}
                  onContextMenu={(e) => e.preventDefault()}
                  onPlay={() => setVideoPaused(prev => ({ ...prev, video2: false }))}
                  onPause={() => setVideoPaused(prev => ({ ...prev, video2: true }))}
                >
                  <source src={aabVideo2} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* video 3 */}
            <div className="photo-column">
              <div className={`video-grid-item ${videoPaused.video3 ? 'video-paused' : ''}`}>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  disablePictureInPicture 
                  disableRemotePlayback 
                  className="autoplay-video"
                  onClick={(e) => togglePlay(e, 'video3')}
                  onContextMenu={(e) => e.preventDefault()}
                  onPlay={() => setVideoPaused(prev => ({ ...prev, video3: false }))}
                  onPause={() => setVideoPaused(prev => ({ ...prev, video3: true }))}
                >
                  <source src={aabVideo3} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


// project detail page
const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { resetFilter } = useContext(FilterContext);
  const {
    audioRefs,
    audioIsPlaying,
    audioProgress,
    audioCurrent,
    audioDuration,
    audioIsMuted,
    audioVolume,
    togglePlay,
    seekAudio,
    toggleMute,
    changeVolume,
    formatTime,
    setAudioIsPlaying
  } = useContext(AudioContext);
  
  // render content based on project id
  const renderProjectContent = () => {
    switch(projectId) {
      case 'smartwaste':
        // project images
        const projectImages = [screen1, screen2, screen3, screen4, screen5, screen6];
        
        return (
          <div className="project-details" data-project="smartwaste">
            <h1>SmartWaste - E-Waste App Prototype</h1>
            
            <p>
            During my first year of sixth form, we participated in what our school called an "Industry Project", a one-day challenge facilitated by Deloitte. In a nutshell, we were given a real-world brief, assigned teams and roles and expected to deliver a finished solution by the end of the day.

<br></br><br></br>The brief challenged us to design an app that would help reduce electronic waste in the environment. I was assigned the role of Project Manager, responsible for leading the team, ensuring all voices were heard, delegating tasks effectively and keeping the project on track to meet its deliverables.
            </p>
            
            <ImageCarousel images={projectImages} />
            
            <p>
            Our team consisted of six members, though two were absent that day, including our designated Graphic Designer. Having some experience with graphic design myself, I volunteered to take on the additional responsibility.

            <br></br><br></br>Together, we brainstormed an app concept that would make disposing of electronic waste efficient, rewarding and accessible. The app would allow users to scan their devices to determine how and where each component could be recycled sustainably. To encourage engagement, users could earn SmartWaste points ($W) as rewards for recycling and access a marketplace to buy, sell or rent second-hand tech.

            <br></br><br></br>We named the app SmartWaste and I began designing a sleek, modern, and user-friendly prototype and slidedeck in Figma.

            <br></br><br></br>It was an intense five-hour sprint and although we did not win, I was happy for my peers and proud of our team's effort and collaboration. Deloitte even gifted me a goodie bag, having taken a special interest in my design work.
            </p>
            
            <div className="project-landing-image">
              <img src={landingPage} alt="SmartWaste Landing Page" />
            </div>
          </div>
        );
      case 'healthcare':
        return (
          <div className="project-details" data-project="healthcare">
            <h1>Healthcare Travel App - Landing Page</h1>
            
            <p>
            At the beginning of 2024, I was kindly invited to contribute to a startup in the medical technology space, specifically assisting with the design of the website interface. Grateful for the opportunity, I accepted and began working on the project. As the app is still in its pre-launch phase, I'm unable to share details at the moment.

            <br></br><br></br>Below is an early mockup of the landing page.
            </p>
            
            <div className="project-landing-image">
              <img src={healthcareLandingPage} alt="Healthcare App Landing Page" />
            </div>
          </div>
        );
      case 'mindovertech':
        // mot images
        const motImages = [motScreen1, motScreen2, motScreen3, motScreen4, motScreen5, motScreen6];
        
        return (
          <div className="project-details" data-project="mindovertech">
            <h1>Mind Over Tech - Unfinished Concept</h1>
            
            <p>
            During my first year of sixth form, <a href="https://uk.linkedin.com/in/jonathan-garner" target="_blank">Jonathan Garner</a>, Founder and Co-CEO of <a href="https://www.mindovertech.com/" target="_blank">Mind over Tech</a>, visited our school to introduce his product, the Digital Habit Lab. Designed as a deck of cards, the product encourages users to take meaningful action and build healthier relationships with technology by disrupting unhealthy digital habits.

<br></br><br></br>The exercise was thought provoking and sparked my interest in Mind over Tech's mission. After speaking with Jonathan, I offered to contribute to the development of a mobile app that would allow users to stay connected with the company from their smartphones.

Although I ultimately had to step away from the project due to personal commitments, below is an early concept I designed for Mind over Tech.
            </p>
            
            <ImageCarousel images={motImages} />
          </div>
        );
      case 'hive':
        // hive images - 1 at a time
        const hiveImages = [hiveScreen1, hiveScreen2, hiveScreen3, hiveScreen4];
        
        return (
          <div className="project-details" data-project="hive">
            <h1>Hive Community Project</h1>
            
            <p>
              I have been given the opportunity to be a part of an exciting project where we are converting a derelict night club into a building complex focused around the community and local businesses.
            </p>

            <p>
              Our aim is to create a community cooperative business which will be a hub for local residents, create job opportunities and be owned and supported by the community.
            </p>
            
            <p>
              The building has been purchased and once granted planning permission, we propose to build the following:
            </p>
            
            <div className="bullet-points-container">
              <ul className="bullet-points-row">
                <li>Community Hall</li>
                <li>Tuition Centre</li>
                <li>Counselling Room(s)</li>
                <li>Seniors Club / Youth Centre</li>
              </ul>
              <ul className="bullet-points-row">
                <li>Office Working Space</li>
                <li>Fitness & Health Centre</li>
                <li>700sqm of Banqueting / Events Space</li>
              </ul>
            </div>
            

            <p>
            My main responsibility was designing the website and other deliverables. I also aim to contribute ideas and insights as the project progresses.
            </p>
            
            <ImageCarousel images={hiveImages} singleImageMode={true} />
          </div>
        );
      case 'startup-wip':
        return (
          <div className="project-details" data-project="startup">
            <h1>Work In Progress: [*******].gg</h1>
            
            <p>
            In early 2025, I started working on a project that I plan to grow into a startup. It's currently in development, with React powering the frontend, Firebase on the backend and Figma for designing the interface. While I can't share too many details just yet, I'm aiming for a late 2025 launch - I'm excited!
            </p>
            
            <div className="project-landing-image">
              <img src={startupComingSoon} alt="Startup - Coming Soon" />
            </div>
          </div>
        );
      case 'how-i-found-a-vulnerability-in-a-$25m-company':
        return (
          <div className="project-details" data-project="vulnerability">
            <h1>How I Found a Vulnerability in a $25M Company</h1>
            
            <div className="vulnerability-content">
              <section>
                <h3>Notice</h3>
                <p>
                <i>This report outlines a vulnerability that was responsibly disclosed to the company over six months ago. Despite multiple follow-ups, no fix has been confirmed and no response has been provided. As a result, all sensitive company identifiers have been redacted to avoid misuse, while still documenting the issue for awareness and educational purposes.</i>
                </p>
              </section>
              
              <section>
                <h3>Overview</h3>
                <p>
                The site in question is a large e-commerce platform that sells digital downloads for over a decade, reportedly generating over $25 million in revenue. I found a flaw in the download system that could allow unauthorised users to access paid content freely, bypassing all forms of authentication and payment. <br></br><br></br>As a regular customer, I've built up a library of purchased products, all of which are accessible through a downloads page tied to my account. Each product has a button to download the files I've paid for  -  or at least, that's how it's supposed to work.
                </p>
                
                <h3>Initial Observations</h3>
                <p>
                On the product downloads page, I noticed that one of the download buttons was not functioning correctly. Using browser developer tools, I inspected the HTML behind the button and found the following element:
                </p>
                
                <CodeBlock 
                  language="html" 
                  code={`<a data-bucket="REDACTED" data-key="REDACTED.zip">
  <i aria-hidden="true"></i>DOWNLOAD
</a>`} 
                />

                <p>
                This revealed two key pieces of metadata:<br></br>
                <code>data-bucket</code> - Indicates the storage bucket or directory identifier<br></br>
                <code>data-key</code> - Represents the filename or object key stored in the cloud<br></br><br></br>
                In technical terms, these fields likely correspond to cloud object storage parameters (e.g. on Amazon S3 or a similar provider). While not immediately critical, exposing these values in client-side HTML without obfuscation or access control could aid a malicious actor in crafting unauthorised download requests.
                </p>
              </section>
              
              <section>
                <h3>Deeper Investigation: API Endpoint Discovery</h3>
                <p>
                Digging further into the browser's Network tab, I found that the page made a request to an API endpoint that resembled a serverless function hosted on AWS:
                </p>
                
                <CodeBlock 
                  language="python" 
                  code={`https://REDACTED.execute-api.us-east-1.amazonaws.com/
[REDACTED]-Secure-Download-Links-SecureLinkFunction-1NK5DFMCZRKM`} 
                />
                
                <p>
                The initial request was an OPTIONS request, part of a CORS preflight check. It confirmed that the endpoint accepted cross-origin POST requests from the website's domain:
                </p>

                <CodeBlock 
                  language="javascript" 
                  code={`access-control-allow-methods: POST
access-control-allow-origin: https://[REDACTED]`} 
                />

                <p>
                This type of endpoint, typically part of AWS API Gateway, serves as a publicly exposed API route that handles requests from the frontend to generate secure download links. 
                </p>
              </section>

              <section>
                <h3>Proof of Concept</h3>
                <p>
                Given the visible data-bucket and data-key, and the accessible API endpoint, I hypothesised that the backend was generating signed URLs - temporary links that allow secure access to files stored in cloud storage, without authenticating the request.                </p>
                <p>
                To test this, I created a simple Python script:
                </p>
                
                <CodeBlock 
                  language="python" 
                  code={`url = "https://REDACTED.execute-api.us-east-1.amazonaws.com/
      [REDACTED]-Secure-Download-Links-SecureLinkFunction-1NK5DFMCZRKM"

data = {
    "bucket": "REDACTED",
    "key": "REDACTED/REDACTED.zip"
}

response = requests.post(url, json=data)

if response.status_code == 200:
    signed_url = response.text
    print(f"Signed URL: {signed_url}")
else:
    print(f"Failed to get signed URL: {response.status_code}")`} 
                />
                
                <p>
                This script performs a POST request to the same endpoint used by the frontend, passing the bucket and key as JSON parameters. <b>The server responded with a valid signed URL, granting direct download access to the product.</b>                </p>
              </section>

              <section>
                <h3>Impact and Implications</h3>
                <p>
                The vulnerability stems from a lack of access control and user authentication on an endpoint responsible for generating secure download links. In practical terms:                </p>
                <li>
                Any user (authenticated or not) could send crafted requests to the API and receive valid signed download URLs.
                </li>
                <li>
                As file names follow a predictable pattern and convention, an attacker could write a script to enumerate and access a wide range of products.
                </li>
                <li>
                Products are most likely hosted on Amazon S3 or a similar object storage platform. Signed URLs are typically meant to protect such assets, but only if the process to generate them is securely gated.
                </li>
                
              </section>

              <section>
                <h3>Resolution and Disclosure</h3>
                <p>After confirming the impact, I documented the vulnerability in detail and reported it to the platform's security team. Following a lengthy response period and numerous follow-up emails, I received no reply and the vulnerability appears to still be active at the time of writing.<br></br><br></br>

Additionally, the company owns a partner brand that runs a nearly identical website. After brief testing, I confirmed that the exact same vulnerability exists there as well. This significantly increases the scope of the issue, as the same insecure architecture has been duplicated across multiple platforms.</p>
              </section>
            </div>
          </div>
        );
      case 'security-threats-&-cryptography-paper':
        return (
          <div className="project-details" data-project="research-paper">
            <h1>Security Threats & Cryptography Paper</h1>
            
            <p>
            While studying a module on IT System Security and Encryption in sixth form, I was given a fictional scenario and tasked with conducting in-depth research. This involved evaluating three real-world cybersecurity breach case studies and produced a <a href="/static/media/Jameel Ansari - IT Security Threats and Cryptography.874d48ebaa691494a3dc.pdf" target="_blank" rel="noopener noreferrer">20,000-word analytical paper</a>.
            </p>
            
            <div className="research-papers-container">
              <div className="research-paper-item">
                <a href={require('./assets/Jameel Ansari - IT Security Threats and Cryptography.pdf')} target="_blank" rel="noopener noreferrer" className="pdf-hover-link">
                  <img src={researchPaper1} alt="Security Research Paper Page 1" />
                  <div className="pdf-hover-overlay">
                    <span>View PDF</span>
                  </div>
                </a>
              </div>
              <div className="research-paper-item">
                <a href={require('./assets/Jameel Ansari - IT Security Threats and Cryptography.pdf')} target="_blank" rel="noopener noreferrer" className="pdf-hover-link">
                  <img src={researchPaper2} alt="Security Research Paper Page 2" />
                  <div className="pdf-hover-overlay">
                    <span>View PDF</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        );
      case 'photography-people-and-places':
        // photo array with ids
        const photoSources = [
          { id: 1, src: people5, alt: "Portrait Photography 1" },
          { id: 2, src: palestine1, alt: "Portrait Photography 2" },
          { id: 3, src: people4, alt: "Portrait Photography 3" },
          { id: 4, src: people3, alt: "Portrait Photography 4" },
          { id: 5, src: architecture1, alt: "Portrait Photography 5" },
          { id: 6, src: people2, alt: "Portrait Photography 6" },
          { id: 7, src: me, alt: "Portrait Photography 7" },
          { id: 8, src: palestine2, alt: "Portrait Photography 8" },
          { id: 9, src: architecture2, alt: "Portrait Photography 9" },
          { id: 10, src: market, alt: "Portrait Photography 10" },
          { id: 11, src: people7, alt: "Portrait Photography 11" },
          { id: 12, src: people6, alt: "Portrait Photography 12" },
        ];
        
        // split into 3 cols
        // col 1: people5, palestine1, market, people3
        // col 2: architecture1, people2, me, people4
        // col 3: palestine2, architecture2, people7, people6
        const columnPhotos = {
          column1: [
            photoSources.find(p => p.id === 1),
            photoSources.find(p => p.id === 2),
            photoSources.find(p => p.id === 10),
            photoSources.find(p => p.id === 4)
          ],
          column2: [
            photoSources.find(p => p.id === 5),
            photoSources.find(p => p.id === 6),
            photoSources.find(p => p.id === 7),
            photoSources.find(p => p.id === 3)
          ],
          column3: [
            photoSources.find(p => p.id === 8),
            photoSources.find(p => p.id === 9),
            photoSources.find(p => p.id === 11),
            photoSources.find(p => p.id === 12)
          ]
        };

        // flat array for mobile
        const allPhotos = [
          ...columnPhotos.column1,
          ...columnPhotos.column2,
          ...columnPhotos.column3
        ];
        
        const isMobile = window.innerWidth <= 768;
        
        return (
          <div className="project-details" data-project="photography-people-and-places">
            <div className="photo-grid-container">
              {isMobile ? (
                // mobile: single col
                <div className="photo-column">
                  {allPhotos.map((photo, index) => (
                    <div key={photo.id} className="photo-grid-item" style={{animationDelay: `${0.05 * (index + 1)}s`}}>
                      <img src={photo.src} alt={photo.alt} />
                    </div>
                  ))}
                </div>
              ) : (
                // desktop: 3 cols
                <>
                  {/* col 1 */}
                  <div className="photo-column">
                    {columnPhotos.column1.map(photo => (
                      <div key={photo.id} className="photo-grid-item">
                        <img src={photo.src} alt={photo.alt} />
                      </div>
                    ))}
                  </div>
                  
                  {/* col 2 */}
                  <div className="photo-column">
                    {columnPhotos.column2.map(photo => (
                      <div key={photo.id} className="photo-grid-item">
                        <img src={photo.src} alt={photo.alt} />
                      </div>
                    ))}
                  </div>
                  
                  {/* col 3 */}
                  <div className="photo-column">
                    {columnPhotos.column3.map(photo => (
                      <div key={photo.id} className="photo-grid-item">
                        <img src={photo.src} alt={photo.alt} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'photography-wildlife':
        const wildlifePhotoSources = [
          { id: 1, src: wildlife1, alt: "Wildlife Photography 1" },
          { id: 2, src: wildlife2, alt: "Wildlife Photography 2" },
          { id: 3, src: wildlife3, alt: "Wildlife Photography 3" },
          { id: 4, src: wildlife4, alt: "Wildlife Photography 4" },
          { id: 5, src: wildlife5, alt: "Wildlife Photography 5" },
          { id: 6, src: wildlife6, alt: "Wildlife Photography 6" }
        ];
        
        // to rearrange, just move them between columns
        const wildlifeColumnPhotos = {
          column1: [
            wildlifePhotoSources.find(p => p.id === 1),
            wildlifePhotoSources.find(p => p.id === 6)
          ],
          column2: [
            wildlifePhotoSources.find(p => p.id === 5),
            wildlifePhotoSources.find(p => p.id === 4)
          ],
          column3: [
            wildlifePhotoSources.find(p => p.id === 3),
            wildlifePhotoSources.find(p => p.id === 2)
          ]
        };
        
        const allWildlifePhotos = [
          ...wildlifeColumnPhotos.column1,
          ...wildlifeColumnPhotos.column2,
          ...wildlifeColumnPhotos.column3
        ];
        
        const isWildlifeMobile = window.innerWidth <= 768;
        
        return (
          <div className="project-details" data-project="photography-wildlife">
            <div className="photo-grid-container">
              {isWildlifeMobile ? (
                // mobile: single col
                <div className="photo-column">
                  {allWildlifePhotos.map((photo, index) => (
                    <div key={photo.id} className="photo-grid-item" style={{animationDelay: `${0.05 * (index + 1)}s`}}>
                      <img src={photo.src} alt={photo.alt} />
                    </div>
                  ))}
                </div>
              ) : (
                // desktop: 3 cols
                <>
                  {/* col 1 */}
                  <div className="photo-column">
                    {wildlifeColumnPhotos.column1.map(photo => (
                      <div key={photo.id} className="photo-grid-item">
                        <img src={photo.src} alt={photo.alt} />
                      </div>
                    ))}
                  </div>
                  
                  {/* col 2 */}
                  <div className="photo-column">
                    {wildlifeColumnPhotos.column2.map(photo => (
                      <div key={photo.id} className="photo-grid-item">
                        <img src={photo.src} alt={photo.alt} />
                      </div>
                    ))}
                  </div>
                  
                  {/* col 3 */}
                  <div className="photo-column">
                    {wildlifeColumnPhotos.column3.map(photo => (
                      <div key={photo.id} className="photo-grid-item">
                        <img src={photo.src} alt={photo.alt} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'photography-aab-collection':
        return <AabCollectionPage />;
      case 'how-i-produced-for-a-5-billion-stream-artist-duo':
        return (
          <div className="project-details" data-project="music-project">
            <h1>How I Produced for a 5-Billion-Stream Artist Duo</h1>
            
            <p>
            While I am deeply passionate about technology, I am also a music enthusiast. One of my recent achievements has been collaborating with D-Block Europe (DBE), a hip-hop artist duo who have amassed over 5 billion streams globally. Their most recent album <i>Rolling Stone</i> reached #1 in the UK's Top 100 and they have earned 6 Platinum and over 10 Gold singles to date.
            </p>

            <p>
            M Huncho, another prominent figure in the UK hip-hop scene, is a solo artist who has surpassed over 1 billion streams and consistently tops the charts.
            </p>

            <p>
              Here's a behind-the-scenes look at how I produced a track featuring both DBE and M Huncho, set to be released on the deluxe edition of M Huncho's <i>U2OPIA</i> album.
            </p>

            <div className="images-container">
              <div className="image-wrapper">
                <img src={dbeImage} alt="D-Block Europe" />
                <div className="image-caption">D-Block Europe</div>
              </div>
              <div className="image-wrapper">
                <img src={mhunchoImage} alt="M Huncho" />
                <div className="image-caption">M Huncho</div>
              </div>
            </div>

            <p>
            Many of the artists' tracks feature a melodic and dreamlike production style and I wanted to capture this feeling. I made a simple melody with a guitar, layered with vocal chops and a subtle pad, aiming to evoke that dreamy feeling while creating space for the artists.
            </p>
            
            <div className="audio-player-container">
              <audio ref={audioRef => audioRefs['loop-player'] = audioRef} src={loopAudio} className="music-player" preload="metadata">
                Your browser does not support the audio element.
              </audio>
              <div className="custom-audio-player">
                <div className="audio-title">Original Melody - Déjà Vu LDN (Me)</div>
                <div className="audio-controls">
                  <button className="play-pause-btn" onClick={() => togglePlay('loop-player')}>
                    {audioIsPlaying['loop-player'] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    )}
                  </button>
                  <div className="progress-container">
                    <div className="progress-bar-wrapper">
                      <div className="progress-bar" onClick={(e) => seekAudio(e, 'loop-player')}>
                        <div className="progress" style={{width: `${audioProgress['loop-player'] || 0}%`}}></div>
                      </div>
                    </div>
                    <span className="time-display">
                      {formatTime(audioCurrent['loop-player'] || 0)} / {formatTime(audioDuration['loop-player'] || 0)}
                    </span>
                    <div className="volume-control">
                      <div className="volume-icon" onClick={() => toggleMute('loop-player')}>
                        {audioIsMuted['loop-player'] ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 5C21.5 7.5 21.5 16.5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="volume-slider-container">
                        <div className="volume-slider" onClick={(e) => changeVolume(e, 'loop-player')}>
                          <div className="volume-level" style={{ height: `${audioVolume['loop-player'] || 70}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p>
            From there, I sent the melody arrangement to a producer I'm connected with who teamed up with another collaborator to add drums and percussion, curated to suit the artists' styles.            </p>
            
            <div className="audio-player-container">
              <audio ref={audioRef => audioRefs['beat-player'] = audioRef} src={beatAudio} className="music-player" preload="metadata">
                Your browser does not support the audio element.
              </audio>
              <div className="custom-audio-player">
                <div className="audio-title">Beat - Lonewolf x OrWot</div>
                <div className="audio-controls">
                  <button className="play-pause-btn" onClick={() => togglePlay('beat-player')}>
                    {audioIsPlaying['beat-player'] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    )}
                  </button>
                  <div className="progress-container">
                    <div className="progress-bar-wrapper">
                      <div className="progress-bar" onClick={(e) => seekAudio(e, 'beat-player')}>
                        <div className="progress" style={{width: `${audioProgress['beat-player'] || 0}%`}}></div>
                      </div>
                    </div>
                    <span className="time-display">
                      {formatTime(audioCurrent['beat-player'] || 0)} / {formatTime(audioDuration['beat-player'] || 0)}
                    </span>
                    <div className="volume-control">
                      <div className="volume-icon" onClick={() => toggleMute('beat-player')}>
                        {audioIsMuted['beat-player'] ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 5C21.5 7.5 21.5 16.5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="volume-slider-container">
                        <div className="volume-slider" onClick={(e) => changeVolume(e, 'beat-player')}>
                          <div className="volume-level" style={{ height: `${audioVolume['beat-player'] || 70}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p>
            The final beat arrangement was sent directly to D-Block Europe, who really liked it and recorded a verse over it. The demo was then shared with M Huncho, who went on to add his vocals as well.            </p>
            
            <div className="audio-player-container">
              <audio ref={audioRef => audioRefs['snippet-player'] = audioRef} src={snippetAudio} className="music-player" preload="metadata">
                Your browser does not support the audio element.
              </audio>
              <div className="custom-audio-player">
                <div className="audio-title">Demo Snippet - D-Block Europe x M Huncho</div>
                <div className="audio-controls">
                  <button className="play-pause-btn" onClick={() => togglePlay('snippet-player')}>
                    {audioIsPlaying['snippet-player'] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    )}
                  </button>
                  <div className="progress-container">
                    <div className="progress-bar-wrapper">
                      <div className="progress-bar" onClick={(e) => seekAudio(e, 'snippet-player')}>
                        <div className="progress" style={{width: `${audioProgress['snippet-player'] || 0}%`}}></div>
                      </div>
                    </div>
                    <span className="time-display">
                      {formatTime(audioCurrent['snippet-player'] || 0)} / {formatTime(audioDuration['snippet-player'] || 0)}
                    </span>
                    <div className="volume-control">
                      <div className="volume-icon" onClick={() => toggleMute('snippet-player')}>
                        {audioIsMuted['snippet-player'] ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 5C21.5 7.5 21.5 16.5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="volume-slider-container">
                        <div className="volume-slider" onClick={(e) => changeVolume(e, 'snippet-player')}>
                          <div className="volume-level" style={{ height: `${audioVolume['snippet-player'] || 70}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            

            
            <p>
            The demo above is just a rough draft, and a lot of work will go into making it release-ready.<br></br>M Huncho intends to include this track on the deluxe edition of his latest album <i>U2OPIA</i> but given the unpredictable nature of the music industry, there is no confirmed release date yet.
            </p>

            <p>
            That said, it looks promising as M Huncho even shared a snippet of the track on his <br></br>Instagram (see slide 2).
            </p>
            
            <div className="instagram-embed-container">
              <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DGln6g9I_sj/?utm_source=ig_embed&amp;utm_campaign=loading&amp;starting_slide=2" data-instgrm-version="14" style={{ background: '#FFF', border: '0', borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: '0', width: '99.375%', width: 'calc(100% - 2px)' }}>
                <div style={{ padding: '16px' }}>
                  <a href="https://www.instagram.com/p/DGln6g9I_sj/?utm_source=ig_embed&amp;utm_campaign=loading&amp;starting_slide=2" style={{ background: '#FFFFFF', lineHeight: '0', padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank" rel="noreferrer">
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: '0', height: '40px', marginRight: '14px', width: '40px' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', justifyContent: 'center' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: '0', height: '14px', marginBottom: '6px', width: '100px' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: '0', height: '14px', width: '60px' }}></div>
                      </div>
                    </div>
                    <div style={{ padding: '19% 0' }}></div>
                    <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                      <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                            <g>
                              <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: '550', lineHeight: '18px' }}>View this post on Instagram</div>
                    </div>
                    <div style={{ padding: '12.5% 0' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}>
                      <div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: '0', marginRight: '14px', marginLeft: '2px' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div>
                      </div>
                      <div style={{ marginLeft: '8px' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: '0', height: '20px', width: '20px' }}></div>
                        <div style={{ width: '0', height: '0', borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <div style={{ width: '0px', borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', flexGrow: '0', height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div>
                        <div style={{ width: '0', height: '0', borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', justifyContent: 'center', marginBottom: '24px' }}>
                      <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: '0', height: '14px', marginBottom: '6px', width: '224px' }}></div>
                      <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: '0', height: '14px', width: '144px' }}></div>
                    </div>
                  </a>
                  <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: '0', marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <a href="https://www.instagram.com/p/DGln6g9I_sj/?utm_source=ig_embed&amp;utm_campaign=loading&amp;starting_slide=2" style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank" rel="noreferrer">A post shared by HUNCHO SINATRA (@mhuncho)</a>
                  </p>
                </div>
              </blockquote>
              <script async src="//www.instagram.com/embed.js"></script>
            </div>
            
          </div>
        );
      case 'crochet-gary-the-snail':
        return (
          <div className="project-details" data-project="crochet">
            <h1>Crochet: Gary The Snail</h1>
            <p>
            One of my creative hobbies is crochet and since I'm a big fan of SpongeBob SquarePants, <br></br>I decided to make a crochet version of Gary The Snail - SpongeBob's pet.            
            </p>
            
            <div className="images-container">
              <div className="image-wrapper">
                <img src={crochetGary} alt="Crocheted Gary the Snail" />
              </div>
              <div className="image-wrapper">
                <img src={crochetYarn} alt="Yarn used for the project" />
              </div>
            </div>
          </div>
        );
      case 'crochet-penguin':
        return (
          <div className="project-details" data-project="crochet">
            <h1>Crochet: Penguin</h1>
            <p>
            A birthday gift for my friend who likes The Penguins of Madagascar.
            </p>
            
            <div className="images-container" style={{ justifyContent: 'center' }}>
              <div className="image-wrapper">
                <img src={crochetPenguin} alt="Crocheted Penguin" />
              </div>
            </div>
          </div>
        );
      case 'crochet-mushrooms':
        return (
          <div className="project-details" data-project="crochet">
            <h1>Crochet: Mushrooms</h1>
            <p>
            Gifts for my friends - they're perfect as keyrings!
            </p>
            
            <div className="images-container" style={{ justifyContent: 'center' }}>
              <div className="image-wrapper">
                <img src={crochetMushrooms} alt="Crocheted Mushrooms" />
              </div>
            </div>
          </div>
        );
      case 'how-i-produced-for-zion-foster':
        return (
          <div className="project-details" data-project="music-project">
            <h1>How I Produced for Zion Foster</h1>
            
            <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', marginBottom: '30px' }}>
              <div style={{ flex: '1', minWidth: '0' }}>
                <p>
                In October 2024, a producer reached out with the opportunity to work with UK-based artist Zion Foster. Known for being engaged to Jesy Nelson, a member of the girl group Little Mix, Zion is also a successful music artist - amassing over 250 million streams to date.
                </p>

                <p>
                Here's how I co-produced a song featuring Zion Foster!
                </p>
              </div>

              <div style={{ width: '300px', flexShrink: '0' }}>
                <img src={zionFosterCover} alt="Zion Foster" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div className="image-caption">Zion Foster</div>
              </div>
            </div>
            
            <p>
            Many of his songs have a heartfelt R&B-feel to them so I began by laying down a simple piano melody. From here, I added a simple pad for some texture. Finally, I laid down some vocals which I pitched down and then added distortion effects to produce a melancholic sample.
            </p>

            <div className="audio-player-container">
              <audio ref={audioRef => audioRefs['zion-loop-player'] = audioRef} src={zionFosterAudio} className="music-player" preload="metadata">
                Your browser does not support the audio element.
              </audio>
              <div className="custom-audio-player">
                <div className="audio-title">Original Melody - Déjà Vu LDN (Me)</div>
                <div className="audio-controls">
                  <button className="play-pause-btn" onClick={() => togglePlay('zion-loop-player')}>
                    {audioIsPlaying['zion-loop-player'] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    )}
                  </button>
                  <div className="progress-container">
                    <div className="progress-bar-wrapper">
                      <div className="progress-bar" onClick={(e) => seekAudio(e, 'zion-loop-player')}>
                        <div className="progress" style={{width: `${audioProgress['zion-loop-player'] || 0}%`}}></div>
                      </div>
                    </div>
                    <span className="time-display">
                      {formatTime(audioCurrent['zion-loop-player'] || 0)} / {formatTime(audioDuration['zion-loop-player'] || 0)}
                    </span>
                    <div className="volume-control">
                      <div className="volume-icon" onClick={() => toggleMute('zion-loop-player')}>
                        {audioIsMuted['zion-loop-player'] ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 5C21.5 7.5 21.5 16.5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="volume-slider-container">
                        <div className="volume-slider" onClick={(e) => changeVolume(e, 'zion-loop-player')}>
                          <div className="volume-level" style={{ height: `${audioVolume['zion-loop-player'] || 70}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p>
            I shared this melody with the other producer and he completed the composition by pitching up the sample and adding drums.
            </p>

            <p>
            We worked on a pack of instrumentals and sent a few to Zion Foster. He liked this one in particular and recorded a full song with it. Below is a short snippet of the unreleased demo!
            </p>

            <div className="audio-player-container">
              <audio ref={audioRef => audioRefs['zion-loop-player-2'] = audioRef} src={zionFosterSnippet} className="music-player" preload="metadata">
                Your browser does not support the audio element.
              </audio>
              <div className="custom-audio-player">
                <div className="audio-title">Zion Foster - Unreleased Snippet</div>
                <div className="audio-controls">
                  <button className="play-pause-btn" onClick={() => togglePlay('zion-loop-player-2')}>
                    {audioIsPlaying['zion-loop-player-2'] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    )}
                  </button>
                  <div className="progress-container">
                    <div className="progress-bar-wrapper">
                      <div className="progress-bar" onClick={(e) => seekAudio(e, 'zion-loop-player-2')}>
                        <div className="progress" style={{width: `${audioProgress['zion-loop-player-2'] || 0}%`}}></div>
                      </div>
                    </div>
                    <span className="time-display">
                      {formatTime(audioCurrent['zion-loop-player-2'] || 0)} / {formatTime(audioDuration['zion-loop-player-2'] || 0)}
                    </span>
                    <div className="volume-control">
                      <div className="volume-icon" onClick={() => toggleMute('zion-loop-player-2')}>
                        {audioIsMuted['zion-loop-player-2'] ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 5C21.5 7.5 21.5 16.5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="volume-slider-container">
                        <div className="volume-slider" onClick={(e) => changeVolume(e, 'zion-loop-player-2')}>
                          <div className="volume-level" style={{ height: `${audioVolume['zion-loop-player-2'] || 70}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'how-i-produced-for-a-top-100-artist':
        return (
          <div className="project-details" data-project="music-project">
            <h1>How I Produced for a Top 100 Artist</h1>
            
            <p>
            Trapboy Freddy is an independent hip-hop artist that has collaborated with many prominent figures in the music industry such as 2 Chainz, T.I., Jacquees, Rich The Kid, Young Thug and more. He's most known for his feature on the record "That's On Me" which charted to #56 in the US Top 100 in 2018 and continues to make music today.
            </p>

            <p>
            Here's how I co-produced a song for Trapboy Freddy (by a stroke of luck!)
            </p>

            <div style={{ marginBottom: '30px' }}>
              <img src={trapboyFreddyCover} alt="Trapboy Freddy" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div className="image-caption">Trapboy Freddy</div>
            </div>
            
            <p>
            I usually create melodies and compositions in batch, curating them to fit a particular artist. This time round, I created a melody that wasn't actually particular to any artist - a gentle guitar layered with some bells and a vocal sample.
            </p>

            <div className="audio-player-container">
              <audio ref={audioRef => audioRefs['trapboy-loop-player'] = audioRef} src={trapboyFreddyAudio} className="music-player" preload="metadata">
                Your browser does not support the audio element.
              </audio>
              <div className="custom-audio-player">
                <div className="audio-title">Deep Blue - 140bpm Eb Major - @dejavu.ldn</div>
                <div className="audio-controls">
                  <button className="play-pause-btn" onClick={() => togglePlay('trapboy-loop-player')}>
                    {audioIsPlaying['trapboy-loop-player'] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    )}
                  </button>
                  <div className="progress-container">
                    <div className="progress-bar-wrapper">
                      <div className="progress-bar" onClick={(e) => seekAudio(e, 'trapboy-loop-player')}>
                        <div className="progress" style={{width: `${audioProgress['trapboy-loop-player'] || 0}%`}}></div>
                      </div>
                    </div>
                    <span className="time-display">
                      {formatTime(audioCurrent['trapboy-loop-player'] || 0)} / {formatTime(audioDuration['trapboy-loop-player'] || 0)}
                    </span>
                    <div className="volume-control">
                      <div className="volume-icon" onClick={() => toggleMute('trapboy-loop-player')}>
                        {audioIsMuted['trapboy-loop-player'] ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
                            <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 5C21.5 7.5 21.5 16.5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="volume-slider-container">
                        <div className="volume-slider" onClick={(e) => changeVolume(e, 'trapboy-loop-player')}>
                          <div className="volume-level" style={{ height: `${audioVolume['trapboy-loop-player'] || 70}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p>
            I uploaded this melody to some public audio sharing platforms where producers frequently visited. Over a year later, I received an email out of the blue letting me know that the melody was used by two other producers and Trapboy Freddy had made a song with it.
            </p>
            <p>
            The record was released on 1st August as part of his 2025 album "Freddy B".
            </p>
            
            <div style={{ marginTop: '30px' }}>
              <iframe data-testid="embed-iframe" style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/track/1vpEKP9f98SU9BUA6KQOR4?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
          </div>
        );
      default:
        // handle old numeric ids
        const numericId = parseInt(projectId, 10);
        if (!isNaN(numericId)) {
          switch(numericId) {
            case 1:
              window.location.href = '/project/smartwaste';
              return <div>Redirecting...</div>;
            case 2:
              window.location.href = '/project/healthcare';
              return <div>Redirecting...</div>;
            case 3:
              window.location.href = '/project/mindovertech';
              return <div>Redirecting...</div>;
            case 4:
              window.location.href = '/project/hive';
              return <div>Redirecting...</div>;
            case 5:
              window.location.href = '/project/how-i-found-a-vulnerability-in-a-$25m-company';
              return <div>Redirecting...</div>;
            case 6:
              window.location.href = '/project/startup-wip';
              return <div>Redirecting...</div>;
            case 7:
              window.location.href = '/project/security-threats-&-cryptography-paper';
              return <div>Redirecting...</div>;
            case 8:
              window.location.href = '/project/photography-people-and-places';
              return <div>Redirecting...</div>;
            case 9:
              window.location.href = '/project/how-i-produced-for-a-5-billion-stream-artist-duo';
              return <div>Redirecting...</div>;
            case 10:
              window.location.href = '/project/crochet-gary-the-snail';
              return <div>Redirecting...</div>;
            default:
              break;
          }
        }
        
        return (
          <div>
            <h1>Project Details - ID: {projectId}</h1>
            <p>This is a placeholder for project details.</p>
          </div>
        );
    }
  };
  
  return (
    <>
      <div className="main-grid">
        <Header initialLoad={false} />
        <div className="project-page">
          {renderProjectContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};


// fade in with drop
const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

// stagger children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};


// detect safari
const isSafari = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1 && ua.indexOf('android') === -1;
};


function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  // prevent duplicate animations
  const animationTimeoutRef = useRef(null);
  const mountedRef = useRef(false);
  
  // audio state
  const [audioRefs, setAudioRefs] = useState({});
  const [audioIsPlaying, setAudioIsPlaying] = useState({});
  const [audioProgress, setAudioProgress] = useState({});
  const [audioCurrent, setAudioCurrent] = useState({});
  const [audioDuration, setAudioDuration] = useState({});
  const [audioIsMuted, setAudioIsMuted] = useState({});
  const [audioVolume, setAudioVolume] = useState({});

  // track audio progress
  useEffect(() => {
    const timeUpdateHandlers = {};
    const metadataHandlers = {};
    const endedHandlers = {};
    
    Object.keys(audioRefs).forEach(key => {
      if (audioRefs[key]) {
        // handlers with error handling
        timeUpdateHandlers[key] = () => {
          try {
            if (!audioRefs[key]) return;
            
            const duration = audioRefs[key].duration;
            const currentTime = audioRefs[key].currentTime;
            const progress = (currentTime / duration) * 100;
            
            setAudioProgress(prev => ({
              ...prev,
              [key]: progress
            }));
            
            setAudioCurrent(prev => ({
              ...prev,
              [key]: currentTime
            }));
          } catch (error) {
            console.log("Handling timeupdate error gracefully", error);
          }
        };
        
        metadataHandlers[key] = () => {
          try {
            if (!audioRefs[key]) return;
            
            setAudioDuration(prev => ({
              ...prev,
              [key]: audioRefs[key].duration
            }));
          } catch (error) {
            console.log("Handling metadata error gracefully", error);
          }
        };
        
        endedHandlers[key] = () => {
          try {
            setAudioIsPlaying(prev => ({
              ...prev,
              [key]: false
            }));
          } catch (error) {
            console.log("Handling ended error gracefully", error);
          }
        };
        
        // attach listeners
        audioRefs[key].addEventListener('timeupdate', timeUpdateHandlers[key]);
        audioRefs[key].addEventListener('loadedmetadata', metadataHandlers[key]);
        audioRefs[key].addEventListener('ended', endedHandlers[key]);
        
        // initialize volume
        if (!audioVolume[key]) {
          setAudioVolume(prev => ({
            ...prev,
            [key]: 70
          }));
          try {
            audioRefs[key].volume = 0.7;
          } catch (error) {
            console.log("Handling volume error gracefully", error);
          }
        }
      }
    });
    
    return () => {
      // cleanup
      Object.keys(audioRefs).forEach(key => {
        if (audioRefs[key]) {
          try {
            audioRefs[key].removeEventListener('timeupdate', timeUpdateHandlers[key]);
            audioRefs[key].removeEventListener('loadedmetadata', metadataHandlers[key]);
            audioRefs[key].removeEventListener('ended', endedHandlers[key]);
          } catch (error) {
            console.log("Cleanup error handled gracefully", error);
          }
        }
      });
    };
  }, [audioRefs, audioVolume, setAudioIsPlaying]);

  // toggle audio
  const togglePlay = (playerId) => {
    try {
      if (!audioRefs[playerId]) return;
      
      // pause all other players
      Object.keys(audioRefs).forEach(key => {
        try {
          if (key !== playerId && audioRefs[key] && !audioRefs[key].paused) {
            audioRefs[key].pause();
            setAudioIsPlaying(prev => ({
              ...prev,
              [key]: false
            }));
          }
        } catch (error) {
          console.log("Error handling other players:", error);
        }
      });
      
      if (audioRefs[playerId].paused) {
        audioRefs[playerId].play()
          .then(() => {
            setAudioIsPlaying(prev => ({
              ...prev,
              [playerId]: true
            }));
          })
          .catch(error => {
            console.log("Error playing audio:", error);
          });
      } else {
        audioRefs[playerId].pause();
        setAudioIsPlaying(prev => ({
          ...prev,
          [playerId]: false
        }));
      }
    } catch (error) {
      console.log("Toggle play error:", error);
    }
  };

  // seek audio
  const seekAudio = (e, playerId) => {
    try {
      if (!audioRefs[playerId]) return;
      
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
      
      audioRefs[playerId].currentTime = clickPosition * audioRefs[playerId].duration;
    } catch (error) {
      console.log("Seek audio error:", error);
    }
  };

  // toggle mute
  const toggleMute = (playerId) => {
    try {
      if (!audioRefs[playerId]) return;
      
      audioRefs[playerId].muted = !audioRefs[playerId].muted;
      
      setAudioIsMuted(prev => ({
        ...prev,
        [playerId]: audioRefs[playerId].muted
      }));
    } catch (error) {
      console.log("Toggle mute error:", error);
    }
  };

  // change volume
  const changeVolume = (e, playerId) => {
    try {
      if (!audioRefs[playerId]) return;
      
      const volumeBar = e.currentTarget;
      const rect = volumeBar.getBoundingClientRect();
      const volumeBarHeight = rect.height;
      const clickPosition = volumeBarHeight - (e.clientY - rect.top);
      const newVolume = Math.max(0, Math.min(1, clickPosition / volumeBarHeight));
      
      audioRefs[playerId].volume = newVolume;
      
      setAudioVolume(prev => ({
        ...prev,
        [playerId]: newVolume * 100
      }));
    } catch (error) {
      console.log("Change volume error:", error);
    }
  };

  // format to mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // reset animation state
  const resetAnimationState = () => {
    localStorage.removeItem('initialAnimationComplete');
    setInitialAnimationComplete(false);
    mountedRef.current = false;
  };

  // reset filter
  const resetFilter = () => {
    setActiveFilter('All');
  };

  useEffect(() => {
    // check localStorage for animation state
    const hasAnimationRun = localStorage.getItem('initialAnimationComplete') === 'true';
    
    // already ran - skip it
    if (hasAnimationRun) {
      setInitialAnimationComplete(true);
      mountedRef.current = true;
      return;
    }
    
    // first mount only
    if (!mountedRef.current) {
      mountedRef.current = true;
      
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      
      // mark done after animation time
      animationTimeoutRef.current = setTimeout(() => {
        setInitialAnimationComplete(true);
        // save to localStorage
        localStorage.setItem('initialAnimationComplete', 'true');
      }, 1800);
    }
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleFilterChange = (filter) => {
    console.log('Filter changed to:', filter);
    setActiveFilter(filter);
  };

  // filter ctx
  const filterContextValue = {
    activeFilter,
    setActiveFilter,
    resetFilter
  };
  
  // audio ctx
  const audioContextValue = {
    audioRefs,
    audioIsPlaying,
    audioProgress,
    audioCurrent,
    audioDuration,
    audioIsMuted,
    audioVolume,
    setAudioIsPlaying,
    togglePlay,
    seekAudio,
    toggleMute,
    changeVolume,
    formatTime
  };

  return (
    <FilterContext.Provider value={filterContextValue}>
      <AudioContext.Provider value={audioContextValue}>
        <Router basename="/">
          <div className="app-container">
            <Routes>
              <Route path="/" element={
                <>
                  <div className="main-grid" id="home-page">
                    <Header initialLoad={!initialAnimationComplete} />
                    
                    {!initialAnimationComplete ? (
                      // animated - first load
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                      >
                        <motion.div variants={fadeIn}>
                          <Hero />
                        </motion.div>
                        
                        <motion.div variants={fadeIn}>
                          <ProjectFilter 
                            selected={activeFilter} 
                            onFilterChange={handleFilterChange} 
                          />
                        </motion.div>
                        
                        <motion.div className="main-content">
                          <ProjectGrid activeFilter={activeFilter} />
                        </motion.div>
                      </motion.div>
                    ) : (
                      // no animation after first visit
                      <div>
                        <Hero />
                        
                        <ProjectFilter 
                          selected={activeFilter} 
                          onFilterChange={handleFilterChange} 
                        />
                        
                        <div className="main-content">
                          <ProjectGrid activeFilter={activeFilter} />
                        </div>
                      </div>
                    )}
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/about" element={
                <>
                  <div className="main-grid about-grid">
                    <Header initialLoad={false} />
                    <About />
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <div className="main-grid">
                    <Header initialLoad={false} />
                    <Contact />
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/project/:projectId" element={<ProjectPage />} />
            </Routes>
            <Sidebar />
          </div>
        </Router>
      </AudioContext.Provider>
    </FilterContext.Provider>
  );
}

export default App;
