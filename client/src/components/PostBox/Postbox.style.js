import styled from "styled-components";

export const PostBoxContainer = styled.div`
  /* height: 11rem; */
  border-radius: 20px;
  overflow: hidden;
  /* background: rgb(211,211,211); */
  background:#EAEAEA;
  display: flex;
  padding:10px;
  flex-direction: column;
  align-items:center;
  align-self: center;
  width: 95%;

 
  & input {
      cursor:pointer;
      height: 2.5rem;
      width:95%;
      border-radius:20px;
      border:none;
      padding:5px 10px;
      outline:none;
      font-size: 100%;
  }

  & .linebreak {
      height: 1px;
      width: 100%;
      background: white;
      margin:10px;
  }

  @media(max-width: 610px) {
    width:80%;
    /* height: 9rem; */
  }
`;

export const PostBoxOption = styled.div`
color: white;
display: flex;
justify-content: space-evenly;
width: 100%;

`
export const OptionContainer = styled.span`
color: rgb(67,143,255);
width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: 50px;
font-weight: 500;
cursor: pointer;
transition: all .3s ease-in-out;
border-radius: 15px;
font-size:1em;
text-align: center;
&:hover {
  background:lightgray;
  color: blue;
}
& i {
  font-size: 25px;
  color:${({bg}) => bg};
}

@media(max-width:531px) {
  & {
    font-size:0.8em;
  }

  & i {
    font-size: 20px;
  }
}

@media(max-width:425px) {
  & {
    font-size:0.7em;
  }
}
`