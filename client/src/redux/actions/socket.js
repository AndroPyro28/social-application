export const socketConnected = (socket) => {
    return {
        type: "SOCKETCONNECTIONSUCCESS",
        payload: socket
    }
}

export const socketFailed = () => {
    return {
        type: "SOCKETCONNECTIONFAILED",
        payload: null
    }
}