'use client'
import React from 'react'
import useSWR from 'swr'

const Check = () => {
    const { data, error } = useSWR('http://localhost:8000/api/check-headers', (url) => fetch(url).then((res) => res.json()))
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Check