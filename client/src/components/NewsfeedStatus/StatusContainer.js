import styled from "styled-components";

export const StatusContainer = styled.div`
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 6px -5px 26px -12px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 6px -5px 26px -12px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px -5px 26px -12px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  justify-self: center;
  align-self: center;
  width:100%;
  position: relative;
  

  @media (max-width: 610px) {
    width: 87%;
    font-size: 15px;
  }

  & .more {
    right: 10px;
    top: 30px;
    font-size: 25px;
    position: absolute;
    cursor: pointer;
    padding:3px;
    border-radius: 50%;
    transition: all .5s ease;
    color: rgb(67,143,255);
    &:hover {
      background: #EAEAEA;
      color: rgb(67,143,255);
    }
  }
`;

export const PostOption = styled.div`
    display: ${({toggleOption}) => toggleOption ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    background: #EAEAEA;
    border-radius: 10px;
    border-top-right-radius:0px ;
    z-index: 1;
    right:0px;
    margin-top: -20px;
    overflow: hidden;
    & h3 {
      text-align: center !important;
      margin: 10px;
      @media(max-width:610px) {
        & {
          margin: 5px;
        }
      }
    }
    & span {
      transition: all .5s ease;
      padding: 10px 20px;
      width: 200px;
      cursor: pointer;
      
      
      &:nth-child(1) {
        background-color: rgb(67,143,255);
        color: white;
        &:hover {
        color: lightblue;
        }
      }

      &:nth-child(2) {
        background: white;
        color: rgb(67,143,255);
        &:hover {
        color: skyblue;
        }
      }
      @media(max-width:610px) {
        & {
          width: 150px;
        }
      }
    }
  
`

export const StatusBanner = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  & div {
    display: flex;
    align-items: start;
  }

  & div div:nth-child(1) {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: gray;
    border-radius: 50%;
    overflow: hidden;
  }
  & div div:nth-child(1) img {
    width: ${({isSharedPost}) => isSharedPost ? "38px":"50px"} !important;
    height: ${({isSharedPost}) => isSharedPost ? "38px":"50px"} !important;
    object-fit: cover;
    border-radius: 50%;

    @media (max-width:610px) {
      & {
        width: 35px;
        height: 35px;
      }
    }
  }

  & div div:nth-child(2) {
    flex: 10;
    font-weight: 700;
    font-size: 15px;
    margin-left: 10px;

    @media (max-width:610px) {
    margin-left: 1px;
    font-size:12px !important;

    }
  }
`;

export const StatusProfilePicture = styled.div`
  background: white !important;
  min-width: 50px;
  cursor: pointer;
  
`;

export const StatusUserName = styled.div`

  display: flex;
  align-items: center;
  flex-direction: column;
  & span {
    
    width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      text-decoration: underline gray
    }
  }

  & i {
    margin-top: -15px;
    padding: 5px;
    border-radius: 20px;
    font-size: 10px !important;
    cursor: pointer;
    &:hover {
      background: #EAEAEA;
    }
  }

  @media (max-width: 610px) {
    & {
      font-size: 12px !important;
    }

    & i {
      font-size: 10px !important;
    }
  }
`;
export const SharedPostContainer = styled.div`
  font-size: 15px !important;
  border: solid 1px gray;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
`

export const StatusContent = styled.div`
  margin: 10px 0;
  text-align: justify ;
  border-radius: 10px;
  & img {
    width: 100%;
    height: 25rem;
    border-radius: 20px;
    cursor: pointer;
    object-fit: contain;
  }

  & video {
    width: 100%;
    height: 25rem;
    border-radius: 20px;
    cursor: pointer;
    object-fit: contain;
    
  }

  @media (max-width: 610px) {
    & {
      font-size:13.5px;
    }

    & img {
      height: 15rem;
    }

    & video {
      height: 15rem;
    }
  }
`;

export const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  align-items: center;
  position: relative;
  & div {
    cursor: pointer;
  }

  & .likesContainer {
    color: lightskyblue;

    & i {
      padding: 4px;
      background: lightskyblue;
      color: white;
      font-size: 10px;
      border-radius: 50%;
    }
  }

  & .commentsContainer {
    color: green;

    & i {
      padding: 4px;
      background: green;
      color: white;
      font-size: 10px;
      border-radius: 50%;
    }
  }

  & .sharesContainer {
    color: sandybrown;

    & i {
      padding: 4px;
      background: sandybrown;
      color: white;
      font-size: 10px;
      border-radius: 50%;
    }
  }

  & div:hover {
    text-decoration: underline;
  }
`;

export const CRSContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  border-right: none !important;
  border-left: none !important;
  border: solid 1px gray;
  border-radius: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  padding: 5px;
  & div {
    cursor: pointer;
    padding: 5px;
    flex: 1;
    font-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s ease;
    border-radius: 10px;

    @media(max-width:388px) {
      & {
        font-size: 11.1px;
        font-weight: 600;
      }
    }

    &:hover {
      background: lightgrey;
    }
  }
`;

export const LikedButton = styled.div`
  color: lightskyblue;
  font-weight: 700;
`;

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  & .noCommentsSign {
    font-weight: 700;
    text-align: center;
    font-size: 20px;
    margin-top:30px;
    }
`;

export const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
  margin-bottom: 15px;
  position: relative;
    
  & > img {
    min-width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }

  & p {
    position: relative;
    margin-left: 10px;
    border-radius: 20px;
    background: #EAEAEA;
    padding:20px;
    margin-top: 0px;
    min-width:120px ;

    & .name {
      cursor: pointer;
      position: absolute;
      top: -12px;
      left: 20px;
      width: fit-content;
      z-index: 2;
      font-weight: 700;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  & .time {
      position: absolute;
      bottom:-3px;
      left: 70px;
      font-size: 14px;
    }
 
 & .commentOption {

      margin: 10px;
      font-size: 20px;
      padding: 5px;
      transition:  all .3s ease;
      border-radius: 50%;
      cursor: pointer;
      display: none;

    &:hover {
      background: gray;
      color: white;
    }
 }

 &:hover > .commentOption {
  display: block;
}

`;

export const CommentInputContainer = styled.div`
  display: flex; 
  font-size: 100%;

  & > img {
    min-width: 40px;
    max-height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
  }

& .InputWrapperComment {
  width: 100%;
  display: flex;
  align-items: center;
  background: #EAEAEA;
  border-radius: 15px;

  & input {
    width: 100%;
    background: black;
    border:none;
    outline: none;
    font-size: 100%;
    padding: 10px 15px;
    background: transparent;
    color:gray;
  }
  & i {
      font-size: 20px;
      padding:10px;
      border-radius: 50%;
      cursor: pointer;
      transition: all .5s ease;
      &:hover {
        background-color: lightgray;
        color:black;
      }
    }

}
`;

export const ShareOption = styled.div`
position: absolute;
display: flex;
flex-direction: column;
min-width: 250px;
border-radius: 10px;
right: 0px;
margin-top: -35px;
z-index: 1;
overflow: hidden;
background: white;
border: solid 1px rgb(67,143,255);

& span {
  padding: 5px 20px;
  cursor: pointer;
  transition: all .3s ease-in-out;
  &:hover {
    color: lightblue !important;
  }

  @media(max-width:400px) {
  & {
    font-size: 15px;
  } 
}
}

& span:nth-child(1) {
  background: rgb(67,143,255);
  color: white;
}

& span:nth-child(2) {
  color: rgb(67,143,255);;
}

@media(max-width:400px) {
  & {
    min-width:150px;
  } 
}
`