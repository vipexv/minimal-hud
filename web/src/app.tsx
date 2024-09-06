import { useNuiEvent } from "@/hooks/useNuiEvent.ts";
import { useState, useEffect } from "react";
import { useExitListener } from "./hooks/useExitListener";
import { isEnvBrowser } from "./utils/misc";
import { debug, setDebugMode } from "./utils/debug";
import { fetchNui } from "./utils/fetchNui";

if (isEnvBrowser()) {
    const body = document.body;

    body.style.backgroundColor = "#242424";
    debug("App loaded in browser");
}

export function App() {
    const [visible, setVisible] = useState(true);

    useNuiEvent("setVisible", setVisible);

    // Waits for the ESC Key to be triggered and closes the NUI.
    useExitListener(setVisible);

    // Grabs any necessery data from the client once the app is loaded.
    useEffect(() => {
        fetchNui("uiLoaded")
            .then((res) => {
                setDebugMode(res.debug ?? false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if (!visible) {
        debug("(App) Returning with no children since the app is not visible.");
        return <></>;
    }

    return (
        <>
            <p className="text-5xl font-geist">Hello World!</p>
        </>
    );
}
