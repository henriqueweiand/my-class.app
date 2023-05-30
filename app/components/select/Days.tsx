'use client';

import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface DaysProps {
    id: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const Days: React.FC<DaysProps> = ({
    id,
    label = 'Day',
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
                <option value={'all'}>All Days</option>
                <option value={'monday'}>Monday</option>
                <option value={'tuesday'}>Tuesday</option>
                <option value={'wednesday'}>Wednesday</option>
                <option value={'thursday'}>Thursday</option>
                <option value={'friday'}>Friday</option>
                <option value={'saturday'}>Saturday</option>
                <option value={'sunday'}>Sunday</option>
            </select>
        </div>
    );
}

export default Days;