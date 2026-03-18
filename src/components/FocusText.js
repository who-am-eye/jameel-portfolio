import React from 'react';
import styled from 'styled-components';


const FocusContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-left: 40px;
  margin-top: 24px;
`;

const FocusTextStyled = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-style: italic;
  color: #222;
  text-align: right;
  line-height: 1.2;
  span {
    font-style: normal;
    font-weight: 400;
  }
`;


const FocusText = () => (
  <FocusContainer>
    <FocusTextStyled>
      Focus on how it <span>feels</span> also how it <span>looks</span>
    </FocusTextStyled>
  </FocusContainer>
);

export default FocusText;
