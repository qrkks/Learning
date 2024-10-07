'use client'
import { Button } from "@/components/ui/button"
import { useState } from "react"

function Add() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <Button onClick={() => setCount((count) => count + 1)}>{count}</Button>
        </div>
    )
}

export default Add
