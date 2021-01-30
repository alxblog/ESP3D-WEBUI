import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Item } from './Item'

export const List = ({ entries = [] }) => {
    const [fileList, setFileList] = useState()

    return entries && entries.map(({ type, name, size, actions }) =>
        <Item
            type={type}
            name={name}
            size={size}
            actions={actions}
            key={btoa(name)}
        />)
}