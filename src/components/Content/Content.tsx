import React from 'react';
import classes from './Content.module.scss';
import { useDocument } from '../../context/Documents';
import { useSelectedDocumentIdState } from '../../context/SelectedDocumentId';
import { DocumentType } from '../../context/Documents/enums';
import { Folder } from './Folder';
import { Preview } from './Preview';

export const Content: React.VFC = () => {
    const selected = useSelectedDocumentIdState();
    const document = useDocument(selected);

    if (!document) {
        return null;
    }

    return (
        <div className={classes.container}>
            {document.type === DocumentType.FOLDER ? (
                <Folder documents={document.children} />
            ) : (<Preview name={document.name} type={document.type} />)}
        </div>
    );
};