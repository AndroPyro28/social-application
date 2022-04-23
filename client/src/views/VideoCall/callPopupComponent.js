import styled from "styled-components";


export const CallingPopupContainer = styled.div`
    background: white;
    height: fit-content;
    width: fit-content;
    position: absolute;
    border-radius: 10px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow: hidden;
    width: 40%;

    @media(max-width: 1000px) {
        width: 70%;
    }

    /* @media(max-width: 500px) {
        width: %;
    } */
`

export const CallingPopupHeader = styled.div`
    text-align: center;
    padding: 10px 20px;
    border: solid 1px gray;
    @media(max-width: 500px) {
        font-size: 13px;
    }
`
export const CallingPopupBody = styled.div`
    
    text-align: center;
    .callingInfo {
        display: flex;
        align-items: center;
        img {
            min-width: 50px;
            min-height: 50px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 10px;
        }

    }

    @media(max-width: 500px) {
        & {
            font-size: 15px;
        }
    }
`

export const CallingPopupOption = styled.div`

    display: flex;
    justify-content: center;

    i {
        margin: 10px;
        cursor: pointer;
        transition: all .3s ease-in-out;
        pointer-events: ${({callAccepted}) => callAccepted ? "none" : "all"};;

        /* :disabled {
            background: gray;
            pointer-events: none;
        } */
    }

    .declineIcon {
        padding: 15px;
        background: ${({callAccepted}) => callAccepted ? "gray" : "red"};

        color: white;
        border-radius: 50%;
        font-size: 15px;
        :hover {
            background: maroon;
        }
    }

    .acceptIcon {
        padding: 15px;
        background: ${({callAccepted}) => callAccepted ? "gray" : "green"};

        color: white;
        border-radius: 50%;
        font-size: 15px;

        :hover {
            background: darkgreen;
        }
    }
`