import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import Lightbox from "../components/Lightbox";

describe("Lightbox", () => {
  const selected = {};
  afterEach(cleanup);

  it("does not render modal when open is false", async () => {
    render(<Lightbox open={false} selected={selected} />);

    await waitFor(() => {});

    expect(screen.queryByTestId("lightbox")).not.toBeInTheDocument();
  });

  it("does render modal when open is true", async () => {
    render(<Lightbox open={true} selected={selected} />);

    await waitFor(() => {});

    expect(screen.queryByTestId("lightbox")).toBeInTheDocument();
  });

  it("renders a PinchImage when selected src contains jpg", async () => {
    selected.src = "image.jpg";
    render(<Lightbox open={true} selected={selected} />);

    await waitFor(() => {});

    expect(screen.queryByTestId("pinch-image")).toBeInTheDocument();
  });

  it("renders a PinchImage when selected src contains jpeg", async () => {
    selected.src = "image.jpeg";
    render(<Lightbox open={true} selected={selected} />);

    await waitFor(() => {});

    expect(screen.queryByTestId("pinch-image")).toBeInTheDocument();
  });

  it("renders a VideoPlayer when selected src contains mp4", async () => {
    selected.src = "video.mp4";
    render(<Lightbox open={true} selected={selected} />);

    await waitFor(() => {});

    expect(screen.queryByTestId("video-player")).toBeInTheDocument();
  });
});
