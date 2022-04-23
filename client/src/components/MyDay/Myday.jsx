import React from "react";
import styled from "styled-components";
import { UserMydayContent } from "./UserMyDayContent";

function Myday() {
  const StyledMyDayContainer = styled.div`
    height: 13rem;
    border-radius: 20px;
    max-width:550px;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    align-self: center;
    @media (max-width: 610px) {
        & {
            width:95% !important;
        }
    }
  `;
  return (
    <StyledMyDayContainer>
      <UserMydayContent>
        <span>Andro Eugenio</span>
        <img src="/images/nicePicture.jpg" />
      </UserMydayContent>

      <UserMydayContent>
        <span>Andro Eugenio</span>
        <img src="/images/equalrights.jpg" />
      </UserMydayContent>

      <UserMydayContent>
        <span>Andro Eugenio</span>
        <img src="/images/istockphoto-1331964973-170667a.jpg" />
      </UserMydayContent>

      <UserMydayContent>
        <span>Andro Eugenio</span>
        <img src="/images/Yoriichi_in_Muzan's_memories.png" />
      </UserMydayContent>

      <UserMydayContent>
        <span>Andro Eugenio</span>
        <img src="/images/undraw_mobile_encryption_cl5q.png" />
      </UserMydayContent>

      
    </StyledMyDayContainer>
  );
}

export default Myday;
