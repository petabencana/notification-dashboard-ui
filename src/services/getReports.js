/* eslint-disable array-callback-return */
import axios from "axios";
import { groupByProperty, uniqBy } from "../utils/helpers";


export const getReports = () => {
    const checkIfSubscriptionExist = (response, region_code) => {
        const filterSubscriptions = response?.data?.result.filter(sub => sub.region_code === region_code);
        if (filterSubscriptions.length > 0) {
            return filterSubscriptions;
        }
        return null;
    };

    const getRegionName = (allRegions, regionCode) => {
        const filterByRegionCode = allRegions.filter(region => region.properties.region_code === regionCode);
        return filterByRegionCode[0]?.properties?.region;
    };

    return new Promise(async (resolve, reject) => {
        try {
            const allReportsReq = await axios.get(`${process.env.REACT_APP_DATA_SERVER}/reports`);
            const allSubsReq = await axios.get(`${process.env.REACT_APP_DATA_SERVER}/subscriptions`);
            const allRegionsReq = await axios.get(`${process.env.REACT_APP_DATA_SERVER}/regions`);
            Promise.all([allReportsReq, allSubsReq, allRegionsReq])
                .then(response => {
                    const reportData = [];
                    const groupedObj = groupByProperty(
                        response[0]?.data?.result?.objects?.output?.geometries,
                        "properties.tags.region_code"
                    );
                    Object.keys(groupedObj).map(key => {
                        const userId = checkIfSubscriptionExist(response[1], key);
                        const region = getRegionName(response[2]?.data?.result?.objects?.output?.geometries, key);

                        groupedObj[key].map(item => {
                            reportData.push({
                                id: key,
                                title: `Report region : ${region}`,
                                reportCount: `${groupedObj[item?.properties.tags?.region_code].length} report(s)`,
                                userId: userId || [],
                                reports: groupedObj[item?.properties.tags?.region_code],
                                reportId: item?.properties?.pkey,
                                instanceRegionCode: item?.properties.tags?.instance_region_code
                            });
                        });
                    });
                    let uniqArray = uniqBy(reportData, "id");
                    resolve(uniqArray);
                })
                .catch(err => {
                    reject(err);
                });
            // resolve(reportReq.data)
        } catch (err) {
            reject(err);
            console.log("err here");
        }
    });
};
