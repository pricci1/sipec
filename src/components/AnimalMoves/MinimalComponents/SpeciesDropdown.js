import React, {useContext, useState, useEffect} from "react";
import APIContext from '../../APIProvider';

const SpeciesDropdown = () => {
    const api = useContext(APIContext);
    const [species, setspecies] = useState([]);
    async function getSpecies() {
        const response = await api.get('/species');
        setspecies(response.data);
    } 
    useEffect(()=> {getSpecies()}, []);
    return (
      <div>
        <span>Especie: </span>
        <select className={"form-control"}>
          {species.map((specie) => <option key={specie.id} value={specie.id}>{specie.name}</option>)}
        </select>
      </div>
    );
  }
export default SpeciesDropdown;