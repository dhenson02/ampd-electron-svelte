'use strict';

import App from "./App.svelte";
import "normalize.css/normalize.css";
import "sweetalert2/dist/sweetalert2.min.css";

interface Props {
    name: string;
};

const props: Props = {
    "name": `People, etc. 3`
};

const app = new App({
    "target": document.getElementById(`root`),
    props,
});

export default app;
