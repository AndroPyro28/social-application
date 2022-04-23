export const getPostId = (postId) => {
    return {
        type: "getPostId",
        payload: postId
    }
}

export const getPostForEdit = (post) => {

    return {
        type: "editPost",
        payload: {
            post,
            action: "edit"
        }
    }
}

export const getPostIdForDelete = (postId) => {

    return {
        type: "deletePost",
        payload: {
            postId,
            action: "delete"
        }
    }
}

export const getPostIdForShare = (post) => {

    return {
        type: "sharePost",
        payload: {
            post,
            action: "share"
        }
    }
}

export const removePostId = () => {
    return {
        type: "REMOVEPOSTID",
        payload: null
    }
}