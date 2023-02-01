import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jutro Medical task</title>
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-20 bg-gray-900 text-5xl text-white">
        <Link href="/countries" className="decoration-blue-500 hover:underline">
          Countries
        </Link>
        <Link href="/profile" className="decoration-blue-500 hover:underline">
          Profile
        </Link>
      </main>
    </>
  );
};

export default Home;
