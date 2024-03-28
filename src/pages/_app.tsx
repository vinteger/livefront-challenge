import {AppProps} from 'next/app';
import {CharacterProvider} from "@/context/CharacterContext";
import "../../styles/globals.css";
import Head from "next/head";

function App({Component, pageProps}: AppProps) {
    return (
        <CharacterProvider>
            <Head>
                <title>Disney Character Info</title>
                <meta name="description"
                      content="Livefront coding challenge"/>
                <link rel="icon" href="../../favicon.ico"/>
            </Head>
            <Component {...pageProps}/>
        </CharacterProvider>
    )
}

export default App
