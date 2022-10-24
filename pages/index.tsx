import type { NextPage } from "next";
import Header from "../components/Header";
import Guess from "../components/Card/Guess";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div>
        <Guess />
      </div>
    </>
  );
};

export default Home;
