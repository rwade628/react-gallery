import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import FilterForm from "../components/FilterForm";

describe("FilterForm", () => {
  let mockFilterFunc, mockToggleDrawer, mockTags, mockSetTags;

  beforeEach(() => {
    mockFilterFunc = jest.fn();
    mockToggleDrawer = jest.fn();
    mockSetTags = jest.fn();
    mockTags = [
      {
        name: "tag1",
        src: "/path/",
        width: 1,
        height: 2,
      },
    ];
  });

  afterEach(cleanup);

  it("calls the provided filter function when form is submitted", async () => {
    render(
      <FilterForm
        setTags={mockSetTags}
        tags={mockTags}
        setFilters={mockFilterFunc}
        toggleDrawer={mockToggleDrawer}
      />
    );

    await waitFor(() => {});

    fireEvent.click(screen.getByLabelText(/submit/i));

    expect(mockFilterFunc.mock.calls.length).toBe(1);
    expect(mockFilterFunc.mock.calls[0][0]).toBe("orderBy=newest&type=all");
  });

  it("calls the togggleDrawer function with false when form is submitted", async () => {
    render(
      <FilterForm
        setTags={mockSetTags}
        tags={mockTags}
        setFilters={mockFilterFunc}
        toggleDrawer={mockToggleDrawer}
      />
    );

    await waitFor(() => {});

    fireEvent.click(screen.getByLabelText(/submit/i));

    expect(mockToggleDrawer.mock.calls.length).toBe(1);
    expect(mockToggleDrawer.mock.calls[0][0]).toBe(false);
  });

  it("changes type when a new type radio is selected", async () => {
    render(
      <FilterForm
        setTags={mockSetTags}
        tags={mockTags}
        setFilters={mockFilterFunc}
        toggleDrawer={mockToggleDrawer}
      />
    );

    await waitFor(() => {});

    fireEvent.click(screen.queryByTestId("radio-element"));

    fireEvent.click(screen.getByLabelText(/submit/i));

    expect(mockFilterFunc.mock.calls.length).toBe(1);
    expect(mockFilterFunc.mock.calls[0][0]).toBe("orderBy=newest&type=movie");
  });

  it("changes sort when a new sort option is selected", async () => {
    render(
      <FilterForm
        setTags={mockSetTags}
        tags={mockTags}
        setFilters={mockFilterFunc}
        toggleDrawer={mockToggleDrawer}
      />
    );

    await waitFor(() => {});

    const select = screen.getByTestId("sort-select");
    fireEvent.mouseDown(select);

    const option = screen.getByText("Longest");
    fireEvent.click(option);

    fireEvent.click(screen.getByLabelText(/submit/i));

    expect(mockFilterFunc.mock.calls.length).toBe(1);
    expect(mockFilterFunc.mock.calls[0][0]).toBe("orderBy=longest&type=all");
  });

  it("adds tags when a tag item is selected from the dropdown", async () => {
    render(
      <FilterForm
        setTags={mockSetTags}
        tags={mockTags}
        setFilters={mockFilterFunc}
        toggleDrawer={mockToggleDrawer}
      />
    );

    await waitFor(() => {});

    const dropdown = screen.getByTestId("tag-dropdown-button");
    fireEvent.click(dropdown);

    const option = screen.getByText("tag1");
    fireEvent.click(option);

    fireEvent.click(screen.getByLabelText(/submit/i));

    expect(mockFilterFunc.mock.calls.length).toBe(1);
    expect(mockFilterFunc.mock.calls[0][0]).toBe(
      "orderBy=newest&type=all&tag=tag1"
    );
  });

  it("opens the tag dialog when the button is clicked", async () => {
    render(
      <FilterForm
        setTags={mockSetTags}
        tags={mockTags}
        setFilters={mockFilterFunc}
        toggleDrawer={mockToggleDrawer}
      />
    );

    await waitFor(() => {});

    expect(screen.queryByTestId("tag-dialog")).not.toBeInTheDocument();

    const select = screen.getByTestId("tag-dialog-button");
    fireEvent.click(select);

    expect(screen.getByTestId("tag-dialog")).toBeInTheDocument();
  });

  it("adds the selected tag from the dialog list when the save button is clicked", async () => {
    render(
      <FilterForm
        setTags={mockSetTags}
        tags={mockTags}
        setFilters={mockFilterFunc}
        toggleDrawer={mockToggleDrawer}
      />
    );

    await waitFor(() => {});

    const select = screen.getByTestId("tag-dialog-button");
    fireEvent.click(select);

    const tag = screen.getByTestId("select-image");
    fireEvent.click(tag);

    const saveButton = screen.getByTestId("tag-save");
    fireEvent.click(saveButton);

    fireEvent.click(screen.getByLabelText(/submit/i));

    expect(mockFilterFunc.mock.calls.length).toBe(1);
    expect(mockFilterFunc.mock.calls[0][0]).toBe(
      "orderBy=newest&type=all&tag=tag1"
    );
  });
});
