import { useNuiEvent } from "@/hooks/useNuiEvent.ts";
import { useEffect, useState } from "react";
import { CarHud } from "./components/car-hud";
import { Compass } from "./components/compass";
import { PlayerStatus } from "./components/player-status";
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
        const newState = state === "toggle" ? !visible : state;
        setVisible(newState);

        debug(
            `(App) NUI message received: setVisible ${state}`,
            `newState: ${newState}`
        );
    });

    useEffect(() => {
        fetchNui("uiLoaded")
            .then((res) => {
                setDebugMode(res.debug ?? false);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                debug("(App) fetched uiLoaded callback");
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
            <Compass />
        </>
    );
}
