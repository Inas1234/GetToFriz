import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import exp from 'constants';
import { NextPage } from 'next';

interface Service {
    id: number;
    name: string;
    price: number;
    duration: number;
  }
  

const ServicesPage: NextPage = () => {
    const [services, setServices] = useState<Service[]>([
        { id: 1, name: 'Šišanje', price: 20, duration: 30 },
        { id: 2, name: 'Brijanje', price: 15, duration: 30  },
        { id: 1, name: 'Šišanje', price: 20, duration: 30  },
        { id: 2, name: 'Brijanje', price: 15, duration: 30  },
    ]);
    const [selectedGender, setSelectedGender] = useState('men');
    
    useEffect(() => {
      fetchServices(selectedGender);
    }, [selectedGender]);
  
    const fetchServices = async (gender: string) => {
      try {
        const response = await axios.get(`/api/services?gender=${gender}`);
        setServices(response.data.services);
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <>
            <Head>
                <title>Services</title>
                <meta name="description" content="View our services" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar username={"geto"} loginStatus={false}/>;

            <div className="flex-grow sm:mt-6">
                <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Our Services
                </h1>

                <div className="flex mb-6">
                    <button
                    onClick={() => setSelectedGender('men')}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 mr-4"
                    >
                    Men's Services
                    </button>

                    <button
                    onClick={() => setSelectedGender('women')}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
                    >
                    Women's Services
                    </button>
                </div>

                <div className="bg-white shadow shadow-gray-700 rounded-lg px-6 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map(service => (
                        <div key={service.id} className="bg-blue-50 p-6 rounded-lg flex items-start text-left shadow-md">
                        <div className="flex-grow">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {service.name}
                            </h2>
                            <p className="text-gray-700">
                            {service.price} KM
                            </p>
                        </div>
                        <div className="flex">
                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-500">
                            {service.duration} minutes
                            </span>
                        </div>
                        </div>
                    ))}
                    </div>

                </div>
            </div>

            <Footer />

        </>
  );
};

export default ServicesPage;
