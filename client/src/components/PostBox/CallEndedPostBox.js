import React from 'react'
import styled from 'styled-components';
import { removePostId } from '../../redux/actions/postId';
import { PostBoxModalBackdrop } from './PostBoxModal.style';
function CallEndedPostBox() {

    const DeletePostContainer = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width:500px;
        background: white;
        height: fit-content;
        border-radius: 20px;
        overflow: hidden;
        text-align: center;
        font-family: 'poppins', sans-serif;
    `;

    const DeletePostHeader = styled.div`
        color: black;
        border-bottom: solid 1px gray ;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        font-size: 25px;
    `

    const DeletePostBody = styled.div`
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        & button {
            cursor: pointer;
            margin: 10px;
            border-radius: 5px;
            padding: 10px 30px;
            font-size: 100%;
            color: white;
            border: none;
            transition: all .3s ease-in-out;
        }

        & button:nth-child(1) {
            background: rgb(67,143,255);
            &:hover {
                color: lightblue;
            }
        }
        & button:nth-child(2) {
            background: white;
            border: solid 1px rgb(67,143,255);
            color: rgb(67,143,255);
            &:hover {
                color: lightblue;
            }
        }
    `

  return (
      <PostBoxModalBackdrop>
    <DeletePostContainer>
        <DeletePostHeader>The Call Has ended.</DeletePostHeader>

        <DeletePostBody>
            <button onClick={() => window.location.reload()}>Okay.</button>
        </DeletePostBody>
    </DeletePostContainer>
    </PostBoxModalBackdrop>
  )
}

export default CallEndedPostBox