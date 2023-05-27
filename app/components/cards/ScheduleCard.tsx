'use client';

import { SafeSchedule } from "@/app/types";
import Link from "next/link";

type ScheduleCard = SafeSchedule & {
    href: string;
}

const ScheduleCard: React.FC<ScheduleCard> = ({
    id,
    title,
    description,
    category,
    teacher: { name },
    startDate,
    href
}) => {
    return (
        <Link href={href}>
            <article className="card group bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">

                <div className="card-body">
                    <section>
                        <h2 className="card-title">
                            {title}
                        </h2>
                        <div className="badge badge-outline my-4">{category}</div>
                        <p className="my-0">Starts at <time dateTime={startDate}>{startDate}</time> by {name}</p>
                    </section>

                    <section>
                        {description.length > 200 ? (
                            <p className="overflow-hidden overflow-ellipsis">{description.substring(0, 200)}...</p>
                        ) : (
                            <p>{description}</p>
                        )}
                    </section>
                </div>
            </article>
        </Link >
    );
}

export default ScheduleCard;