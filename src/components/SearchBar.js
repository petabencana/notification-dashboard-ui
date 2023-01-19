import React from 'react'
import { InputGroup, InputLeftElement , Input } from "@chakra-ui/react"
import { MdSearch } from "react-icons/md";
import styled from 'styled-components'

const SearchBarWrapper = styled.div`
width: 100%;
display: flex;
gap: 1rem;
height:min-content;
`

const SearchBar = ({ showRightElement, placeholder ,  leftChildElement, showLeftElement, rightElementChild , onChange }) => {
    return (
        <SearchBarWrapper>
            <InputGroup>
                {
                    showLeftElement &&
                    <InputLeftElement
                        pointerEvents="none"
                        children={leftChildElement}
                    />
                }
                <Input onChange={onChange} placeholder={placeholder} />
            </InputGroup>
                {showRightElement &&

                  rightElementChild}
        </SearchBarWrapper>

    )
}


SearchBar.defaultProps = {
    showRightElement: false,
    showLeftElement: false,
    leftChildElement: <MdSearch />,
    rightElementChild: ''
}

export default SearchBar
