import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TitleBar from "../components/TitleBar";

describe("TitleBar", () => {
  it("displays the provided title", () => {
    const titleText = "Some Title";
    render(<TitleBar titleText={titleText} />);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it("opens the drawer when menu is clicked", async () => {
    render(<TitleBar />);

    expect(screen.queryByTestId("drawer")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/menu/i));

    expect(screen.getByTestId("drawer")).toBeInTheDocument();
  });
});
