import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Print() {

    let { name } = useParams();
    const [form, setForm] = useState(null as any)
    useEffect(() => {
        //load form
    }, [])

    const openInNewTab = () => {
        window.open(`${window.location.origin}/print/${name}`)

    }
    return (<>
        <button onClick={openInNewTab}>XXX</button>
        PRINT {name}
    </>)
}