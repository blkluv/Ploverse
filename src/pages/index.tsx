import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Ploverse</title>
        <meta
          name="description"
          content="Leaving a Footprint in the Blockchain Universe with Plogging Service"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
