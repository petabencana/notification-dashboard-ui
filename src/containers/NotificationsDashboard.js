import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/card";
import NoDataFound from "../components/NoDataFound";
import styled from "styled-components";
import { MdDashboard, MdSettings, MdEqualizer } from "react-icons/md";
import { getReports } from "../services/getReports";
import { sendNotification } from "../services/sendNotification";
import { Center, useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const Container = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
`;
const CampaingsWrapper = styled.div`
    display: grid;
    padding: 1rem;
    grid-auto-rows: min-content;
`;

const listItems = [
    {
        name: "Dashboard",
        icon: MdDashboard,
        id: 1
    },
    {
        name: "Reports",
        icon: MdEqualizer,
        id: 2
    },
    {
        name: "Settings",
        icon: MdSettings,
        id: 3
    }
];

const NotificationsDashboard = () => {
    const [reportData, setReportData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const toast = useToast();

    useEffect(() => {
        setIsLoading(true);
        getReports()
            .then(response => {
                setReportData(response);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("Error here", err);
            });
    }, []);

    let DisplayComponent;
    const [selectedId, setSelectedId] = useState(2);
    switch (selectedId) {
        case 1:
            DisplayComponent = <NoDataFound />;
            break;
        case 2:
            DisplayComponent = !reportData.length ? (
                <NoDataFound />
            ) : (
                <Card
                    sendCallbackFn={(report, userId) => changeStatus(report, userId)}
                    sendAllCallbackFn={(report, userId) => changeStatus(report, userId)}
                    CampaignItems={reportData}
                    isLoading={isSending}
                />
            );
            break;
        case 3:
            DisplayComponent = <NoDataFound />;
            break;
        default:
            DisplayComponent = <NoDataFound />;
            break;
    }

    const changeStatus = (report, userId) => {
        setIsSending(true);
        // eslint-disable-next-line no-undef
        const body = structuredClone(report)
        body.deployment = "id";
        body.notifyType = 'location-based';
        if (Array.isArray(userId)) {
            // eslint-disable-next-line array-callback-return
            userId.map(user => {
                body.userId = user?.whatsapp;
                body.language = user?.language_code;
                triggerNotification(body);
            });
            return;
        }
        body.userId = userId?.whatsapp;
        body.language = userId?.language_code;
        triggerNotification(body);
    };

    const triggerNotification = body => {
        sendNotification(body)
            .then(response => {
                setIsSending(false);
                toast({
                    title: "Successfully Notified",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
            })
            .catch(err => {
                setIsSending(false);
                toast({
                    title: "Error while notifying , try again later",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            });
    };

    return (
        <>
            <Container>
                <Sidebar
                    onClickItem={selectedid => {
                        setSelectedId(selectedid);
                    }}
                    listItems={listItems}
                />
                {isLoading ? (
                    <Center>
                        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                    </Center>
                ) : (
                    <CampaingsWrapper>{DisplayComponent}</CampaingsWrapper>
                )}
            </Container>
        </>
    );
};

export default NotificationsDashboard;
