import Auth from './Auth';
import { useState, useEffect } from 'react';

function Welcome(props) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 50)
    }, [])
    return (
        <div className={`flex flex-1 text-center bg-gradient-to-r via-gray-200 from-gray-200 to-gray-900 transition duration-75 ease-in-out opacity-${mounted ? '100' : '0'}`}>
            <section className="flex-1 hidden bg-transparent border-none primary md:flex justify-evenly left-pane">
                <article className="z-20 flex flex-col items-center justify-center flex-1 w-full p-2 m-2 text-left text-gray-900 border-none">
                    <h1 className="inline pb-3 text-6xl font-extrabold text-gray-900 border-b-4 select-none primary">Tasklyst<span className="font-semibold primary">.</span> </h1>
                    <p className="text-3xl leading-loose text-gray-900 pt-7">The best one you've ever used</p>
                </article>
                <svg className="z-0 block border-r-2 fill-current primary" style={{ width: "150px" }} viewBox="0 0 56 100" preserveAspectRatio="none">
                    <polygon points="0,0 56,0 56,100" className="fill-current primary" />
                </svg>
            </section>
            <section className="flex flex-col items-center flex-1 text-6xl font-extrabold text-gray-200 justify-evenly bg-gradient-to-r from-gray-600 to-gray-700 right-pane">
                <Auth setLoggedIn={props.setLoggedIn} />
            </section>
        </div>
    )
}

export default Welcome;