import React from "react";
import styled from "styled-components";
import { Box, Text, Badge, Button, Link } from "@chakra-ui/react";
import { regions } from "../utils/regions";

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
                props.CampaignItems.map((campaign, index) => (
                    <Box key={campaign?.id} minW="sm" maxW="sm" maxH="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Box p="4">
                            <Badge cursor={"pointer"} mb="2" borderRadius="full" px="2" colorScheme={"red"}>
                                {campaign?.reportCount}
                            </Badge>
                            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                                {campaign?.title}
                            </Box>
                            <Box display={'grid'} gap={'5px'} fontWeight="semibold" as="h4" lineHeight="tight">
                                Report Links/s :
                                &nbsp;
                                {campaign?.reports?.map(report => (
                                    <>
                                    <Link href={`${process.env.REACT_APP_FRONTEND_PATH}/${regions(report?.properties?.tags?.instance_region_code)}/${report?.properties?.pkey}`} isExternal>
                                        <Text color="#3182CE" fontSize={'sm'}>{`Report Link ${report?.properties?.pkey}`}</Text>
                                    </Link>
                                    </>
                                ))}
                            </Box>
                            <Box>
                                <Text mt={"1"} fontWeight="semibold" as={"h4"}>
                                    {"Subscribed Users :"}
                                </Text>
                                {campaign?.userId.length === 0 ? (
                                    <Text align={"center"} mt="10" color="gray" fontSize="sm">
                                        No Subscriptions in this region
                                    </Text>
                                ) : (
                                    <Box mt={"3"} display="grid" gridGap="2">
                                        {campaign?.userId.map((user, index) => (
                                            <Box justifyContent={"space-between"} display="flex" key={index}>
                                                <Text color="#000" fontSize="sm">
                                                    Username : {user?.whatsapp}
                                                </Text>
                                                {campaign?.userId.map((user, index) => (
                                                    <Button
                                                        ml="auto"
                                                        alignSelf={"flex-end"}
                                                        onClick={() => props.sendCallbackFn(campaign, user)}
                                                        size="xs"
                                                        isLoading={props.isLoading}
                                                        colorScheme="whatsapp"
                                                    >
                                                        Send
                                                    </Button>
                                                ))}
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        {campaign?.userId.length > 1 && (
                            <Button
                                onClick={() => props.sendAllCallbackFn(campaign, campaign?.userId)}
                                isLoading={props.isLoading}
                                colorScheme="blue"
                                variant="solid"
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
