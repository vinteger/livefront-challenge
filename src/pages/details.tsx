import {useCharacterContext} from "@/context/CharacterContext";
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {Character} from "@/api/fetchCharacters";
import Image from "next/image";
import Link from "next/link";


const Details = () => {
    const {characters} = useCharacterContext()
    const {query, back} = useRouter()
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

    useEffect(() => {
        const character = characters.filter(char => char._id == query.id)[0]
        setSelectedCharacter(character)
        console.log(selectedCharacter?.films[0])
    }, [characters, query.id])

    return (
        <div className="h-screen">
            <button className="absolute left-2 top-2" onClick={back}>
                <Image aria-label="Back"
                       alt="=back navigation button"
                       src="/back-arrow-svgrepo-com.svg"
                       width={25}
                       height={25}
                />
            </button>
            <div className="flex flex-col items-center">
                <h1 className="self-center text-2xl md:text-5xl py-5">{selectedCharacter?.name}</h1>
                <div className="self-center">
                    <Image
                        alt={selectedCharacter?.name ?? ""}
                        src={selectedCharacter?.imageUrl ?? ""}
                        width={500}
                        height={500}
                    />
                </div>
                {selectedCharacter?.films && (
                    renderListItem(selectedCharacter.films, "Films")
                )}
                {selectedCharacter?.tvShows && (
                    renderListItem(selectedCharacter.tvShows, "TV Shows")
                )}

                {selectedCharacter?.videoGames && (
                    renderListItem(selectedCharacter.videoGames, "Video Games")
                )}
                {selectedCharacter?.sourceUrl &&
                    (<p>More details: <Link href={selectedCharacter.sourceUrl}
                                            target="_blank"
                                            className='underline'
                    >{selectedCharacter.sourceUrl}</Link></p>)
                }
            </div>
        </div>
    )
}

const renderListItem = (list: string[], label: string) => {
    return list.map((type, index) => {
        return (
            <div key={`type-${index}`}>
                <h2 className="text-2xl">{label}:</h2>
                <p>{type}</p>
            </div>
        )
    })
}

export default Details