import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>University Lookup</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.1.1/tailwind.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="flex min-h-screen justify-center flex-col items-center">
        <h1 className="font-bold text-2xl ">Universiy Lookup</h1>
        <p>By Kobi <a href="https://github.com/kobito-kun"><i className="fab fa-github"></i></a></p>
        <div>
        <Link href="/uni/name">
          <button className="py-2 px-4 bg-black font-bold text-white rounded-lg shadow m-2 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black focus:text-black hover:text-red-600">Search By Name</button>
        </Link>
        <Link href="uni/country">
          <button className="py-2 px-4 bg-black font-bold text-white rounded-lg shadow m-2 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black focus:text-black hover:text-red-600">Search By Country</button>
        </Link>
        </div>
      </div>      
    </div>
  )
}