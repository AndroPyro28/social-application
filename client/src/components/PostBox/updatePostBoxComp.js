import styled from "styled-components";

export const UpdatePostBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
  width: 35rem;
  height: fit-content;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  padding: 10px 5px;

  @media(max-width: 576px) {
    width: 90%;
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

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }

    
}
`;

export const UpdateHeaderContainer = styled.div`
  border-bottom: solid 1px gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const UpdateBodyContainer = styled.div`
    width: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  & textarea {
    height: 5rem;
    border: none;
    width: 95%;
    outline: none;
    font-size: 15px;
    resize: none;
    font-family: "poppins", sans-serif;
    padding: 10px 20px !important;
    
  }

  & video {
    margin: 5px;
    cursor: pointer;
    flex: 1;
    object-fit: cover !important;
    max-width: 100%;
    border-radius: 20px;
    max-height: 200px;
  }

  & img {
    margin: 5px;
    flex: 1;
    object-fit: cover !important;
    border-radius: 20px;
    max-height:200px;
    width:98%;
    cursor: pointer;
  }
`;
