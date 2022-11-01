import type { NextPage } from "next";
import Header from "../components/Header";
import Guess from "../components/Card/Guess";

const Home: NextPage = (windowSize: any) => {
  const size = windowSize.size;

  return (
    <>
      <div>
        <Header />
        <Guess />
      </div>
    </>
  );
};

export default Home;
