import { type NextPage } from "next";
import Navbar from "../components/navbar";
import { NextRequest } from "next/server";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = (props) => {
  const router = useRouter();
  const [token, setToken] = useState<any>("");
  const [username, setUsername] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token);
      setUsername(router.query.username);
      setEmail(router.query.email);
    }
  }, [router.query]);
  console.log(token);
  const isloggedIn = api.users.isLoggedIn.useQuery({
    token: token,
    email: email,
  });
  const loginStatus = isloggedIn.data !== null && isloggedIn.data !== undefined;

  return <Navbar username={username} loginStatus={loginStatus} />;
};

export default Home;
