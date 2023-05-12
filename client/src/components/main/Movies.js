import React from 'react';
import { useSelector } from 'react-redux';

function Movies() {
    const selectedCity = useSelector(state => state.selectedCity);
    return (
        <div>city:{selectedCity.name}</div>
    )
}
export default Movies
