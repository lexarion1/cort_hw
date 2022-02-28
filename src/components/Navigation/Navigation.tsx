import React from 'react';
import classes from './Navigation.module.scss';
import { useDocumentsState } from '../../context/Documents';
import { useSelectedDocumentIdContext } from '../../context/SelectedDocumentId';
import { NavigationButton } from './NavigationButton';

export const Navigation: React.VFC = () => {
    const documents = useDocumentsState();
    const [selectedDocumentId, setSelectedDocumentId] = useSelectedDocumentIdContext();

    const onClick = React.useCallback((id: string) => {
        setSelectedDocumentId(id);
    }, []);

    return (
        <div className={classes.container}>
            {documents.map((document) => (
                <NavigationButton
                    key={document.id}
                    document={document}
                    onClick={onClick}
                    selectedId={selectedDocumentId}
                />
            ))}
        </div>
    );
};