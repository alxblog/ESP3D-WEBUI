import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { Button, Menu, Divider } from '../../components/Spectre'
import { MoreVertical, Slash } from 'preact-feather';

export const ItemDropdown = ({ actions = [] }) => {
    const fileDropDownMenu = useRef()
    return (
        <div class="dropdown dropdown-right" ref={fileDropDownMenu}>
            <Button class="dropdown-toggle"
                action
                link
                onClick={() => fileDropDownMenu.current.focus()}
            >
                <MoreVertical />
            </Button>
            <Menu>
                {actions.map(({ icon = <Slash />, name = '', divider, fn }) =>
                    (divider) ? <Divider /> :
                        <Menu.Item>
                            <Button link block onClick={fn}>
                                {icon} {name}
                            </Button>
                        </Menu.Item>
                )}
            </Menu>
        </div>
    )
}