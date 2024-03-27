'use client'
import {useEffect, useState} from "react";
import Image from 'next/image'

type Character = {
    id: string,
    name: string,
    imageUrl: string,
    sourceUrl: string,
}

export default function Home() {
    const [characters, setCharacters] = useState<Character[]>([])

    const fetchCharacters = async (): Promise<Character[]> => {
        const response = await fetch("https://api.disneyapi.dev/character")
        const fetchedData = await response.json()
        return fetchedData.data
    }

    useEffect(() => {
        fetchCharacters().then(setCharacters)
    }, []);

    return (
        <main>
            <h1>Disney Character Page</h1>
            {characters.map((char, index) => {
                return (
                    <Image
                        key={`${index}-${char.id}`}
                        alt={char.name}
                        src={char.imageUrl}
                        width={100}
                        height={100}
                    />
                )
            })}
        </main>
    );
}
