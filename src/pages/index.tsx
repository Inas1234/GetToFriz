import { type NextPage } from "next";
import Navbar from "./components/navbar";

import { api } from "../utils/api";

const Home: NextPage = () => {
  return(
    <Navbar username="geto" loginStatus/>
  )
  
};

export default Home;
