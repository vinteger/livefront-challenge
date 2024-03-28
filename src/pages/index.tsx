import {useEffect, useState} from "react";
import Image from 'next/image'
import {fetchCharacters} from "@/api/fetchCharacters";
import {useCharacterContext} from "@/context/CharacterContext";
import Link from "next/link";

const Home = () => {
    const {characters, setCharacters} = useCharacterContext()
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        fetchCharacters()
            .then(setCharacters)
            .catch(_e => setError(true))
    }, [setCharacters]);

    if (error) {
        return <p>Sorry an error has occurred. Try again later.</p>
    }

    return (
        <main className="flex flex-col px-4 h-full">
            <h1 className="self-center text-2xl md:text-5xl py-5">Disney Character Page</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {characters.map((char, index) => {
                    return (
                        <Link key={`${index}-${char._id}`} aria-label={char.name} href={`/details?id=${char._id}`} className="m-4">
                            <Image
                                alt={char.name}
                                src={char.imageUrl}
                                className={"rounded"}
                                width={300}
                                height={300}
                            />
                            <p className="flex justify-around">{char.name}</p>
                        </Link>
                    )
                })}
            </div>
        </main>
    );
}

export default Home
