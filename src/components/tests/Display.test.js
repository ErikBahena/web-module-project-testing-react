import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import Display from "../Display.js";
import userEvent from "@testing-library/user-event";

import fetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const testShow = {
  //add in approprate test data structure here.
  name: "Show Name",
  summary: "Show Summary",
  seasons: [
    {
      id: 1,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 2,
      name: "Season 2",
      episodes: [],
    },
  ],
};

test("renders without any errors", () => {
  render(<Display />);
});

test("show component displays when user clicks the fetch button", async () => {
  fetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);

  const fetchButton = screen.queryByRole("button");
  userEvent.click(fetchButton);

  const showComponent = await screen.findByTestId("show-container");

  expect(showComponent).toBeInTheDocument();
});

test("when the fetch button is pressed, the select options are equal to the seasons in your test data", async () => {
  fetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);

  const fetchButton = screen.queryByRole("button");
  userEvent.click(fetchButton);

  const seasonOptions = await screen.findAllByTestId("season-option");

  expect(seasonOptions.length).toBe(2);
});

test("optional function is being called on fetch button press", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  const displayFunc = jest.fn();

  render(<Display displayFunc={displayFunc} />);

  const fetchButton = screen.queryByRole("button");
  userEvent.click(fetchButton);

  await waitFor(() => expect(displayFunc).toHaveBeenCalledTimes(1));
});
///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.

//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.

//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.

//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
