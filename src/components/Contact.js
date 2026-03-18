import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CONTACT_PADDING = '100px';

const ContactContainer = styled.div`
  margin-top: 56px;
  text-align: left;
  
  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const ContactHeader = styled.h1`
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 72px;
  font-weight: 500;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.01em;
  color: #171819;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
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
  margin-bottom: 60px;
  color: #BDBDBD;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 40px;
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 80px;
  
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  display: block;
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #171819;
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 6px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  background: #fafbfc;
  border-radius: 0;
  transition: border-color 0.3s, background-color 0.3s;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #171819;
    background: #fff;
  }
  
  @media (max-width: 768px) {
    font-size: 15px;
    padding: 10px 14px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  background: #fafbfc;
  border-radius: 0;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s, background-color 0.3s;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #171819;
    background: #fff;
  }
  
  @media (max-width: 768px) {
    font-size: 15px;
    padding: 10px 14px;
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #171819;
  color: white;
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    font-size: 15px;
    padding: 10px 20px;
  }
`;

const SuccessMessage = styled.div`
  padding: 16px;
  background-color: rgba(75, 181, 67, 0.1);
  border: 1px solid rgba(75, 181, 67, 0.5);
  color: #4BB543;
  margin-bottom: 24px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background-color: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.5);
  color: #dc3545;
  margin-bottom: 24px;
  font-family: 'Space Grotesk', Arial, sans-serif;
  
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('subject', formData.subject);
      data.append('message', formData.message);
      data.append('recipient', 'jameelansari1010000@gmail.com'); // recipient
      
      // using formsubmit - free email forwarding, no backend needed
      const response = await fetch('https://formsubmit.co/jameelansari1010000@gmail.com', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // clear after a bit
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        throw new Error('Failed to send message. Please try again later.');
      }
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <ContactContainer>
      <ContactHeader>Contact</ContactHeader>
      <Subtitle>Get in touch</Subtitle>
      
      <FormContainer>
        {success && (
          <SuccessMessage>Your message has been sent successfully!</SuccessMessage>
        )}
        
        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        
        <form onSubmit={handleSubmit} action="https://formsubmit.co/jameelansari1010000@gmail.com" method="POST">
          {/* formsubmit config fields */}
          <input type="hidden" name="_subject" value="New contact form submission" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={window.location.href} />
          
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
          </SubmitButton>
        </form>
      </FormContainer>
    </ContactContainer>
  );
};

export default Contact;
