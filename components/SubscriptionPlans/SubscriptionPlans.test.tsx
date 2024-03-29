import "@testing-library/jest-dom/extend-expect"
import { render, waitFor } from "@testing-library/react"
import React from "react"

import SubscriptionPlans from "./SubscriptionPlans"
import { MockedProviderWrapper } from "../../lib/test-utils"

describe("SubscriptionPlans", function () {
  it("Renders successfully", async function () {
    const { getByTestId } = render(
      <MockedProviderWrapper>
        <SubscriptionPlans />
      </MockedProviderWrapper>
    )

    await waitFor(() => expect(getByTestId("plans")).toBeInTheDocument())

    getByTestId("plans")
  })
})
