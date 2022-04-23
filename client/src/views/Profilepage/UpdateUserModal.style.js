import styled from "styled-components";

export const UpdateUserModalBackdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.507);
  position: fixed;
  z-index: 111;
  top: 0;
  left: 0;
  
  & i {
    position:absolute;
    top: 10px;
    right:10px;
    cursor:pointer;
    color:white;
    font-size: 25px;
    transition: all .3s ease;
    &:hover{
      color:gray;
    }
  }
`;

export const UpdateUserModalBox = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  background: white;
  margin: auto;
  width: 35vw;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 20px 15px 5px 15px;

  & h2 {
      font-size: 130%;
      text-align: center;
  }

  @keyframes animateImg {
    0% { 
      opacity:0;
    }
    100% { 
      opacity:2;
    }
  }

  & img {
    width: 45%;
    margin: 20px auto;
    height: 12rem;
    border: solid 2px black;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    object-fit: cover;
    animation: animateImg 500ms ease-in;
    &:hover {
      border: solid 2px gray;
    }

    @media (max-width: 900px) {
    & {
      width: 60%;
    }
  }

  @media (max-width: 800px) {
    & {
      width: 65%;
    }
  }

  @media (max-width: 600px) {
    & {
      width: 70%;
    }
  }

  @media (max-width: 500px) {
    & {
      width: 75%;
    }
  }
}

& .input__box {
  position: relative;
  width: 60%;
  height: 50px;
  background: #EAEAEA;
  border-radius: 10px;
  transition: all .3s ease-in-out;

  &:hover {
    background: lightgray;
  }

  & h5 {
    position: absolute;
    top: 0px;
    right: 0px;
    width: fit-content;
    font-size: 20px;
    left: 0px;
    bottom: 0px;
    margin:auto;

    & i {
      color: gray;
    }
  }

  & input {
    opacity: 0;
    background: #eaeaea;
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s ease;
    width: 100%;
    height: 100%;
  }
}
  
  & button{
    font-size: 100%;
    border: none;
    padding: 10px 20px;
    margin: 20px;
    width: 75%;
    color: white;
    background-color: lightskyblue;
    border-radius: 10px;
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
      background: black;
    }

    &:disabled {
      background: gray;
      cursor: default;
    }
  }

  @media (max-width: 900px) {
    & {
      width: 40vw;
    }
  }

  @media (max-width: 800px) {
    & {
      width: 50vw;
    }
  }

  @media (max-width: 600px) {
    & {
      width: 60vw;
    }
  }

  @media (max-width: 500px) {
    & {
      width: 80vw;
    }
  }
`;
