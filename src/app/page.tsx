'use client'
import {useEffect, useState} from "react";
import Image from 'next/image'
import {Character, fetchCharacters} from "@/api/fetchCharacters";

const Home = () => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        fetchCharacters()
            .then(setCharacters)
            .catch(_e => setError(true))
    }, []);

    if (error) {
        return <p>Sorry an error has occurred. Try again later.</p>
    }

    return (
        <main>
            <h1>Disney Character Page</h1>
            {characters.map((char, index) => {
                return (
                    <figure key={`${index}-${char.id}`}>
                        <Image
                            alt={char.name}
                            src={char.imageUrl}
                            width={100}
                            height={100}
                        />
                        <figcaption>{char.name}</figcaption>
                    </figure>
                )
            })}
        </main>
    );
}

export default Home
