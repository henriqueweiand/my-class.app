/* eslint-disable react/no-unescaped-entities */
'use client'

import Image from "next/image";

interface Integration { };

const Integration = ({ }: Integration) => {
    return (
        <div className="hero py-6 bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <Image
                    src="/assets/Illustration2.png"
                    alt="VPN Illustrasi"
                    quality={100}
                    width={612}
                    height={350}
                />
                <div>
                    <h1 className="text-5xl font-bold">
                        Integrate with your Google Calendar!
                    </h1>
                    <p className="py-6">
                        Don't worry about more tools, just use the website to find a class and after that, you will only have to use your own calendar
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Integration;
