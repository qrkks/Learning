'use client'
import { useParams } from "next/navigation"

function WaitListsDetail() {
    const params = useParams()
    return (
        <div>
            {params?.id}
        </div>
    )
}

export default WaitListsDetail
