import styled from 'styled-components'

export const SideContainer = styled.div`
        flex:${({flex}) => flex};
        display:flex;
        background: ${({bg}) => bg};

        grid-gap:10px;
        height:100%;
        min-height:90vh;
        margin:10px;
        border-radius:10px;
        padding:5px;
        flex-direction:column;
        font-family:'poppins', sans-serif;
        max-width:550px;
        
        @media(max-width: 1100px) {
                padding:0px;
        }

        @media(max-width: 610px) {
                width: 100%;
        }
`