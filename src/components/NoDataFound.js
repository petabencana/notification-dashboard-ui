import React from 'react'
import { Center } from "@chakra-ui/react"

const NoDataFound = () => {
    return (
        <Center position="absolute" top="50%" left="50%" transform="translate(50% , -50%)" h="100%" color="gray">
            There is Nothing Here
        </Center>
       
    )
}

export default NoDataFound
