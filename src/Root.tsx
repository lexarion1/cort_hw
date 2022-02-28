import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';

export const Root: React.FC = () => (
    <>
        <Header />
        <Main>
            <Navigation />
            <Content />
        </Main>
    </>
);
