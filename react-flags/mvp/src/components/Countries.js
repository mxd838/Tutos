import axios from "axios"
import { useEffect, useState } from "react"
import Card from "./Card"

function Countries(){

    const [data, setData] = useState([])
    const [rangeValue, setRangeValue] = useState(36)
    const [selectedRadio, setSelectedRadio] = useState('')
    const radios = ['Africa','America','Asia','Europe','Oceania']

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
             .then(res => setData(res.data))
    }, [])
    return(
        <div className="countries">
            <ul className="radio-container">
                <input 
                    type="range" 
                    min="1" 
                    max="250" 
                    defaultValue={rangeValue}
                    onChange={e => setRangeValue(e.target.value)} 
                />
                {radios.map((continent,index) => (
                    <li key={index}>
                        <input 
                            type="radio" 
                            id={continent} 
                            name="continentRadio"
                            checked={continent === selectedRadio}
                            onChange={e => setSelectedRadio(e.target.id)}
                        />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
            </ul>
            {selectedRadio && (
                <button onClick={() => setSelectedRadio('')}>Annuler la recherche</button>
            )}
            <ul>
                {
                    data
                        .filter((country) => country.continents[0].includes(selectedRadio))
                        // population par ordre croissant 
                        .sort((a, b) => a.population - b.population)
                        .slice(0, rangeValue)
                        .map((country, index) => (
                            <Card 
                                key={index}
                                name={country.translations.fra.common}
                                img={country.flags.svg}
                                cap={country.capital}
                                pop={country.population}
                            />
                        ))
                }
            </ul>
        </div>
    )
}
 
export default Countries