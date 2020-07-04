import { mount, shallow } from "enzyme";
import Join from "../components/Join";
import {
  render,
  fireEvent,
  waitForElement,
  screen,
  findByTestId,
} from "@testing-library/react";

import { toHaveFormValues } from "@testing-library/jest-dom";

describe("<Join />", () => {
  test("testing", async () => {
    const joinForm = await screen.findByTestId("join-form");
    expect(joinForm).toHaveFormValues({
      name: "",
    });
  });
});
