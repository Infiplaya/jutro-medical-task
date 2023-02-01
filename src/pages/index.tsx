import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jutro Medical task</title>
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-blue-800 p-36 text-xl text-white">
        <Link href="/countries">Countries</Link>
        <Link href="/profile">Profile</Link>
      </main>
    </>
  );
};

export default Home;
