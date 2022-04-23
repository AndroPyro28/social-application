import styled from "styled-components";

export const ActiveListContainer = styled.div`
    position: fixed;
    bottom: 0px;
    width: 250px;
    height: 400px;
    display: flex;
    border: solid 1px gray;
    border-bottom: 0px ;
    color: white;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    overflow: hidden;
    transition: all .3s ease;
    right: ${({toggleActiveList}) => toggleActiveList ? "20px" : "-300px"};
`
export const ActiveListHeader = styled.div`
    height: 40px;
    background: #EAEAEA;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: black;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
    background: lightgray;
    color: white;
    }
`

export const ActiveListBody = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    flex-direction: column;
    width:100%;
    height: 400px;
    overflow: auto;
    background: white;
`

export const ActiveListFooter = styled.div`
    height: 40px;
    background: #EAEAEA;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: black;

    & input {
        border: none;
        outline: none;
        background: transparent;
        height: 100%;
        width: 100%;
        font-size: 16px;
        padding: 10px;
    }

    & i {
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        transition: all .5s ease;
        &:hover {
            background: lightgray;
        }
    }
`
export const FriendsContainer = styled.div`
    display: flex;
    width: 95%;
    border-radius: 10px;
    background: #EAEAEA;
    align-items: center;
    margin: 5px;
    cursor: pointer;
    transition: all .3s ease;
    position: relative;
    text-align: center;
    & span {
        transition:all .3s ease;
        width: 100%;
        margin-left:-25px;
    }
    & img {
        margin-left:10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    & span {
        color: gray;
    }

    & i {
        font-size: 9px;
        position: absolute;
        right: 10px;
    }

    & .online__friend{
        color: yellowgreen;
    }

    & .offline__friend{
        color: gray;
    }

    &:hover {
        background:rgb(182, 95, 253);
        /* background:gray; */
        & span {
            color: white !important;

        }
    }
    
`