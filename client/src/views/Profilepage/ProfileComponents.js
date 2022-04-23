import styled from "styled-components";

export const ProfileContainer = styled.div`
  margin-top: 70px;
  font-family: "poppins", sans-serif;
  /* background: rgb(228,235,241); */
`;

export const ProfileHeaderContainer = styled.div``;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding-left: 10%;
  padding-right: 10%;

  & > i {
    position: absolute;
    bottom: -15px;
    font-size: 30px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      color: gray;
    }

    @media (max-width: 500px) {
      & {
        bottom: -70px;
      }
    }
  }

  & .imgCover {
    height: 25rem;
    width: 100%;
    position: relative;
    border-radius: none;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    object-fit: cover;
    background-position: top;
    cursor: pointer;

    @media (max-width: 610px) {
      & {
        height: 20rem;
      }
    }

    @media (max-width: 500px) {
      & {
        height: 13rem;
      }
    }

    @media (max-width: 400px) {
      & {
        height: 10rem;
      }
    }
  }

  & .imgProfile {
    height: 10rem;
    width: 10rem;
    object-fit: cover;
    border-radius: 50%;
    position: absolute;
    bottom: -20px;
    border: solid 3px black;
    cursor: pointer;
    transition: all .5s ease;
    
    @media (max-width: 610px) {
      & {
        height: 8rem;
        width: 8rem;
      }
    }

    @media (max-width: 500px) {
      & {
        height: 7rem;
        width: 7rem;
        bottom: -70px;
      }
    }
  }
`;

export const ProfileCoverPicture = styled.img``;

export const ProfilePicture = styled.img``;

export const ProfileUserName = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 2rem;
  font-weight: 700;

  @media (max-width: 500px) {
    & {
      margin-top: 70px;
      font-size: 25px;
    }
  }
`;

export const ProfileInfoButtonsContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  height: 40px;
  background: #EAEAEA;
  padding:10px;
  border-radius: 10px;
  & div {
    flex: 5;
    display: flex;
    height: 100%;
    align-items: center;
  }

  & button {
    /* flex: 1; */
    max-width: 500px;
    font-size: 18px;
    padding: 10px 20px;
    background: rgb(57, 130, 228);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 10px;
    transition: all 0.5s ease;
    cursor: pointer;
    text-align: center;
    min-height: 40px;
    min-width: 155px;
    margin: 10px;
    @media(max-width: 777px) {
      flex:1;
    }
  }


  & div a {
    margin: 5px;
    padding: 10px 15px;
    transition: all 0.5s ease;
    border-radius: 10px;
    cursor: pointer;
    &.active {
      border-radius: 0px;
      border-bottom: solid 2px dimgray;

      &:hover {
      background: none;
      color: black;

      }
    }
  }

  & div a:hover {
    background: gray;
    color: white;
  }

  & button:hover {
    background: black;
  }

  @media (max-width: 777px) {
    & div a {
      margin: 0;
    }
  }

  @media (max-width: 777px) {
    & div {
      display: none;
    }
  }
`;

export const UpdateCoverButton = styled.button`
  font-size: 20px;
  position: absolute;
  bottom: 10px;
  right: 11%;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: white;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    background: gray;
    color: white;
  }
  
  @media (max-width: 610px) {
    padding: 5px 10px;
  }
`;

export const ProfileBodyContainer = styled.div`
  display: flex;
  justify-content: center;
  & h3 {
      margin: 20px 0px 20px 0px;
      text-align: start;
  }
  @media (max-width:962px) {
    & {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
  margin-bottom: 30px;
  & div {
    padding:10px;
    & h3 {
      margin: 10px 0px 50px 0px;
  }

  }
  @media (max-width:962px) {
    & {
      width: 500px;
      margin-right: 0px;
    }
  }

  @media (max-width:583px) {
    & {
      width: 450px;
    }
  }

  @media (max-width:483px) {
    & {
      width: 80%;
    }
  }

  @media (max-width:377px) {
    & {
      width: 80%;
    }
  }
`;

export const ProfileIntroContainer = styled.div`

  display: flex;
  flex-direction: column;
  background-color: #EAEAEA;
  border-radius: 10px;
  height: fit-content;
  margin:5px 20px 20px 20px;
  width: 100%;
  overflow: auto;
  
`

export const ProfileFriendsContainer = styled.div`
  width: 400px;
  min-height: 300px;
  border-radius: 10px;
  display: grid;
  background-color: #EAEAEA;

  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: 10px;
  
  @media (max-width: 390px) {
    & {
      width: 100%;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  & .grid-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & span {
      cursor: pointer;
      width: 100%;
      font-size: 13px;
      font-weight: 600;
    }

    & img {
      cursor: pointer;
      width: 100%;
      height: 100px;
      border-radius: 10px;
      object-fit: cover;
      
      margin: 10px;
    }
  }
`

export const ProfilePostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:500px;
  margin:5px;
  @media (max-width:610px) {
    & {
      width: 100%;
    }
  }
`;
