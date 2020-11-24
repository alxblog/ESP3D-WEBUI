import { h } from 'preact';
import { Panel, Button, Menu } from '../../../components/Spectre'
import { Field } from '../../../components/Form/Field'
import { Send } from 'preact-feather';
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'

const TerminalPanel = ({ title }) => (
    <Panel>
        <Panel.Header>
            <Panel.Title class="h5">{title}
                <PanelDropdownMenu>
                    <Menu.Item><Field type="boolean" id="" label="Verbose" /></Menu.Item>
                    <Menu.Item><Field type="boolean" id="" label="Autoscrool" /></Menu.Item>
                    <Menu.Item><a href="#">Clear</a></Menu.Item>
                </PanelDropdownMenu>
            </Panel.Title>
        </Panel.Header>
        <Panel.Body>
            <div id="terminal" >
                <pre>du code par ci</pre>
                <pre>du code par là</pre>
            </div>
            <form >
                <div class="input-group">
                    <input type="text" class="form-input" />
                    <Button class="input-group-btn" primary type="submit"><Send /></Button>
                </div>
            </form>
        </Panel.Body>
        <Panel.Footer />
    </Panel>
)

export default TerminalPanel