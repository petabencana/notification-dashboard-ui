import React from "react";
import styled from "styled-components";
import { Box, Text, Badge, Button } from "@chakra-ui/react";

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 1rem 0;
    height: min-content;
`;

const Card = props => {
    return (
        <CardContainer>
            {props.CampaignItems &&
                props.CampaignItems.map(campaign => (
                    <Box key={campaign?.id} minW="sm" maxW="sm" maxH="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Box p="4">
                            <Badge cursor={"pointer"} mb="2" borderRadius="full" px="2" colorScheme={"red"}>
                                {campaign?.disaster_type}
                            </Badge>
                            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                                {campaign?.title}
                            </Box>
                            <Box>
                                <Text mt={'1'} color="#666" fontSize="sm">
                                    {"Subscribed Users :"}
                                </Text>
                                {campaign?.userId.length === 0 ? (
                                    <Text align={'center'} mt='10' color="gray" fontSize="sm">
                                        No Subscriptions in this region
                                    </Text>
                                ) : (
                                    <Box mt={'3'} display="grid" gridGap="2">
                                        {campaign?.userId.map((user, index) => (
                                            <Box justifyContent={"space-between"} display="flex" key={index}>
                                                <Text color="#000" fontSize="sm">
                                                    Username : {user?.whatsapp}
                                                </Text>
                                                <Badge
                                                    onClick={() => props.sendCallbackFn(campaign, user?.whatsapp)}
                                                    cursor={"pointer"}
                                                    borderRadius="base"
                                                    px="25"
                                                    colorScheme={"teal"}
                                                >
                                                    Send
                                                </Badge>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        {campaign?.userId.length > 1 && (
                            <Button
                                onClick={() => props.sendAllCallbackFn(campaign, campaign?.userId)}
                                backgroundColor={"blue.500"}
                                color={"white"}
                                float={"right"}
                                mr="5"
                                mt="10"
                                mb="5"
                            >
                                Send all
                            </Button>
                        )}
                    </Box>
                ))}
        </CardContainer>
    );
};

Card.defaultProps = {
    onStatusChange: () => {},
    onBadgeClick: () => {},
    listItems: []
};

export default Card;
