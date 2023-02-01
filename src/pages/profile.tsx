import { useQuery } from "@apollo/client";
import Link from "next/link";
import { graphql } from "../gql";

const getPoland = graphql(`
  query getPoland {
    country(code: "PL") {
      name
      code
    }
  }
`);

export const Profile = () => {
  const { data, loading, error } = useQuery(getPoland);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-5xl">Loading...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-5xl">Error!</h1>
      </main>
    );
  }

  if (data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="mb-10  text-5xl">You are from:</h1>
        {data.country ? (
          <Link href={`/countries/${data.country.code}`}>
            <section className="rounded-lg bg-blue-600/75 hover:bg-blue-500/75 p-5 shadow-md">
              <h2 className="text-4xl">{data?.country.name}</h2>
              <h3 className="text-3xl">{data?.country.code}</h3>
            </section>
          </Link>
        ) : null}
      </main>
    );
  }
};

export default Profile;
