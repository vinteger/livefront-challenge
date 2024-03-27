import {mockData} from "../__mocks__/mockData";
import {fetchCharacters} from "@/api/fetchCharacters";

global.fetch = jest.fn();

const mockFetch = (fetch as jest.Mock)
describe("Fetch Characters", () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    it("fetches characters successfully", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => ({data: mockData.data})
        })
        const characters = await fetchCharacters()
        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(mockFetch).toHaveBeenCalledWith("https://api.disneyapi.dev/character");
        expect(characters.length).toEqual(mockData.data.length)
    })

    it('throws an error when the fetch fails', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(fetchCharacters()).rejects.toThrow('Network response was not ok');
    });
})
