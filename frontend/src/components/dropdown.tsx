import { ChangeEvent, useState } from 'react';
import './dropdown.css'; // Import the CSS file

export default function({ options, onSelect }: {options: Array<string>, onSelect: any}) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.stopPropagation();
        const selectedValue = event.currentTarget.value || '';
        console.log(selectedValue);
        setSelectedOption(selectedValue);
        onSelect(selectedValue); // Call the parent callback function with selected value
    };

    return (
        <div className="dropdown-container">
            <select className="dropdown" value={selectedOption} onChange={handleChange}>
                <option value="" disabled>
                    Select subject
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};