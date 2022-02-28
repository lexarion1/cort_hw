import React from 'react';

const Context = React.createContext<string>('');
const DispatchContext = React.createContext<React.Dispatch<string>>(() => null);

export const SelectedDocumentIdProvider: React.FC = (props) => {
    const [state, setState] = React.useState<string>('');
    const contextValue = React.useMemo(() => state, [state]);
    const dispatchValue = React.useMemo(() => setState, [setState]);

    return (
        <Context.Provider value={contextValue}>
            <DispatchContext.Provider value={dispatchValue}>
                {props.children}
            </DispatchContext.Provider>
        </Context.Provider>
    );
};

export const useSelectedDocumentIdState = (): string => {
    const context = React.useContext(Context);

    if (context === undefined) {
        throw new Error(
            `useSelectedDocumentIdContext must be used within a ${
                Context.displayName ?? 'Context'
            }.Provider`,
        );
    }

    return context;
}

export const useSelectedDocumentIdDispatch = (): React.Dispatch<string> => {
    const context = React.useContext(DispatchContext);

    if (context === undefined) {
        throw new Error(
            `useSelectedDocumentIdDispatch must be used within a ${
                Context.displayName ?? 'DispatchContext'
            }.Provider`,
        );
    }

    return context;
}

export const useSelectedDocumentIdContext = (): [string, React.Dispatch<string>] => [
    useSelectedDocumentIdState(),
    useSelectedDocumentIdDispatch(),
];