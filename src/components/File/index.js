import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Tile, Button } from '../../components/Spectre'
import { File, FileText, Folder, MoreVertical, } from 'preact-feather';

const mockeFile = [
    { name: "monFichier.gcode", size: 3000, type: 1 },
    { name: "sample.gcode", size: 3000, type: 1 },
    { name: "benchy.gcode", size: 3000, type: 1 },
    { name: "foo.bar", size: 3000, type: 2 },
    { name: "dossier", size: 3000, type: 0 },
]

const displayIcon = (id) => {
    switch (id) {
        case 0: return <Folder />
            break;
        case 1: return <FileText />

            break;
        default:
            return <File />
            break;
    }

}

const FileList = () => {
    const [fileList, setFileList] = useState(mockeFile)

    useEffect(() => { }, [])
    return (
        fileList && fileList.map(file => (
            <Tile centered>
                <Tile.Icon>{displayIcon(file.type)}</Tile.Icon>
                <Tile.Content>
                    <Tile.Title>{file.name}</Tile.Title>
                    <Tile.Subtitle>{file.size}</Tile.Subtitle>
                </Tile.Content>
                <Tile.Action>
                    <Button action link><MoreVertical /></Button>
                </Tile.Action>
            </Tile>
        )
        )
    )
}

export default FileList