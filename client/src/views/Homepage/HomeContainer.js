import styled from "styled-components";

export const HomeContainer = styled.div`
    display: flex;
    height: 100%;
    overflow-x: hidden;
    margin-top: 70px;
    justify-content: center;
    width:100%;
    background: rgb(228,235,241);

    @media (max-width: 1024px) {
      & > :is(.left, .right){
        display: none;
      }
      /* & .mid {
        width: 50% !important;
      }

      & .mid > div {
        width: 100%;
      } */
    }
  `;