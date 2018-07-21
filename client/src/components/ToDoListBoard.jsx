import React from 'react';

export default function ToDoListBoard ({ children }) {
    return (
        <ul id="todolistboard">
            <section>
                {children}
            </section>
        </ul>
    )
}