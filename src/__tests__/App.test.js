import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve([
            {
              name: "gallery1",
              type: "photo",
              files: [{ src: "/path/", width: 1, height: 2 }]
            }
          ])
      })
    );
  });

  afterEach(cleanup);

  it("renders without crashing", async () => {
    render(<App />);

    await waitFor(() => {});

    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
