'use strict';

import App from "./App.svelte";
import "normalize.css/normalize.css";
import "sweetalert2/dist/sweetalert2.min.css";

export interface Props {
    name: string;
};

export const props: Props = {
    "name": `People, etc. 3`
};

const app = new App({
    "target": document.getElementById(`root`),
    props,
});

export default app;
