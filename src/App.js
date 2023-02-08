import React,{useEffect,useState} from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [state, setState] = useState([])
  const[singleCountry,setSingleCountry] = useState("")
  const[cities,setCities] = useState([])
  const[singleCity,setSingleCity] = useState("")
  const[values,setValues] = useState(false)

  const Data = async()=>{
    try{
           const Citydata=await axios.get("https://countriesnow.space/api/v0.1/countries/")
           setState(Citydata.data.data);
    }
    catch(err){
      console.log(err)
    }
  }
  

  useEffect(() => {
    Data();
  }, [])

  const fetchCities=(country)=>{
    setValues(false)
    
    setSingleCountry(country)
    const findCities = state.find((c)=>c.country === country)
    setCities(findCities.cities)
  }
  const handleClick=()=>{
    if(singleCountry && singleCity){
      setValues(true)
    }
  }
  return (
    <div className="App">
      <h1>Select your home town</h1>
      <div>
        {state && <select onChange={(e)=>fetchCities(e.target.value)} value={singleCountry}>
          <option disabled selected hidden>
            Select Country
          </option>
          {state.map((e)=>(
            <option key={`${e.country}-${Date.now()}`} value={e.country}>{e.country}</option>
          ))}
        </select>}
        
        {cities && <select onChange={(a)=>setSingleCity(a.target.value)} value={singleCity}>
          <option disabled selected hidden>
            Select City
          </option>
          {cities.map((city)=>(
            <option value={city} key={city}>{city}</option>
          ))}
          
          
        </select>}
        <button onClick={handleClick}> Go</button>
      </div>
     {values &&
     <h1>your selected country is {singleCountry} and selected city is {singleCity}</h1>}
      
    </div>
  );
}

export default App;
