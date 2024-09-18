import Link from 'next/link';
function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p>Hello World 2!
      </p>
      <Link href='/about'>About</Link>
    </div>
  )
}

export default Page
