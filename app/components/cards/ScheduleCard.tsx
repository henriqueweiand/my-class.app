'use client';

import Image from 'next/image';
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
    students,
    href
}) => {
    return (
        <Link href={href}>
            <article className="card group bg-base-100 shadow-xl">
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

                    <section className="avatar-group -space-x-6">
                        {
                            !!students && students.map((student) => (
                                <div className="avatar" key={student.id}>
                                    <div className="w-8">
                                        <Image
                                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                            width={100}
                                            height={100}
                                            alt="Picture of the author"
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </div>
            </article>
        </Link >
    );
}

export default ScheduleCard;