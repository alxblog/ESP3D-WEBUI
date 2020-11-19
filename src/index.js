import { h, render } from "preact"
const root = document.getElementById('root')

import { App } from "./components/App"
import './style/index.scss';
render(
    <App />,
    document.body
)