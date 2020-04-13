import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor
} from "@testing-library/react";
import GalleryPage from "../components/GalleryPage";

describe("GalleryPage", () => {
  let mockSelectedFunc, mockLightboxFunc;

  beforeEach(() => {
    mockSelectedFunc = jest.fn();
    mockLightboxFunc = jest.fn();
  });

  afterEach(cleanup);

  it("renders an image object for each object in the http response", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve([
            {
              name: "gallery1",
              type: "photo",
              files: [{ src: "/path/", width: 1, height: 2 }]
            },
            {
              name: "gallery2",
              type: "movie",
              files: [{ src: "/path/", width: 1, height: 2 }]
            }
          ])
      })
    );
    render(<GalleryPage />);

    await waitFor(() => {});

    expect(screen.getAllByTestId("gallery-link").length).toBe(2);
  });

  it("does not call the mock functions when the photo type is selected", async () => {
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

    render(
      <GalleryPage
        setSelected={mockSelectedFunc}
        setLightboxOpen={mockLightboxFunc}
      />
    );

    await waitFor(() => {});
    const link = screen.getByTestId("gallery-link");
    fireEvent.click(link);
    expect(mockSelectedFunc.mock.calls.length).toBe(0);
    expect(mockLightboxFunc.mock.calls.length).toBe(0);
  });

  it("does call the mock functions when a gallery's photo is selected", async () => {
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

    render(
      <GalleryPage
        setSelected={mockSelectedFunc}
        setLightboxOpen={mockLightboxFunc}
      />
    );

    await waitFor(() => {});
    let link = screen.getByTestId("gallery-link");
    fireEvent.click(link);

    link = screen.getByTestId("gallery-link");
    fireEvent.click(link);

    expect(mockSelectedFunc.mock.calls.length).toBe(1);
    expect(mockLightboxFunc.mock.calls.length).toBe(1);
  });

  it("does call the mock functions when the movie type is selected", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve([
            {
              name: "gallery1",
              type: "movie",
              files: [{ src: "/path/", width: 1, height: 2 }]
            }
          ])
      })
    );
    render(
      <GalleryPage
        setSelected={mockSelectedFunc}
        setLightboxOpen={mockLightboxFunc}
      />
    );

    await waitFor(() => {});
    const link = screen.getByTestId("gallery-link");
    fireEvent.click(link);

    expect(mockSelectedFunc.mock.calls.length).toBe(1);
    expect(mockLightboxFunc.mock.calls.length).toBe(1);
  });
});
