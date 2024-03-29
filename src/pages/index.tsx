import { type NextPage } from "next";
import Navbar from "../components/navbar";
import { NextRequest } from "next/server";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import scissorsImg from "../styles/img/scissors.png";
import Footer from "../components/footer";
import Link from "next/link";

const Home: NextPage = (props) => {
  const [items, setItems] = useState<any>([]);

  const data = api.salons.premiumSalons.useQuery();

  useEffect(() => {
    if (data.status === "success") {
      setItems(data.data);
    }
  }, [data.status]);

  return (
    <>
      <Navbar />;
      {/*<div className="flex flex-col justify-center header-photo">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Spremni za{" "}
            <a className="text-blue-600" href="https://nextjs.org">
              frizuru?
            </a>
          </h1>
          </main>
       </div>*/}
      <div className="video-flex flex flex-col items-center justify-evenly space-y-8 sm:mt-16 sm:flex-row lg:space-y-0 ">
        <div className="w-full space-y-2">
          <h1 className="text-center text-4xl font-bold">
            Ne znate se naručiti?
          </h1>
          <video
            controls
            loop
            muted
            autoPlay
            className=" m-auto h-52 object-cover"
          >
            <source src="src\styles\videos\howto.mp4" type="video/mp4" />
          </video>
        </div>
        <img src={scissorsImg.src} className="w-1/12" />
        <div className="w-full space-y-2">
          <h1 className="text-center text-4xl font-bold">
            Želite prijaviti svoj salon?
          </h1>
          <video
            controls
            loop
            muted
            autoPlay
            className=" m-auto h-52 object-cover"
          >
            <source src="src\styles\videos\howto.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="bg-blue m-auto mt-12 w-10/12 p-8">
        <h2 className="mb-4 flex items-center justify-center text-3xl font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="orange"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
          PREPORUČENI SALONI
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="orange"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </h2>
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {items.map((item: any) => (
            <div key={item.id} className="rounded-lg bg-gray-300 p-4 shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="mb-4 h-60 w-full rounded-md object-cover object-center"
              />
              <h3 className="mb-2 flex text-lg font-medium">
                {item.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="orange"
                  className="ml-2 h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </h3>
              <p className="mb-2 text-gray-600">Adresa: {item.description}</p>
              <div className="flex items-center justify-between">
                <span className="invisible font-medium text-gray-800">
                  blank
                </span>
                <Link
                  href={`/${item.id}`}
                  className="rounded-full bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
                >
                  Više informacija
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
