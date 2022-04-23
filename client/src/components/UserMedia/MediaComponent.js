import styled from "styled-components";

export const MediaContainer = styled.div`
display: flex;
justify-content: center;
`

export const MediaDataContainer = styled.div`
    display: grid;
    width: 80%;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 180px;
    place-items: center;
    background:#EAEAEA;
    border-radius: 20px;
    padding: 10px;

    .emptyStatement {
        display: flex;
        align-items: center;
        margin-top: -5px;
        img {
            width: 150px;
            margin: 10px;
            border-radius: 10px;
            border: solid 1px gray;
        }
    }
    
    
`
export const MediaData = styled.div`
    position: relative;
    height: 150px;
    width: 150px;
    i {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        background: white;
        border-radius: 50%;
        transition: all .3s ease-in-out;
        cursor: pointer;
        z-index: 2;
        &:hover {
            background: gray !important;
            color: white !important;
        }
    }

    img {
        border-radius: 10px;
        object-fit: cover;
        cursor: pointer;
        width:100%;
        height: 100%;

    }

    video {
    background: gray;
    border-radius: 10px;
    object-fit: cover;
    cursor: pointer;
    width:100%;
    height: 100%;
    }

`