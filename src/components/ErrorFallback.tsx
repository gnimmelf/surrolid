import { Component, Show } from "solid-js"

export const ErrorFallback: Component<{
    moduleName: string
    error: Error
}> = (props) => {
    return (
        <>
            <h1>Fail {props.moduleName}!</h1>
            <Show when={props.error.name}>
                <p>{props.error.name}</p>
            </Show>
            <Show when={props.error.message}>
                <p>{props.error.message}</p>
            </Show>
            <pre>{JSON.stringify(props.error, null, 2)}</pre>
        </>
    )
}

