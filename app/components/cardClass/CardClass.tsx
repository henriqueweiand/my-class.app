'use client';

interface CardClass {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    category: string;
    classLength?: number;
    timezone?: string;
    owner?: string;
}

const CardClass: React.FC<CardClass> = ({
    id,
    title,
    description,
    startDate,
    endDate,
    category,
    classLength,
    timezone,
    owner,
}) => {
    return (
        <div className="card group bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{category}</div>
                </div>
            </div>
        </div>
    );
}

export default CardClass;