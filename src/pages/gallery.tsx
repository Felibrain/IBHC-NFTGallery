import type { NextPage } from "next";
import Head from "next/head";
import { GalleryView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>IBHC NFT Gallery!</title>
        <meta name="description" content="Search and display NFTs from wallet address" />
      </Head>
      <GalleryView />
    </div>
  );
};

export default Home;
