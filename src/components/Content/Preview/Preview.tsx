import React from 'react';
import classes from './Preview.module.scss';
import { DocumentType } from '../../../context/Documents/enums';

interface IProps {
    name: string;
    type: DocumentType;
}

export const Preview: React.FC<IProps> = (props) => (
    <div className={classes.container}>
        <h3>Preview</h3>
        <div>
            Name: {props.name}
        </div>
        <div>
            Type: {props.type}
        </div>
    </div>
);