import styled from "styled-components";

export const UnAuthNavBar = styled.div`
  font-family: "poppins", sans-serif;
  height: 50px;
  display: flex;
  position: sticky;
  align-items: center;
  padding: 20px;
  overflow: hidden;
  z-index: 0;
  background: #caf0f8;
  & div:nth-child(1) {
    flex: 5;
    font-weight: 1000;
    font-size: 30px;
  }

  & div:nth-child(2) {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    font-weight: 600;
    text-transform: capitalize;
  }

  & div:nth-child(2) a {
    padding: 10px 20px;
    border-radius: 10px;
    transition: all 0.5s ease;
  }

  & div:nth-child(2) a:nth-child(1) {
    background: #29b6f6;
    color: white;
  }

  & div:nth-child(2) a:nth-child(1):hover {
    background: #29b6f6 !important;
    color: white !important;
  }

  & div:nth-child(2) a:nth-child(2):hover {
    color: white;
    background: black;
  }
`;
export const AuthNavBar = styled.div`
  font-family: "poppins", sans-serif;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* background: rgb(20,110,190); */
  /* background: lightblue; */
  background: rgb(14,47,90);
  z-index: 10;
  & div {
    flex: 1;
  }
  & div:nth-child(1) > section {
    border: solid 1px white;
    display: flex;
    align-items: center;
    background: white;
    border-radius: 20px;
    padding: 5px 5px 5px 10px;
    width: 60%;
    margin-left: 15px;
  }

  & div:nth-child(1) > section input {
    height: 20px;
    border-radius: 20px;
    border: none;
    background: transparent;
    outline: none !important;
    font-size: 100%;
    padding: 5px;
    color: gray;
    width: 100%;
    font-family: "poppins", sans-serif;
  }

  & div:nth-child(1) section i {
    font-size: 100%;
  }

  & div:nth-child(2) {
    display: flex;
    justify-content: center;
  }

  & div:nth-child(2) a {
    margin: 10px;
    padding: 10px 30px;
    border-radius: 10px;
    color: gray;
    background: white;
    transition: all 0.3s ease;
  }

  & :is(div:nth-child(2) a, div:nth-child(3) div i) {
    background: white;
    color: black;
  }

  & :is(div:nth-child(2) a, div:nth-child(3) div i):hover {
    color: white !important;
    background: lightblue !important;
  }

  & div:nth-child(3) {
    display: flex;
    align-items: center;
  }

  & div:nth-child(3) section {
    margin-left: 50px;
    font-weight: 700;
    color: white;
    border: solid 2px white;
    padding: 10px 30px;
    border-radius: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
  }

  & div:nth-child(3) section div {
    position: fixed;
    display: flex;
    flex-direction: column;
    margin-left: -20px;
    margin-top: 10px;
    overflow: hidden;
    background: rgb(14,47,90);
    border-radius: 20px;
    display: none;

  }

  & div:nth-child(3) section div a {
    color: white;
    padding: 5px 10px;
    width: 100%;
    display: flex;
    background: rgb(14,47,90);
    text-align: center;
    justify-content: center;
    margin: 5px;
    transition: all 0.3s ease;
  }

  & div:nth-child(3) section div a:hover {
    background: lightblue !important;
  }


  & div:nth-child(3) section:hover > div {
    display: flex;
  }

  & div:nth-child(3) div i { //icon in navbar
    margin: 5px;
    padding: 10px 20px;
    color: black ;
    background: white ;
    border-radius: 10px;
    font-size: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  @media (max-width: 750px) {
    & div:nth-child(3) > div i {
       display: none;
    }
  }
`;
export const NotificationButtonWrapper = styled.div`
    position: relative;
    

    & i {
      background: ${({isActive}) => isActive ? "lightblue" : "white"} !important;
      color: ${({isActive}) => isActive ? "white" : "black"} !important;
    }
    

`
export const NotificationListContainer = styled.div`
text-align: center;
  position: fixed;
  /* max-width: ; */
  min-height: 150px;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  width: 400px;
  top: 60px;
  border-radius: 10px;
  right: 20px;
  background: whitesmoke;
  overflow: auto;

  & h2 {
    margin: 10px;
  }
`;

export const EmptyStateMent = styled.div`
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  margin-top: 30px;
`;

export const NotificationContainer = styled.div`
  display: flex;
  margin: 10px;
  width: 90%;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  transition: all 0.5s ease;
  background: ${({isVisited}) => isVisited ? "white" : "lightgray"};
  
  &:hover {
    background: lightgray;
  }

  & img {
    /* height: ; */
    border-radius: 50%;
    margin-right: 10px;
    width: 70px;
    height: 70px;
  }
`;
export const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  & div:nth-child(1) {
    text-align: justify;
  }
`;

export const NotificationDate = styled.div`
  margin:auto;
  color:gray;
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonUserRelation = styled.button`
  font-family: "poppins", sans-serif;
  padding: 5px 15px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  font-size: 100%;
  border: none;
  color: white;
  background: ${({ bg }) => bg};
  transition: all .5s ease;

  &:hover {
    background:black;
  }
`;

export const SearchBarContainer = styled.div`
  max-width: 20rem;
  min-width: 20rem;
  max-height: 28rem;
  min-height: 28rem;
  position: fixed;
  top: 60px;
  left: 5px;
  border-radius: 10px;
  background: #eaeaea;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const SearchBarHeader = styled.div`
  display: flex;
  max-height: 50px;
  align-items: center;
  width: 100%;
  background: lightgray;
  & span {
    padding: 10px !important;
    border-radius: 50% !important;
    z-index: 2;
    background: white;
    margin: 5px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    @media (max-width: 750px) {
        & {
            display: block !important;
        }
    }

    &:hover {
      background: lightblue;
      color: white;
    }
  }
  & h3 {
    height: fit-content;
    text-align: center;
    flex: 1;
    margin-left: -20px;
  }
`;

export const SearchDataList = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start !important;
  position: relative;
  padding: 0px !important;
  & div:nth-child(2) {
    justify-content: flex-start;
  }

  & h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align:center;
    margin-top: 20px;
  }
`;

export const Data = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  max-height: 60px !important;
  display: flex;
  align-items: center;
  margin: 5px;
  overflow: hidden;
  border-radius: 10px;
  transition: all .5s ease;
  cursor: pointer;
  &:hover {
      background: lightgray;
  }
  & img {
    width: 50px !important;
    height: 50px !important;
    object-fit: cover;
    border-radius: 50%;
    height: 100%;
  }
  & p {
    margin: 10px;
    font-weight: 600;
  }
`;
export const SearchWord = styled.div`
  max-height: 60px !important;
  display: flex;
  align-items: center;
  margin: 10px;
  position: absolute;
  z-index: 2;
  bottom: 0px;
  left: 0px;
  cursor: pointer;
  width: 100%;
  background: lightgray;
  transition: all 0.5s ease;
  margin: 0px !important;
  justify-content: center !important;
  
  &:hover {
    background: lightcyan;
  }
  & i {
    padding: 0px !important;
    background: transparent !important;
    display: block !important;
  }

  & i:hover {
    color: gray !important;
    cursor: pointer !important;

  }

  & p {
    margin: 10px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const NotificationNumber = styled.p`
position: absolute;
padding:10px;
font-size: 100%;
height:5px;
color: white;
display: flex;
align-items: center;
border-radius: 50%;
background: red;
top: -20px;
right: 0px;
pointer-events: none;

@media (max-width: 750px) {
    & {
       display: none;
    }
  }

`
