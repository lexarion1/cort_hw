import React from 'react';
import classes from './Folder.module.scss';
import { IDocument } from '../../../context/Documents/interfaces';
import { useSelectedDocumentIdDispatch } from '../../../context/SelectedDocumentId';

interface IProps {
    documents: IDocument[];
}

export const Folder: React.FC<IProps> = (props) => {
    const dispatch = useSelectedDocumentIdDispatch();

    return (
        <>
            {props.documents.map((document) => (
                <div
                    key={document.id}
                    className={classes.document}
                    onClick={() => dispatch(document.id)}
                >
                    <div className={classes.box} />
                    <div className={classes.label}>
                        {document.name}
                    </div>
                </div>
            ))}
        </>
    );
}