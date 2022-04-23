export const chatboxToggle = (toggle, userMessages={}) => {
    return {
        type:toggle,
        payload:userMessages
    }
}