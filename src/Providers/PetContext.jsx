import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const PetContext = createContext();

export const PetProvider = ({ children }) => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Date fetch
    useEffect(() => {
        axios.get("/petService.json")
            .then(response => {
                setPets(response.data)
                setLoading(false)
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, [])
    return (
        <PetContext.Provider value={{ pets, loading, error, setLoading }}>
            {children}
        </PetContext.Provider>
    );
};

export default PetContext;