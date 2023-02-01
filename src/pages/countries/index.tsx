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
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-blue-800 p-36 text-xl text-white">
        {data && (
          <ul className="grid grid-cols-2 gap-10">
            {data.countries.map((country) => (
              <Link href={`/countries/${country.code}`} key={country.code}>
                <li className="display flex items-center justify-center font-medium text-xl rounded-lg bg-blue-600 p-5 shadow-md">
                  {country.name}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Countries;
