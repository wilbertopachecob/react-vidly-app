import React from 'react';

function MovieDetails(props) {
    return (
        <div>
         Movie - ID: {props.match.params.id}   
        </div>
    );
}

export default MovieDetails;