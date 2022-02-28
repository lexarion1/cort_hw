import React from 'react';
import classNames from 'classnames';
import classes from './NavigationButton.module.scss';
import { IDocument } from '../../../context/Documents/interfaces';
import { DocumentType } from '../../../context/Documents/enums';

interface IProps {
    document: IDocument;
    selectedId: string;
    onClick(id: string): void;
}

export const NavigationButton: React.FC<IProps> = (props) => {
    const [collapsed, setCollapsed] = React.useState<boolean>(false);
    const isFolder = props.document.type === DocumentType.FOLDER;
    const isSelected = props.selectedId === props.document.id;
    const collapseClass = classNames({
        ['bi-caret-right-fill']: !collapsed,
        ['bi-caret-down-fill']: collapsed,
    });

    const onClick = (): void => {
        props.onClick(props.document.id);

        if (isFolder) {
            setCollapsed(!collapsed);
        }
    };

    return (
        <div className={classes.button}>
            <div
                className={classNames(classes.labelContainer, {
                    [classes.active]: isSelected,
                })}
                onClick={onClick}
            >
                {isFolder && (
                    <i className={classNames('bi', collapseClass)} />
                )}
                <span className={classes.label}>{props.document.name}</span>
            </div>
            {(isFolder && !!props.document.children?.length && collapsed) && (
                <div className={classes.children}>
                    {props.document.children.map((childDocument) => (
                        <NavigationButton
                            key={childDocument.id}
                            document={childDocument}
                            onClick={props.onClick}
                            selectedId={props.selectedId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}