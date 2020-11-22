import { h } from 'preact';
import { Button, Panel, Table } from '../../../components/Spectre'
import { Settings } from 'preact-feather';

const PositionsPanel = ({ title }) => (
    <Panel>
        <Panel.Header>
            <Panel.Title class="h5">{title}
                <Button class="settings-dropdown" link><Settings /></Button>
            </Panel.Title>
        </Panel.Header>
        <Panel.Body>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Options</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Heater T0</td>
                        <td>
                            <div class="input-group">
                                <input class="form-input input-sm" type="number" min="0" max="999" id="heaterT0SelectedTemp" value="0" />
                                <span class="input-group-addon addon-sm">°C</span>
                                <button class="btn btn-primary input-group-btn btn-sm">Set</button>
                                <button class="btn input-group-btn btn-sm">Off</button>
                            </div>
                        </td>
                        <td>204.7°C</td>
                    </tr>
                    <tr>
                        <td>Heater T1</td>
                        <td>
                            <div class="input-group">
                                <input class="form-input input-sm" type="number" min="0" max="999" id="heaterT1SelectedTemp" value="0" />
                                <span class="input-group-addon addon-sm">°C</span>
                                <button class="btn btn-primary input-group-btn btn-sm">Set</button>
                                <button class="btn input-group-btn btn-sm">Off</button>
                            </div>
                        </td>
                        <td>204.7°C</td>
                    </tr>
                    <tr>
                        <td>Heat Bed</td>
                        <td>
                            <div class="input-group">
                                <input class="form-input input-sm" type="number" min="0" max="999" id="heaterT0SelectedTemp" value="0" />
                                <span class="input-group-addon addon-sm">°C</span>
                                <button class="btn btn-primary input-group-btn btn-sm">Set</button>
                                <button class="btn input-group-btn btn-sm">Off</button>
                            </div>
                        </td>
                        <td>30.2°C</td>
                    </tr>
                </tbody>
            </Table>
        </Panel.Body>
        <Panel.Footer />
    </Panel>
)

export default PositionsPanel