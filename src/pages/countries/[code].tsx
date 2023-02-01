import request from "graphql-request";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { graphql } from "../../gql/gql";
import type { GetCountryQuery } from "../../gql/graphql";
import { getCountries } from "./index";

export const getStaticPaths = async () => {
  const data = await request(
    "https://countries.trevorblades.com/",
    getCountries
  );

  const paths = data.countries.map((country) => ({
    params: { code: country.code },
  }));

  return { paths, fallback: false };
};

const getCountry = graphql(`
  query getCountry($code: ID!) {
    country(code: $code) {
      name
      code
      emoji
      languages {
        name
      }
    }
  }
`);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await request(
    "https://countries.trevorblades.com/",
    getCountry,
    { code: params?.code as string }
  );

  return {
    props: {
      data: data,
    },
  };
};

const Country = ({ data }: { data: GetCountryQuery }) => {
  if (data) {
    const { country } = data;
    return (
      <>
        <Head>
          <title>Jutro Medical task</title>
          <meta charSet="UTF-8" />
        </Head>
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 p-36 text-xl text-white">
          <section>
            <div className="space-y-10">
              <h1 className="text-7xl">{country?.name}</h1>
              <h3 className="text-3xl">Code: {country?.code}</h3>
              <h3 className="text-3xl">Emoji: {country?.emoji}</h3>
            </div>
            <h3 className="mt-10 text-3xl">Languages:</h3>
            <ul className="mt-5">
              {country?.languages.map((language) => (
                <li key={language.name} className="text-xl">
                  {language.name}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  }
};

export default Country;
