import { h, render } from "preact"
import "preact/debug"; //temp preact devtool integration
const root = document.getElementById('root')

import { App } from "./components/App"
import './style/index.scss';

render(
    <App />,
    document.body
)
