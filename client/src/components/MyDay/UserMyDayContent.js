import styled from "styled-components";

export const UserMydayContent = styled.div`
    height: 100%;
    min-width:130px;
    max-width:130px;
    border-radius:10px;
    margin-left:3px;
    margin-right:3px;
    overflow:hidden;
    position:relative;
    transition: all .3s ease;
    cursor:pointer;
    &:hover {
        transform:scale(1.1);
    }

    & img {
        width: 100%;
        height:100%;
        object-fit:cover;
    }

    & span {
        bottom:5px;
        left:0;
        right:0;
        margin:0 auto;
        position:absolute;
        font-size:15px;
        text-align:center;
        color:white;
        text-shadow:1px 5px 3px black;
    }

    @media (max-width: 610px) {
        & {
            min-width:100px;
            max-width:100px;
        }
    }
`