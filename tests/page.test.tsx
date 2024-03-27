import Home from "@/app/page";
import {render, screen, waitFor} from "@testing-library/react"
import {mockData} from "../__mocks__/mockData";
import * as FetchCharacters from "../src/api/fetchCharacters";

jest.mock('../src/api/fetchCharacters', () => {
    return {
        __esModule: true,
        ...jest.requireActual('../src/api/fetchCharacters')
    };
});

describe("Home Page", () => {
    const mockFetchCharacters = jest.spyOn(FetchCharacters, "fetchCharacters");

    it("should render", async () => {
        let characters = mockData.data;
        // @ts-ignore
        mockFetchCharacters.mockResolvedValueOnce(characters)

        render(<Home/>)

        expect(screen.getByRole("heading", {name: "Disney Character Page"})).toBeInTheDocument()
        expect(await screen.findAllByRole("img")).toHaveLength(3) // mock data contains 3 items
        expect(screen.getByText(characters[0].name)).toBeInTheDocument()
        expect(screen.getByText(characters[1].name)).toBeInTheDocument()
        expect(screen.getByText(characters[2].name)).toBeInTheDocument()
    })

    it("should render error text on failure to fetch character data", async () => {
        const mockFetchCharacters = jest.spyOn(FetchCharacters, "fetchCharacters");
        mockFetchCharacters.mockRejectedValue(new Error("Whoops"))

        render(<Home/>)

        await waitFor(() => {
            expect(screen.getByText("Sorry an error has occurred. Try again later."))
        })
    })
})
