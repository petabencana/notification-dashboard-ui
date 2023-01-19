import React from "react";
import SideBar from "./components/Sidebar";
import { render } from "@testing-library/react";


it('sidebar should render correctly', () => {
    const { asFragment } = render(<SideBar />);

    expect(asFragment()).toMatchSnapshot();
});

it('sidebar should render links correctly', () => {
    const listItems = [{
        name: 'Dashboard',
        id: 1
    },
    {
        name: 'Reports',
        id: 2
    },
    {
        name: 'Settings',
        id: 3
    },
    ]
    const { asFragment } = render(<SideBar listItems={listItems} />);
     expect(asFragment).toMatchSnapshot();
  });