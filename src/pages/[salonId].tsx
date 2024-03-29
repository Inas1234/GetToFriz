import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../utils/api";

const FrontPage: NextPage = () => {
  type SalonType = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    image: string;
    description: string;
    time_open: string;
    time_close: string;
    city: string;
    address: string;
  };

  const [salon, setSalon] = useState<SalonType | null>(null);
  const router = useRouter();
  const { salonId } = router.query;
  console.log(salonId);

  const salons = api.salons.searchSalobyId.useQuery({ id: salonId as string });
  useEffect(() => {
    if (salons.data) {
      setSalon(salons.data as SalonType);
    }
  }, [salons.data]);

  if (!salon) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Salon</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>;
      <div className="m-auto my-12 mt-20 w-10/12 rounded-lg bg-gray-300 p-8 shadow-md">
        <div className="relative w-full" style={{ paddingBottom: "32.00%" }}>
          <img
            src={salon.image}
            alt="https://via.placeholder.com/1336x768"
            className="absolute top-0 left-0 h-full w-full rounded-md object-cover"
          />
        </div>
        <div className="mt-4 space-y-2">
          <h1 className="text-4xl font-bold">{salon.name}</h1>

          <p className="text-lg">
            <strong>Grad:</strong> {salon.city}
          </p>
          <p className="text-lg">
            <strong>Adresa:</strong> {salon.address}
          </p>
          <p className="text-lg">
            <strong>Broj telefona:</strong> {salon.phoneNumber}
          </p>
          <p className="text-lg">
            <strong>{salon.description ? "Opis:" : ""} </strong>
            <br></br>
            {salon.description}
          </p>
          <div className="flex items-center justify-center">
            <button className="mt-4 rounded bg-blue-500 py-3 px-6 text-2xl text-white hover:bg-blue-600">
              Rezerviši
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FrontPage;
