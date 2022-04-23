import styled from "styled-components";
import React from 'react'
import HashLoader from 'react-spinners/HashLoader';

 const Loading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    
`;

const Backdrop = styled.div`
 background: rgba(0, 0, 0, 0.507); 
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1111;
  top: 0;
  left: 0;`

function LoadingComp() {
  return (
    <Backdrop>
      <Loading>
        <HashLoader color={"#36D7B7"} size={60} />
      </Loading>
    </Backdrop>
    
  )
}

export default LoadingComp