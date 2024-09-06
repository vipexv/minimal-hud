import { useNuiEvent } from "@/hooks/useNuiEvent.ts";
import { useEffect, useState } from "react";
import { CarHud } from "./components/car-hud";
import { PlayerStatus } from "./components/player-status";
import { useExitListener } from "./hooks/useExitListener";
import { debug, setDebugMode } from "./utils/debug";
import { fetchNui } from "./utils/fetchNui";
import { isEnvBrowser } from "./utils/misc";

if (isEnvBrowser()) {
    const body = document.body;

    body.style.backgroundColor = "#242424";
    debug("App loaded in browser");
}

export function App() {
    const [visible, setVisible] = useState(true);

    useNuiEvent("setVisible", (state) => {
        const newState = state === null ? !visible : state;
        setVisible(newState);

        debug(`(App) NUI message received: setVisible ${state}`);
    });

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
            <PlayerStatus />
            <CarHud />
        </>
    );
}
