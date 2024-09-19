import Link from 'next/link';
function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Hello World 2!
      </h1>
      <Link href='/about'>About</Link>
    </main>
  )
}

export default Page
