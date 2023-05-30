'use client';

import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface ShiftProps {
    id: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const Shift: React.FC<ShiftProps> = ({
    id,
    label = 'Time',
    disabled,
    register,
    required,
    errors
}) => {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <select
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                className={`
                    select select-bordered w-full  
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'} 
                `}
            >
                <option value={'all'}>All shifts</option>
                <option value={'morning'}>Morning (before 12 pm)</option>
                <option value={'afternoon'}>Afternoon (after 12 pm)</option>
                <option value={'evening'}>Evening (after 6 pm)</option>
            </select>
        </div>
    );
}

export default Shift;