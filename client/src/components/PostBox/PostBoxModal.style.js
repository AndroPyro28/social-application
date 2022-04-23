import styled from "styled-components";

export const PostBoxModalBackdrop = styled.div`
  background: rgba(0, 0, 0, 0.507); 
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1111;
  top: 0;
  left: 0;

  & .closeBtn {
    cursor: pointer;
    color: #EAEAEA;
    padding: 10px;
    font-size: 30px;
    position: absolute;
    top: 3px;
    right: 3px;
    transition: all 0.3s ease;
    z-index: 5;
  }
  & .closeBtn:hover {
    color: gray;
  }
`;

export const PostBoxModalBox = styled.div`
  font-family: "poppins", sans-serif;
  width: 35rem;
  height: fit-content;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 10px 5px;
  overflow: hidden;
  border-radius: 20px;

  & textarea {
    resize: none;
    height: 5rem;
    width: 97%;
    outline: none;
    border: none;
    padding: 10px;
    font-size: 15px;
    font-family: "poppins", sans-serif;
  }

  & button {
    width: 97%;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    border: none;
    background: rgb(57, 130, 228);
    color: white;
    font-size: 100%;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
    background: black;
    color: white;
  }
  }
  & button:disabled {
    background: gray;
    cursor: not-allowed;
  }

  @media (max-width: 610px) {
    width: 90%;
  }
`;

export const DataContainer = styled.div`
  max-height: 200px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  overflow-x: auto;
  overflow-y: hidden;
  & img {
    margin: 5px;
    flex: 1;
    object-fit: contain !important;
    border-radius: 20px;
    height: 200px;
    cursor: pointer;
  }

  & video {
    margin: 5px;
    cursor: pointer;
    flex: 1;
    object-fit: contain !important;
    max-width: 95%;
    border-radius: 20px;
    height: 200px;
  }
`;

export const PostBoxBanner = styled.div`
  height: 50px;
  border: none;
  border-bottom: solid 1px gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PostBoxOptions = styled.div`
  border: solid 1px gray;
  height: 50px;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 20px;
  position: relative;
  transition: all .3s ease-in-out;
  
  &:hover {
    background: #EAEAEA;
  }

  & input {
    flex: 1;
    cursor: pointer;
    height: 100%;
    width: 100%;
    opacity: 0;
    &:disabled {
    cursor: not-allowed !important;
  }
  }

  & h5 {
    position: absolute;
    top: -5px;
    left: 0px;
    right: 0px;
    bottom: 50px;
    margin: auto;
    cursor: pointer;
    font-size: 40px;
    flex: 1;
    color: lightblue;
    &:disabled {
    cursor: not-allowed !important;
  }
  }

  &:hover > img {
    display: block;
    transition: all 0.3s ease;
  }

  &:hover > video {
    display: block;
    transition: all 0.3s ease;
  }

  &:disabled {
    cursor: not-allowed !important;
  }
`;
