export type Character = {
    id: string,
    name: string,
    imageUrl: string,
    sourceUrl: string,
}

export const fetchCharacters = async (): Promise<Character[]> => {
    const response = await fetch("https://api.disneyapi.dev/character")
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    const fetchedData = await response.json();
    return fetchedData.data
}