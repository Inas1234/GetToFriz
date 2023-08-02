import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";

const FrontPage: NextPage = () => {

    return (
        <>
            <Head>
                <title>Salon</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar username={"geto"}/>;
            <div className="w-10/12 m-auto my-12 mt-20 bg-gray-300 p-8 rounded-lg shadow-md">
            <div className="relative w-full" style={{ paddingBottom: '32.00%' }}>
                <img
                    src="https://bklyner.com/content/images/bklyner/wp-content/uploads/2019/01/Georges-Barbershop-has-been-in-Brooklyn-for-nearly-forty-years.-The-new-Fort-Greene-location-is-their-third-shop-in-the-neighborhood.jpg"
                    alt="https://via.placeholder.com/1336x768"
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                />
            </div>
                <div className="mt-4 space-y-2">
                    <h1 className="text-4xl font-bold">Frizzy</h1>
                    
                    <p className="text-lg"><strong>Grad:</strong> Zenica</p>
                    <p className="text-lg"><strong>Adresa:</strong> Masarykova 2</p>
                    <p className="text-lg"><strong>Broj telefona:</strong> 123-456-789</p>
                    <p className="text-lg"><strong>Opis:</strong><br></br>Najbolji salon</p>
                    <div className="flex justify-center items-center">
                        <button className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 text-2xl mt-4">
                            Rezerviši
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default FrontPage;