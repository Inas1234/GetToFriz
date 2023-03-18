import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import "../styles/navbar.css";
import "../styles/home.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
