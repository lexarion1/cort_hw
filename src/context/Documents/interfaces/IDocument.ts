import { DocumentType } from '../enums';

export interface IDocument {
    id: string;
    type: DocumentType;
    name: string;
    children: IDocument[];
}