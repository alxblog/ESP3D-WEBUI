import { h } from 'preact';
import { Panel, Button } from '../../../components/Spectre'
import File from '../../../components/File'
import { Settings } from 'preact-feather';


const FilesPanel = ({ title }) => (
    <Panel>
        <Panel.Header>
            <Panel.Title class="h5">{title}
                <Button class="float-right" link><Settings /></Button>
            </Panel.Title>
        </Panel.Header>
        <Panel.Body>
            <File />
        </Panel.Body>
        <Panel.Footer>Footer</Panel.Footer>
    </Panel>
)

export default FilesPanel