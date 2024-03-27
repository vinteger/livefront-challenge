'use client'
import {useEffect, useState} from "react";
import Image from 'next/image'
import {Character, fetchCharacters} from "@/api/fetchCharacters";

const Home = () => {
    const [characters, setCharacters] = useState<Character[]>([])

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

export default Home
