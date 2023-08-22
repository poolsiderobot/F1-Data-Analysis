import React, { useState } from 'react';

const Position = () => {
    const [formName, setFormName] = useState('');
    const [plotImage, setPlotImage] = useState('');

    const handleSubmit = async () => {
        if (!formName) {
            return;
        }

        const formData = new FormData();
        formData.append('formName', formName);

        const response = await fetch('http://127.0.0.1:5000/create_json', {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();
        const imageSrc = `data:image/png;base64,${responseData.plot_image}`;
        setPlotImage(imageSrc);
    };

    return (
        <div>
            <form id="formData">
                <label htmlFor="formName">Race </label>
                <input
                    type="text"
                    id="formName"
                    name="formName"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                />
                <button type="button" id="submitForm" onClick={handleSubmit}>Submit</button>
            </form>
            <div id="jsonDataDisplay">
                {plotImage && (
                    <img
                        src={plotImage}
                        alt="Plot"
                        style={{ width: '80%' }}
                    />
                )}
            </div>
        </div>
    );
};

export default Position;
