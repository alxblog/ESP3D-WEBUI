import { h } from 'preact';
import { Tile } from '../../components/Spectre'
import { ItemDropdown } from './ItemDropdown'
import { File, FileText, Folder } from 'preact-feather';


const itemTypes = {
    gcode: {
        icon: <FileText size={32} />,
        className: 'gcode',
    },
    folder: {
        icon: <Folder size={32} />,
        className: 'folder',
    },
    file: {
        icon: <File size={32} />,
        className: 'file',
    },
}

export const Item = ({ type = 'file', name, size, actions }) => {
    const { icon, className } = itemTypes[type]
    return (
        <Tile className={className} centered >
            <Tile.Icon class="text-muted">
                {icon}
            </Tile.Icon>
            <Tile.Content>
                <Tile.Title>{name}</Tile.Title>
                <Tile.Subtitle>
                    <small class="text-gray">{size}</small>
                </Tile.Subtitle>
            </Tile.Content>
            <Tile.Action>
                <ItemDropdown actions={actions} />
            </Tile.Action>
        </Tile>
    )
}