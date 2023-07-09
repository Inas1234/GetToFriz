import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

const PriceMenu: NextPage = () => {
  const [menServices, setMenServices] = useState<Service[]>([
    { id: 1, name: 'Šišanje', price: 20, duration: 30  },
    { id: 2, name: 'Brijanje', price: 15, duration: 30  },
  ]);

  const [womenServices, setWomenServices] = useState<Service[]>([
    { id: 1, name: 'Šišanje', price: 30, duration: 30  },
    { id: 2, name: 'Farbanje', price: 50, duration: 30  },
  ]);

  const handleServiceChange = (id: number, event: React.ChangeEvent<HTMLInputElement>, services: Service[], setServices: React.Dispatch<React.SetStateAction<Service[]>>) => {
    const newServices = services.map(service => {
      if (service.id === id) {
        if (event.target.name === 'name') {
          service.name = event.target.value;
        } else if (event.target.name === 'price') {
          service.price = Number(event.target.value);
        } else if (event.target.name === 'duration') {
          service.duration = Number(event.target.value);
        }
      }
      return service;
    });
    setServices(newServices);
  };

  const handleRemoveService = (id: number, services: Service[], setServices: React.Dispatch<React.SetStateAction<Service[]>>) => {
    const newServices = services.filter(service => service.id !== id);
    setServices(newServices);
  };

  const removeService = async (id: number, services: Service[], setServices: React.Dispatch<React.SetStateAction<Service[]>>) => {
    const newServices = services.filter(service => service.id !== id);
    setServices(newServices);

    // Make an API request to delete the service
    try {
      await axios.delete(`/api/services/${id}`);
      console.log('Service deleted successfully');
    } catch (error) {
      console.error('An error occurred while deleting the service', error);
    }
};

  const addService = (setServices: React.Dispatch<React.SetStateAction<Service[]>>) => {
    setServices(prevServices => [...prevServices, { id: prevServices.length + 1, name: '', price: 0, duration: 0  }]);
  };

  return (
    <>
      <Head>
        <title>Price Menu</title>
        <meta name="description" content="Edit Price Menu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar username={"geto"} loginStatus={false}/>;

      <div className="flex-grow sm:mt-6">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Izmjenjivanje cjenovnika
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow shadow-gray-700 rounded-lg px-6 py-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Cjenovnik za muškarce
              </h2>

              <form>
                {menServices.map(service => (
                    <div key={service.id} className="grid grid-cols-11 gap-2 mb-4">
                      <label
                        htmlFor={`men-service-name-${service.id}`}
                        className="block text-gray-700 font-bold mb-2 col-span-5"
                      >
                        Naziv usluge
                      </label>
                      <label
                        htmlFor={`women-service-price-${service.id}`}
                        className="block text-gray-700 font-bold mb-2 col-span-2"
                      >
                        Cijena (KM)
                      </label>
                      <label
                        htmlFor={`women-service-price-${service.id}`}
                        className="block text-gray-700 font-bold mb-2 col-span-3"
                      >
                        Trajanje (min)
                      </label>
                      <input
                          type="text"
                          id={`men-service-name-${service.id}`}
                          name="name"
                          value={service.name}
                          onChange={(event) => handleServiceChange(service.id, event, menServices, setMenServices)}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 col-span-5"
                        />
                        <input
                          type="number"
                          id={`men-service-price-${service.id}`}
                          name="price"
                          min={0}
                          value={service.price}
                          onChange={(event) => handleServiceChange(service.id, event, menServices, setMenServices)}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 col-span-2"
                        />
                        <input
                          type="number"
                          id={`men-service-price-${service.id}`}
                          name="duration"
                          min={0}
                          value={service.duration}
                          onChange={(event) => handleServiceChange(service.id, event, menServices, setMenServices)}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 col-span-2"
                        />
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service.id, menServices, setMenServices)}
                        className="bg-red-500 text-white font-bold py-0 px-0 h-10 rounded focus:outline-none focus:shadow-outline hover:bg-red-600"
                      >
                        X
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => addService(setMenServices)}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 mb-4 mr-5"
                >
                  Dodaj uslugu
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
                >
                  Sačuvaj
                </button>
              </form>
            </div>

            <div className="bg-white shadow shadow-gray-700 rounded-lg px-6 py-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Cjenovnik za žene
              </h2>

              <form>
                {womenServices.map(service => (
                    <div key={service.id} className="grid grid-cols-11 gap-2 mb-4">
                      <label
                        htmlFor={`women-service-name-${service.id}`}
                        className="block text-gray-700 font-bold mb-2 col-span-5"
                      >
                        Naziv usluge
                      </label>
                      <label
                        htmlFor={`women-service-price-${service.id}`}
                        className="block text-gray-700 font-bold mb-2 col-span-2"
                      >
                        Cijena (KM)
                      </label>
                      <label
                        htmlFor={`women-service-price-${service.id}`}
                        className="block text-gray-700 font-bold mb-2 col-span-3"
                      >
                        Trajanje (min)
                      </label>
                      <input
                          type="text"
                          id={`women-service-name-${service.id}`}
                          name="name"
                          value={service.name}
                          onChange={(event) => handleServiceChange(service.id, event, womenServices, setWomenServices)}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 col-span-5"
                        />
                        <input
                          type="number"
                          id={`women-service-price-${service.id}`}
                          name="price"
                          min={0}
                          value={service.price}
                          onChange={(event) => handleServiceChange(service.id, event, womenServices, setWomenServices)}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 col-span-2"
                        />
                        <input
                          type="number"
                          id={`women-service-price-${service.id}`}
                          name="duration"
                          min={0}
                          value={service.duration}
                          onChange={(event) => handleServiceChange(service.id, event, womenServices, setWomenServices)}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 col-span-2"
                        />
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service.id, womenServices, setWomenServices)}
                        className="bg-red-500 text-white font-bold py-0 px-0 h-10 rounded focus:outline-none focus:shadow-outline hover:bg-red-600"
                      >
                        X
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => addService(setWomenServices)}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 mb-4 mr-5"
                >
                  Dodaj uslugu
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
                >
                  Sačuvaj
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
};

export default PriceMenu;
