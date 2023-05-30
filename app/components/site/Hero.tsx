'use client'

import getScrollAnimation from "@/app/utils/getScrollAnimation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

interface Hero { };

const Hero = ({ }: Hero) => {
    const scrollAnimation = useMemo(() => getScrollAnimation(), []);

    return (
        <ScrollAnimationWrapper
            className="bg-base-200 hero"
        >
            <div className="hero w-full">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <motion.div
                        className="hero w-full"
                        variants={scrollAnimation}>
                        <Image
                            src="/assets/Illustration1.png"
                            alt="VPN Illustrasi"
                            quality={100}
                            width={412}
                            height={300}
                        />
                    </motion.div>
                    <div>
                        <h1 className="text-5xl font-bold">My Class</h1>
                        <p className="py-6 text-1xl">The easiest way to have free and open meetings.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </ScrollAnimationWrapper>
    );
};

export default Hero;
