import { h } from 'preact';
import { Panel, Button } from '../../../components/Spectre'
import { Settings, Send } from 'preact-feather';

const TerminalPanel = ({ title }) => (
    <Panel>
        <Panel.Header>
            <Panel.Title class="h5">{title}
                <Button class="float-right" link><Settings /></Button>
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