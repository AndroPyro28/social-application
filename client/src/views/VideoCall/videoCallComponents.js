import styled from "styled-components";

export const VideoCallContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgb(9,8,56);
    position: absolute;
    top: 0px;
    left: 0px;
    justify-content: space-evenly;
    align-items: center;
    z-index: 10000000;
    background: url("/images/vc-bg1.jpg");
    background-size: contain;
    
    display: ${({onSession}) => onSession ? "flex" : "none"};
    pointer-events: ${({onSession}) => onSession ? "all" : "none"};

    .partnerVideoWrapper {
        position: absolute;
        width: 90%;
        height: 80%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 20px auto auto auto ;
    }

    .myVideoWrapper {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto 40px 40px auto;
    }
`

export const PartnerVideo = styled.video`
    height:100%;
    width: 100%;
    position: relative;
    object-fit: contain;
    border-radius: 10px;
    /* border: solid 2px gray; */
`

export const MyVideo = styled.video`
    height: 100%;
    width:100%;
    position: relative;
    object-fit:contain;
    border-radius: 10px;
    z-index: 5;
    /* border: solid 2px gray; */
`
export const VideoWrapper = styled.div`
    text-align: center;
    color: white;
    
    h3 {
        text-shadow: 1px 3px 5px black;
    }
`

export const CallOptions = styled.div`
    position: absolute;
    bottom:10px;
    margin: auto;

    .disconnect {
        padding: 15px;
        font-size: 20px;
        background: red;
        color: white;
        border-radius: 50%;
        transform: rotate(135deg);
        cursor: pointer;

        :hover {
            background: maroon;
        }
    }
`