import {Character} from "@/api/fetchCharacters";
import {createContext, ReactNode, useContext, useState} from "react";

interface CharacterContextType {
    characters: Character[]
    setCharacters: (characters: Character[]) => void
}

const CharacterContext = createContext<CharacterContextType>({
    characters: [],
    setCharacters: () => {}
})

export const CharacterProvider = ({children}: { children: ReactNode }) => {
    const [characters, setCharacters] = useState<Character[]>([])

    return (
        <CharacterContext.Provider value={{characters, setCharacters}}>
            {children}
        </CharacterContext.Provider>)
}

export const useCharacterContext = () => {
    const characterContext = useContext(CharacterContext)
    if(!characterContext) {
        throw new Error("Character context provider not found")
    }
    return characterContext
}