import React from 'react';
import { DocumentsProvider } from './Documents';
import { SelectedDocumentIdProvider } from './SelectedDocumentId';

export const Providers: React.FC = (props) => (
    <DocumentsProvider>
        <SelectedDocumentIdProvider>
            {props.children}
        </SelectedDocumentIdProvider>
    </DocumentsProvider>
);