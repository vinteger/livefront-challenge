import Home from "@/app/page";
import { render, screen } from "@testing-library/react"

describe("Home Page", () => {
    it("should render", () => {
        render(<Home/>)
        expect(screen.getByRole("heading", {name: "Hello World"})).toBeInTheDocument()
    })
})
