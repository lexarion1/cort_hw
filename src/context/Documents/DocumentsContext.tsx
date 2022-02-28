import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { apiUrls } from '../../constants/apiUrls';
import { IDispatch, IDocument } from './interfaces';

const Context = React.createContext<IDocument[]>([]);
const DispatchContext = React.createContext<IDispatch>(() => null);

export const DocumentsProvider: React.FC = (props) => {
    const [state, setState] = React.useState<IDocument[]>([]);
    const contextValue = React.useMemo(() => state, [state]);
    const dispatchValue = React.useMemo(() => setState, [setState]);

    React.useEffect(() => {
        fetch(`${apiUrls.baseUrl}${apiUrls.documents}`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(({ response }) => {
                setState(response);
            });
    }, []);

    if (!contextValue.length) {
        return <PulseLoader />;
    }

    return (
        <Context.Provider value={contextValue}>
            <DispatchContext.Provider value={dispatchValue}>
                {props.children}
            </DispatchContext.Provider>
        </Context.Provider>
    );
};

export const useDocumentsState = (): IDocument[] => {
    const context = React.useContext(Context);

    if (context === undefined) {
        throw new Error(
            `useDocumentsContext must be used within a ${
                Context.displayName ?? 'Context'
            }.Provider`,
        );
    }

    return context;
}

export const useDocumentsDispatch = (): IDispatch => {
    const context = React.useContext(DispatchContext);

    if (context === undefined) {
        throw new Error(
            `useDocumentsDispatch must be used within a ${
                Context.displayName ?? 'DispatchContext'
            }.Provider`,
        );
    }

    return context;
}

const selector = (documents: IDocument[], id: string): IDocument | undefined => {
    let found = documents.find(d => d.id === id);

    if (!found) {
        let index = 0;

        while(!found && index < documents.length) {
            if (documents[index].children && documents[index].children.length) {
                found = selector(documents[index].children, id);
            }

            index++;
        }
    }

    return found;
}

export const useDocument = (id: string) => {
    const documents = useDocumentsState();
    return selector(documents, id);
}