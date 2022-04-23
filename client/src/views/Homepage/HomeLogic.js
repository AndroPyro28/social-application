import React from 'react'
import {getPostId} from "../../redux/actions/postId"
function HomeLogic({dispatch}) {

    const editPostBox = (postId) => {
      dispatch(getPostId(postId))
    }

  return {
    editPostBox
  }
}

export default HomeLogic