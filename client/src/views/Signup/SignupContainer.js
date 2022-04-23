import styled from "styled-components";

export const SignupContainer = styled.div`
display: flex;
align-items: flex-end;
padding:30px;
flex-direction: column;
font-family: "Poppins", sans-serif;
background: rgb(237,217,227);
min-height: 70vh;
justify-content: center;
overflow: hidden;
position: relative;
background: url('https://media.giphy.com/media/ZgTR3UQ9XAWDvqy9jv/giphy.gif');
background-repeat: no-repeat;
background-size: contain;
background-position: 150px 50px;
background-attachment: fixed ;
& h1 {
  text-align: center;
  color:#797E8B;
  margin-bottom:20px;
  font-size:28px;
}

@keyframes slidein {
  from {
    transform: translateY(10px);
  }

  to {
    transform: translateY(0px);
  }
}

& form {
  background: rgba(255, 255, 255, 0.781);
  display:flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  animation-duration: 1.5s;
  animation-name: slidein;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  box-shadow: 0px 8px 46px -1px rgba(0,0,0,0.52);
-webkit-box-shadow: 0px 8px 46px -1px rgba(0,0,0,0.52);
-moz-box-shadow: 0px 8px 46px -1px rgba(0,0,0,0.52);
}

& .input__field {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

& .input__field label {
  font-weight: 600;
  color: #afafaf;
}

& .input__field .error-message {
  color: #ff4949;
}

& .input__field input {
  padding: 10px 0;
  /* text-transform: capitalize; */
  color: #7c7c7c;
  font-weight: 600;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: solid 2px #a3a3a3;
  transition: all .1s ease-in-out;
  &:focus {
    border-bottom: solid 2px skyblue;
  }
}

& .input__field input::placeholder {
  color: #bbbbbb;
}

& form button {
  padding:8px 50px;
  border-radius:20px;
  border:none;
  background: teal;
  /* background: #edffbb; */
  color:white;
  align-self:center;
  font-size:20px;
  width:100%;
  transition: all .5s ease;
  cursor:pointer;
}

& form button:hover{
  background:black;
  color:white;
}

& form a {
  align-self: center;
  margin-top:20px;
}

& form a:hover {
  color:gray;
}

@media(max-width:420px) {
  & form {
    width: 250px;
  }
  & {
    align-items: center;
  }
  & {
    font-size:15px;
  }
}

@media (max-width:655px) {
    & {
      background-position: center;
    }
}
`;