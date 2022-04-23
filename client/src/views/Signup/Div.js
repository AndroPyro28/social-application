import styled from "styled-components";

export const StyledDiv = styled.div`
clip-path: polygon(20% 0%, 100% 0, 83% 100%, 0% 100%);
position:absolute;
left:0;
top:0;
width: 50vw;
height: 100%;
background: ${({bg}) => bg} !important;
z-index:1;
`