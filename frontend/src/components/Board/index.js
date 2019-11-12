import React, { useState } from 'react';

import immer from 'immer';

import BoardContext from './context';

import './style.css';

import List from '../List';

import { loadLists } from '../../services/api';

const data = loadLists();

export default function Board() {

    const [lists, setLists] = useState(data);

    function move(fromList, toList, from, to) {

        setLists(immer(lists, draft => {
            const dragged = draft[fromList].cards[from];
            
            draft[fromList].cards.splice(from, 1);
            draft[toList].cards.splice(to, 0, dragged);
        }));

    }


    return (
        <BoardContext.Provider value={ { lists, move} }>
            <div className="board-container">
                {
                    lists.map( (data, index) => <List key={data.title} index={index} data={data}></List>)
                }           
            </div>
        </BoardContext.Provider>
    );
}