import React, { useState } from 'react';
import './position.css';

function Position() {
  const [selectedRace, setSelectedRace] = useState('');
  const [plotImage, setPlotImage] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const handleRaceChange = async (event) => {
    const raceName = event.target.value;
    setSelectedRace(raceName);
    setLoading(true);
    setPlotImage(null);
    const formData = new FormData();
    formData.append('formName', raceName);


    if (raceName) {
           
      const response = await fetch('https://testing-mqi0.onrender.com/create_json', {
        method: 'POST',
        body: formData
    });

    const responseData = await response.json();

      if (responseData.plot_image) {
        setPlotImage(`data:image/png;base64,${responseData.plot_image}`);
        
        setLoading(false);
      } else {
        setPlotImage(null);
      }
    } else {
      setPlotImage(null);
    }
  };

  return (
    <div id="main-content">
      <h2>Position History</h2>
      <br />
      <h3> Race</h3>

      <div>
        <select id="raceDropdown" value={selectedRace} onChange={handleRaceChange}>
          <option value="">Choose a race</option>
          <option value="Bahrain Grand Prix">Bahrain Grand Prix</option>
          <option value="Saudi Arabia Grand Prix">Saudi Arabian Grand Prix</option>
          <option value="Australia Grand Prix">Australian Grand Prix</option>
          <option value="Azerbaijan Grand Prix">Azerbaijan Grand Prix</option>
          <option value="Miami Grand Prix">Miami Grand Prix</option>
          <option value="Monaco Grand Prix">Monaco Grand Prix</option>
          <option value="Spanish Grand Prix">Spanish Grand Prix</option>
          <option value="Canadian Grand Prix">Canadian Grand Prix</option>
          <option value="Austrian Grand Prix">Austrian Grand Prix</option>
          <option value="British Grand Prix">British Grand Prix</option>
          <option value="Hungarian Grand Prix">Hungarian Grand Prix</option>
          <option value="Belgian Grand Prix">Belgian Grand Prix</option>
        </select>
      </div>

       <br /> 

       {loading ? (
        <p id="loading-msg">Creating your Position History Chart...</p>
      ) : plotImage ? (
        <div>
          <h3>Position History for {selectedRace}</h3>
          <img src={plotImage} alt={`Position History for ${selectedRace}`} />
        </div>
      ) : null}
    </div>
  );
}

export default Position;
