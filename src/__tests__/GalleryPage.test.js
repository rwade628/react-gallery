import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
} from "@testing-library/react";
import GalleryPage from "../components/GalleryPage";

describe("GalleryPage", () => {
  let mockGallerySelectFunc, mockSetPhotosFunc, mockSetAllPhotosFunc;
  const photos = [
    {
      name: "gallery1",
      type: "photo",
      src: "/path/file.jpg",
      width: 1,
      height: 2,
      files: [{ src: "/path/file.jpg", width: 1, height: 2 }],
    },
    {
      name: "gallery2",
      type: "movie",
      src: "/path/file.mp4",
      width: 1,
      height: 2,
      files: [{ src: "/path/file.mp4", width: 1, height: 2 }],
    },
  ];

  // filters,
  // gallerySelect,
  // photos,
  // setPhotos
  beforeEach(() => {
    mockGallerySelectFunc = jest.fn();
    mockSetPhotosFunc = jest.fn();
    mockSetAllPhotosFunc = jest.fn();
    window.scrollTo = jest.fn();
  });

  afterEach(cleanup);

  it("renders an image object for each object in the http response", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve([]),
      })
    );
    render(
      <GalleryPage
        photos={photos}
        setAllPhotos={mockSetAllPhotosFunc}
        setPhotos={mockSetPhotosFunc}
      />
    );

    await waitFor(() => {});

    expect(screen.getAllByTestId("gallery-link").length).toBe(2);
  });

  it("does call the  gallery select mock functions when the photo is clicked", async () => {
    const photos = [
      {
        name: "gallery1",
        type: "photo",
        src: "/path/file.jpg",
        width: 1,
        height: 2,
        files: [{ src: "/path/file.jpg", width: 1, height: 2 }],
      },
    ];

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve([]),
      })
    );

    render(
      <GalleryPage
        photos={photos}
        setAllPhotos={mockSetAllPhotosFunc}
        setPhotos={mockSetPhotosFunc}
        gallerySelect={mockGallerySelectFunc}
      />
    );

    await waitFor(() => {});
    const link = screen.getByTestId("gallery-link");
    fireEvent.click(link);
    expect(mockGallerySelectFunc.mock.calls.length).toBe(1);
    expect(mockGallerySelectFunc.mock.calls[0][0].src).toBe("/path/file.jpg");
    // index should be set to 0
    expect(mockGallerySelectFunc.mock.calls[0][1]).toBe(0);
  });
});
