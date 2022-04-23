import styled from "styled-components";

export const SharedContentContainer = styled.div`
    border: solid 1px gray;
    width: 97%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
        width: 100%;
        border-radius:0px;
        object-fit: contain !important;
        max-height: 150px;
    }

    & video {
        width:100%;
        border-radius: 0px;
        object-fit: contain !important;
        max-height: 150px;
    }

    @media (max-width:550px) {
        & {
            width: 100%;
        }
    }
`

export const ContentPostByUser = styled.div`
    display: flex;
    flex-direction: column;
    cursor: default;
    margin-left:50px;
    align-self: flex-start;
    & strong {
        font-size: 15px;
    }

    & span {
        font-size: 12px;
        margin: 5px;
    }

    & p {
        &::before {
            content: "-"
        }
    }
`;