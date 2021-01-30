import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { List } from './List'

const detectType = (entry) => {
    if (entry.size === '-1' || entry.name.startsWith('/')) return "folder"
    if (/\.(gcode|nc|gco)$/i.test(entry.name)) return "gcode"
    return "file"
}

export const FileList = ({ files, getFileList, removeFile, currentPath }) => {

    const getPath = (filename) => {
        const result = [...currentPath.split('/').filter(entry => entry !== ''), filename].join('/')
        console.log(result)
        return result
    }
    return (
        <div className="file-list">
            {files && files.map(file => {
                const fileType = detectType(file)
                switch (fileType) {
                    case 0: return <FolderItem
                        item={file}
                        openFolder={() => { getFileList(`${currentPath}${file.name}/`) }}
                        getFileList={getFileList}
                        remove={() => {
                            removeFile(`${currentPath}${file.name}`, false)
                        }} />
                    case 1: return <GcodeFileItem
                        item={file}
                        getFileList={getFileList}
                        remove={() => {
                            removeFile(`${currentPath}${file.name}`)
                        }} />
                    default: return <FileItem
                        item={file}
                        getFileList={getFileList}
                        remove={() => {
                            removeFile(`${currentPath}${file.name}`)
                        }} />
                }
            })}
        </div>
    )
}