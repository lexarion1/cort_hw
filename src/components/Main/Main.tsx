import React from 'react';
import classes from './Main.module.scss';

export const Main: React.FC = (props) => (
    <div className={classes.container}>
        {props.children}
    </div>
);