import React from 'react';
import ProPTypes from 'prop-types';

const Error = ({mensaje}) => {
    return ( <p className="my-3 p-4 text-center alert alert-primary">{mensaje}</p> );
}

Error.propTypes = {
    mensaje: ProPTypes.string.isRequired
}
 
export default Error;