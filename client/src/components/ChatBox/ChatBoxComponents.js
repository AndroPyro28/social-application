import styled from "styled-components";

export const ChatBoxContainer = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 450px;
  width: 350px;
  position: fixed;
  bottom: 0px;
  right: 30px;
  background: black;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  overflow: hidden;
  border: solid 1px gray;

  & data {
    background: #EAEAEA;
    padding-left: 20px;
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 600;
    .pre-sendData {
      width: 50px;
      height: 50px;
      border: solid 2px gray;
      margin-right: 20px;
    }

    .pdfIcon {
      font-size: 50px;
      margin-right: 20px;
      color: red;
    }

    .deleteData {
      color: white;
      background-color: red;
      border-radius: 50%;
      padding: 1px 4px 1px 4px;
      cursor: pointer;
      position: absolute;
      right: 5px !important;
      top: 18px;
      transition: all .3s ease-in-out;
      &:hover {
        background: maroon;
      }
    }
  }
`;

export const ChatBoxHeader = styled.div`
  background: rgb(14,47,90);
  flex: 1.5;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  &:hover {
    background: lightblue;
    color: white !important;
  }
  & img {
    margin: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  & span {
    color: white !important;
    font-weight: 700;
  }
  & .videoCall {
    position: absolute;
    right: 50px;
    padding: 10px;
    color: red;
    border-radius: 50%;
    cursor: pointer;

    :hover {
      color: blue;
    }
  }

  & .close {
    position: absolute;
    right: 10px;
    color: white;
    border-radius: 50%;
    font-size: 25px;
    cursor: pointer;
    padding: 10px;

    :hover {
      color: red;
    }
  }
`;
export const ChatBoxBody = styled.div`
  background: white;
  flex: 10;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 5px;

  

  & .message__container {
    display: flex;
    align-items: center;
    position: relative;
    & div {
      position: absolute;
      left: 60px;
      top: -8px;
      font-size: 13px;
      font-weight: 600;
      max-width: 50px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  & .profileImageByOthers {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  & span {
    padding: 10px 20px;
    font-size: 13px;
    background: gray;
    margin: 13px;
    border-radius: 20px;
    color: #eaeaea;
    max-width: fit-content;
    min-width: 20px;
    position: relative;
    a {
      color: white;
      text-decoration: underline;
    }

    i.red {
      color:red;
    }
    & p {
      margin: 2px;
    }
    & img, & video {
      cursor: pointer;
      width: 200px;
      height: 250px;
      object-fit: cover;
      border-radius: 10px;
      margin-top: 10px;
    }
  }

  & .you {
    background: rgb(14,47,90);
    align-self: flex-end !important;
    text-align: start;
    border-bottom-right-radius: 0px;

    & p {
      text-align: end;
    }
    & label {
      position: absolute;
      color: dimgrey;
      min-width: 65px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px !important;
      right: 0px;
      bottom: -18px;
    }
  }

  & .other {
    align-self: flex-start;
    background: rgb(56,42,250);

    & p {
      text-align: start;
    }
    & label {
      position: absolute;
      color: dimgrey;
      min-width: 65px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px !important;
      left: 0px;
      bottom: -18px;
    }
  }
`;

export const ChatBoxInputs = styled.div`
  background: lightgray;
  flex: 1;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
  position: relative;
  & input {
    height: 85%;
    width: 100%;
    font-size: 15px;
    border-radius: 15px;
    border: none;
    outline: none;
    padding-left: 10px;
  }

  & div {
    position: relative;
    width: fit-content;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
    background: #eaeaea !important;
    }
  }

  & .fileSender {
    position: absolute;
    width: 100%;
    height: 100%;
    left: -10px;
    bottom: -105px;
    cursor: pointer;
    padding: 110px 4px 0px 0px; 
    opacity: 0;
  }

  & .notEmpty {
    color: red !important;
  }

  & .empty {
    color: #0077b6 !important;
  }
  
  & i {
    cursor: pointer;
    font-size: 25px;
    padding: 10px;
    color: #0077b6;
    border-radius: 50%;
    &:hover {
      background: #eaeaea;
    }
  }
`;
