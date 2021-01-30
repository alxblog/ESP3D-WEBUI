import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Upload, RefreshCcw, Home } from 'preact-feather';
import { Panel, Menu, Button, Loading, Progress, Breadcrumb } from '../../../components/Spectre'
import { List } from '../../../components/FileList/List'
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'
import { useQueuing } from '../../../hooks/useQueuing'
import useStorageSystem from '../../../hooks/useStorageSystem'
import useUi from '../../../hooks/useUi'
import { UploadForm } from '../../../components/UploadForm'
import { Field } from '../../../components/Form/Field'
import { parseFileSizeString } from '../../../utils'


const FilesPanel = ({ title }) => {
    // const [isLoading, setIsLoading] = useState(true)
    // const { currentStorageSys, setCurrentStorageSys, storageOptList} = useStorageSystem()// bouger la logique dans useStorageSystem
    const {
        currentStorageSys,
        updateCurrentStorageSys,
        systemListSelectOpt,
        fileList,
        capacity,
        isLoading
    } = useStorageSystem()

    useEffect(() => {
        if (currentStorageSys) currentStorageSys.actions.list()
    }, [currentStorageSys])

    // useEffect(() => {
    //     // storageSys.actions.list()
    //     setIsLoading(true)
    //     setFiles(storageSys.files)
    //     setIsLoading(false)
    // }, [storageSys, list.files, files])

    // useEffect(() => {
    //     // storageSys.actions.list()
    //     console.log(storageSys)
    //     storageSys.actions.list();
    //     setFiles(storageSys.files)
    // }, [storageSys])

    return currentStorageSys && (
        <Panel>
            <Panel.Header>
                <Panel.Title class="h5">
                    {title}
                    <PanelDropdownMenu>
                        {currentStorageSys.actions.list &&
                            <Menu.Item>
                                <Button link block onClick={() => { currentStorageSys.actions.list() }}>
                                    <RefreshCcw size={16} /> Refresh
                                </Button>
                            </Menu.Item>}
                        {currentStorageSys.actions.mkdir &&
                            <Menu.Item>
                                <Button link block onClick={currentStorageSys.actions.mkdir}>Create dir</Button>
                            </Menu.Item>}
                        {currentStorageSys.actions.upload &&
                            <Menu.Item>
                                <Button link block onClick={() => {
                                    modals.addModal({
                                        title: 'Upload new file',
                                        content: <UploadForm currentPath={currentPath} />,
                                    })
                                }}><Upload size={16} /> Upload</Button>
                            </Menu.Item>}
                    </PanelDropdownMenu>
                </Panel.Title>
            </Panel.Header>
            <Panel.Nav>
            </Panel.Nav>
            <Panel.Body>
                {/* <pre>{JSON.stringify(fileList, null, 4)}</pre> */}
                {isLoading && <Loading lg />}
                {!isLoading && <List entries={fileList} />}
            </Panel.Body>
            <Panel.Footer>
                <Field
                    type="select"
                    label="Storage"
                    options={systemListSelectOpt}
                    onChange={(e) => {
                        updateCurrentStorageSys(e.target.value)
                    }}
                />
                <div className="text-muted text-small text-center">
                    {capacity && `${capacity.used} / ${capacity.total}`}
                </div>
                {capacity
                    && <Progress
                        value={Math.round(parseFileSizeString(capacity.used))}
                        max={Math.round(parseFileSizeString(capacity.total))}
                    />}
            </Panel.Footer>
        </Panel>
    )
}

export default FilesPanel