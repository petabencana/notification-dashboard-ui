
import React from "react";
import CampaignDashboard from "./containers/CampaignDashboard";
import {CampaignItems} from './constants/data'
import { render } from "@testing-library/react";



it("should match snapshot", () => {
  const { asFragment } = render(<CampaignDashboard CampaignItems={CampaignItems} />);

  expect(asFragment()).toMatchSnapshot();
});