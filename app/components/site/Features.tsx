'use client'

import Image from "next/image";

interface Features { };

const Features = ({ }: Features) => {
    return (
        <div className="flex p-6 flex-col w-full lg:flex-row">
            <div className="
                grid
                flex-grow
                p-8
                card
                bg-base-300
                rounded-box
                place-items-center
                hover:shadow-md
                transition
                duration-300
                ease-in-out
            ">
                Create open classes and take them open to your public enroll
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="
                grid
                flex-grow
                p-8
                card
                bg-base-300
                rounded-box
                place-items-center
                hover:shadow-md
                transition
                duration-300
                ease-in-out
            ">
                Menage all the schedules using your on Google Calendar
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="
                grid
                flex-grow
                p-8
                card
                bg-base-300
                rounded-box
                place-items-center
                hover:shadow-md
                transition
                duration-300
                ease-in-out
            ">
                Find classes and enroll to participate
            </div>
        </div>
    );
};

export default Features;
