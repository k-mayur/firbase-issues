import React from 'react';
import classes from './Error.css';

const error = props => {
    return (
        <div><h3 className={classes.err}>Invalid Address</h3><div className={classes.loader}></div></div>
    )
}

export default error;