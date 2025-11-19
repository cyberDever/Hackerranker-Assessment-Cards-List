import React from 'react';
import './App.css';
import 'h8k-components';
import { DebitCard } from './components/debit-card/DebitCard';

const title: string = "Cards List";

const App: React.FC = () => {
    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <DebitCard />
        </div>
    );
}

export default App;
