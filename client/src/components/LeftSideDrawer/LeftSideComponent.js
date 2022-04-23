import styled from "styled-components";

export const LeftSideDrawerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .linebreak {
      height: 1px;
      width: 100%;
      
      background: gray;
      margin:10px;
  }
  `;


  export const DrawerContent = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: flex-start;
    width: 100%;
    background: ${({bg="none"}) => bg};
    
    border-radius:10px;
    cursor:pointer;
    transition: all .3s ease;
    
    & img {
      width:45px;
      height: 45px;
      font-size: 20px;
      border-radius: 50%;
      color: white;
      margin: 10px;
    }
    &:hover {
      background:black;
      color:white;
    }

    &:hover > a {
      color:white;
    }
    & > i {
      width:25px;
      font-size: 20px;
      border-radius: 50%;
      background: ${({ibg}) => ibg};
      color: ${({ic}) => ic};
      padding: 10px;
      margin: 10px;
    }
  `;