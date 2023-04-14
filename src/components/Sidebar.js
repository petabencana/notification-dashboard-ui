import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Icon } from "@chakra-ui/react"

const SideBarWrapper = styled.div`
display:flex;
flex-direction:column;
width:20rem;
background:#0c76b3;
height:100%;
`
const UsernameWrapper = styled.div`
display:flex;
gap:1rem;
padding:1rem;
align-items:center;
justify-content: center;
background:#4681b7;

`

const ListWrapper = styled.ul`
display:grid;
gap:3rem;
margin-top:1rem;
`

const Lisitem = styled.li`
list-style:none;
display:flex;
align-items:center;
background:${props => props.selectedId && '#4681b7'};
border-radius:10px;
gap:1rem;
padding:10px 3rem;
cursor:pointer;
color:#fff;
`
const FooterWrapper = styled.span`
align-self:center;
color:white;
margin-top:auto;
`

const Sidebar = (props) => {
    const [id, setid] = useState(2);

    const clickItem = (id , props) => {
        setid(id);
        props.onClickItem(id);
    }

    return (
        <SideBarWrapper>
            <UsernameWrapper>
                <Text color="#fff" align="center" fontSize="md">Petabencana</Text>
            </UsernameWrapper>
            <ListWrapper>
                {
                    props.listItems && props.listItems.map((list) => (
                        <Lisitem selectedId={id === list?.id} onClick={() => clickItem(list?.id , props)} key={list.id}><Icon as={list?.icon ?? ''} />{list.name}</Lisitem>
                    ))
                }
            </ListWrapper>
            <FooterWrapper><Text fontSize="md">&#169; &nbsp;{new Date().getFullYear()}</Text></FooterWrapper>
        </SideBarWrapper>
    )
}

Sidebar.defaultProps = {
    onClickItem: () => { },
    listItems : []
}

export default Sidebar
