import { type NextPage } from "next";
import Map from "../../components/map";
import Navbar from "../../components/navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Map></Map>
    </div>
  );
};

export default Home;
