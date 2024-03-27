import Home from "@/app/page";
import { render, screen } from "@testing-library/react"
import {mockData} from "../__mocks__/mockData";

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData)
}));

describe("Home Page", () => {
    it("should render", async() => {
        render(<Home/>)
        expect(screen.getByRole("heading", {name: "Disney Character Page"})).toBeInTheDocument()
        expect(await screen.findAllByRole("img")).toHaveLength(3)
    })
})
