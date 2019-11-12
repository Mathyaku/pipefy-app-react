import React, { useRef, useContext } from 'react';

import BoardContext from '../Board/context';

import { useDrag, useDrop } from 'react-dnd';

import './style.css';

export default function Card({ data, index, listIndex }) {

    const ref = useRef();
    const { move } = useContext(BoardContext);

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: 'CARD', index, listIndex, id: data.id, content: data.content },
        collect: monitor => ({
            isDragging: monitor.isDragging(),

        })
    })

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            const draggedListIndex = item.listIndex;
            const targetListIndex = listIndex;

            const draggedIndex = item.index;
            const targetIndex = index;

            if( draggedIndex === targetIndex && targetListIndex === draggedListIndex) {
                return;
            }

            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top)/2;

            const draggedOffset = monitor.getClientOffset();
            const draggedTop = draggedOffset.y - targetSize.top;

            if(draggedOffset < targetIndex && draggedTop < targetCenter) {
                return;
            }

            if(draggedOffset > targetIndex && draggedTop > targetCenter) {
                return;
            }

            move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

            item.index = targetIndex;
            item.listIndex = targetListIndex;
        }
    })

    dragRef(dropRef(ref));

    return (
        <div className={ isDragging ? "card-container is-dragging" : "card-container" } ref={ref}>
            <header>
                {
                    data.labels.map(label =>  <span key={label} style={{background:label}} ></span>)
                }
            </header>
            <p> {data.content} </p>
            <img src={data.user} alt=""></img>
        </div>
    );
}