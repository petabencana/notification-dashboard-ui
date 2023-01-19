import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/card";
import NoDataFound from "../components/NoDataFound";
import styled from "styled-components";
import { MdDashboard, MdSettings, MdEqualizer } from "react-icons/md";
import { getReports } from "../services/getReports";
import { sendNotification } from "../services/sendNotification";
import { useToast } from "@chakra-ui/react";

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
    const toast = useToast();

    useEffect(() => {
        getReports()
            .then(response => {
                setReportData(response);
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
        const body = { ...report };
        body.deployment = "id";
        body.language = "en";
        body.notifyType = "location-based";
        if (Array.isArray(userId)) {
            userId.map(async user => {
                body.userId = user?.whatsapp;
                return await sendNotification(body)
                    .then(response => {
                        toast({
                            title: "Successfully Notified",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                    })
                    .catch(err => {
                        toast({
                            title: "Error while notifying , try again later",
                            status: "error",
                            duration: 3000,
                            isClosable: true
                        });
                    });
            });
        } else {
            body.userId = report['userId'][0].whatsapp;
            sendNotification(body)
                .then(response => {
                    toast({
                        title: "Successfully Notified",
                        status: "success",
                        duration: 3000,
                        isClosable: true
                    });
                })
                .catch(err => {
                    toast({
                        title: "Error while notifying , try again later",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                });
        }
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
                <CampaingsWrapper>{DisplayComponent}</CampaingsWrapper>
            </Container>
        </>
    );
};

export default NotificationsDashboard;
