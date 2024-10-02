import Link from 'next/link'
import React from 'react'

const Button = (props) => {
  return (
    <Link href={props.link} className="inline-block px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600">{props.children}</Link>
  )
}

export default Button