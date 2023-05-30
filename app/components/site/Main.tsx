'use client'

import ClientOnly from "@/app/components/ClientOnly";
import Hero from "./Hero";
import Features from "./Features";
import Integration from "./Integration";

interface MainPage { };

const MainPage = ({ }: MainPage) => {
    return (
        <ClientOnly>
            <Hero />
            <Features />
            <Integration />
        </ClientOnly>
    );
};

export default MainPage;
