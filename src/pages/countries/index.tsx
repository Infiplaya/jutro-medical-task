import request from "graphql-request";
import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { graphql } from "../../gql/gql";
import { type GetCountriesQuery } from "../../gql/graphql";

export const getCountries = graphql(`
  query GetCountries {
    countries {
      name
      code
    }
  }
`);

export const getStaticProps: GetStaticProps = async () => {
  const data = await request(
    "https://countries.trevorblades.com/",
    getCountries
  );

  return {
    props: {
      data,
    },
  };
};

const Countries: NextPage<{ data: GetCountriesQuery }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Countries</title>
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600 p-10 text-xl text-white">
        {data && (
          <ul className="grid grid-cols-2 gap-10">
            {data.countries.map((country) => (
              <Link href={`/countries/${country.code}`} key={country.code}>
                <li className="flex h-24 items-center justify-center rounded-lg bg-white/10 text-center text-base font-medium shadow-md hover:bg-white/20 lg:h-28 lg:w-72 lg:text-xl">
                  {country.name} ({country.code})
                </li>
              </Link>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default Countries;
