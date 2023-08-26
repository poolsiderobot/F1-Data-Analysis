import React, { useState,useEffect } from 'react';
import './laps.css';

function Laps()
{ 
    const [selectedRace, setSelectedRace] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [raceOptions, setRaceOptions] = useState([]);
    
    const handleRaceChange = async (event) => {
        setSelectedRace(selectedRace);
    }

    const yearsArray = [];
    for (let year = 2000; year <= 2023; year++) {
        yearsArray.push(year);
    }

    const handleYearChange = async (event) => {
        const year = event.target.value;
        setSelectedYear(year);
        const formData = new FormData();
        formData.append('year', year);

        if (year) {
           
            const response = await fetch('https://testing-mqi0.onrender.com/laps', {
              method: 'POST',
              body: formData
          });
          
          const responseData = await response.json();
           console.log(responseData);
         
       
            const races = responseData.map((item) => item.EventName);
            setRaceOptions(races);

    
        }
    }

    


  useEffect(() => {
    
    if (raceOptions.length > 0) {
      setSelectedRace(raceOptions[0]);
    }
  }, [raceOptions]);

  return(
    <div id="main-content">
    <h2>Lap Telemetry</h2>
    <br />
    <h3> </h3>
    <select id="yearDropdown" value={selectedYear} onChange={handleYearChange}>
    <option value="">Year</option>
        {yearsArray.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
    </select>


    <select id="raceDropdown" value={selectedRace} onChange={handleRaceChange}
      >
  {raceOptions.map((race, index) => (
          <option key={index} value={race}>
            {race}
          </option>
        ))}

    </select>

  

     <br /> 

         </div>
    );

}

export default Laps;