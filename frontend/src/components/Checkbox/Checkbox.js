import React, { useState } from 'react';
import styles from './Checkbox.module.css';

export default function Checkbox() {
    const options = ['Languages', 'Genre', 'Rating']; // Define your options here
    const languages = ['English', 'French', 'German', 'Spanish', 'Italian', 'Hindi']
    const genres = ['Action', 'Adventure', 'Horror', 'Comedy', 'Romance', 'Science Fiction']
    const ratings = [1,2,3,4,5,6,7,8,9,10]
    const [checkedState, setCheckedState] = useState(
        new Array(options.length).fill(false)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    return (
        <div>
            <h2 style={{color: '#3E2751', fontSize: '24px'}}>Preferences</h2>
            <h3 style={{color: '#3E2751', fontSize: '18px'}}>Languages</h3>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                
                {languages.map((language, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            name={language}
                            value={language}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                        />
                        {language}
                    </label>
                ))}
            </div>
            <h3 style={{color: '#3E2751', fontSize: '18px'}}>Genres</h3>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                {genres.map((genre, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            name={genre}
                            value={genre}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                        />
                        {genre}
                    </label>
                ))}
            </div>
            <h3 style={{color: '#3E2751', fontSize: '18px'}}>Ratings</h3>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <label>Minimum rating</label>
                    <input type="text" />
                        <input

                            type="submit"
                            value="submit"
                        />
            </div>
            
        </div>
    );
}
