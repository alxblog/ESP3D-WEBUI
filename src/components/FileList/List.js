import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Item } from './Item'

export const List = ({ entries = [] }) => {
    if (entries !== null && entries.length > 0) {
        return entries && entries.map(({ type, name, size, actions }) =>
            <Item
                type={type}
                name={name}
                size={size}
                actions={actions}
                key={btoa(name)}
            />)
    }
    else {
        return (
            <div class="empty">
                <p class="empty-title h5">Empty</p>
                <p class="empty-subtitle">No file detected in this storage.</p>
            </div>
        )

    }
}