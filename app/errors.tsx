"use client"
import React from "react";

interface NextError {
    error: Error,
    reset: () => void
}

export default function GlobalError({error, reset}: NextError) {
    React.useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong</h2>
            <button onClick={() => reset()}>Reload</button>
        </div>
    )
}
