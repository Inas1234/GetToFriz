import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { api } from "../utils/api";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number | null;
}

const PriceMenu: NextPage = () => {
  const [menServices, setMenServices] = useState<Service[]>([]);

  const [womenServices, setWomenServices] = useState<Service[]>([]);
  const [tokenValue, setTokenValue] = useState<any>("");

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    const tokenValue = token ? token.split("=")[1] : null;
    setTokenValue(tokenValue);
    console.log(tokenValue);
  }, []);
  const mail = api.users.getEmail.useQuery({ token: tokenValue });

  const menServicesQuery = api.salons.getServicesByGender.useQuery({
    gender: "men",
    email: mail.data?.email || "",
  });
  const womenServicesQuery = api.salons.getServicesByGender.useQuery({
    gender: "women",
    email: mail.data?.email || "",
  });

  useEffect(() => {
    if (menServicesQuery.data) {
      const servicesWithId = menServicesQuery.data.map((item, index) => ({
        ...item,
        id: index + 1, // This assumes id starts from 1 and increments.
      }));
      setMenServices(servicesWithId);
    }
    if (womenServicesQuery.data) {
      const servicesWithId = womenServicesQuery.data.map((item, index) => ({
        ...item,
        id: index + 1, // This assumes id starts from 1 and increments.
      }));
      setWomenServices(servicesWithId);
    }
  }, [menServicesQuery.data, womenServicesQuery.data]);

  const handleServiceChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
    services: Service[],
    setServices: React.Dispatch<React.SetStateAction<Service[]>>
  ) => {
    const newServices = services.map((service) => {
      if (service.id === id) {
        if (event.target.name === "name") {
          service.name = event.target.value;
        } else if (event.target.name === "price") {
          service.price = Number(event.target.value);
        } else if (event.target.name === "duration") {
          service.duration = Number(event.target.value);
        }
      }
      return service;
    });
    setServices(newServices);
  };

  const { mutate: addServiceMutation } = api.salons.addService.useMutation();

  const handleSubmit = (services: Service[], gneder: "men" | "women") => {
    services.forEach((service) => {
      addServiceMutation({
        name: service?.name || "",
        price: service?.price || 0,
        duration: service?.duration || 0,
        email: mail.data?.email || "",
        gender: gneder,
        description: "",
      });
    });
  };

  const handleRemoveService = (
    id: number,
    services: Service[],
    setServices: React.Dispatch<React.SetStateAction<Service[]>>
  ) => {
    const newServices = services.filter((service) => service.id !== id);
    setServices(newServices);
  };

  const { mutate: removeServiceMutation } =
    api.salons.deleteService.useMutation();

  const removeService = async (
    id: number,
    services: Service[],
    gender: "men" | "women",
    setServices: React.Dispatch<React.SetStateAction<Service[]>>
  ) => {
    const newServices = services.filter((service) => service.id !== id);
    setServices(newServices);

    await removeServiceMutation({
      email: mail.data?.email || "",
      name: services.find((service) => service.id === id)?.name || "",
      gender: gender,
    });
  };

  const addService = (
    setServices: React.Dispatch<React.SetStateAction<Service[]>>
  ) => {
    setServices((prevServices) => {
      // Find the maximum id from the current list of services
      const maxId = prevServices.length
        ? Math.max(...prevServices.map((s) => s.id))
        : 0;

      return [
        ...prevServices,
        { id: maxId + 1, name: "", price: 0, duration: 0 },
      ];
    });
  };

  return (
    <>
      <Head>
        <title>Price Menu</title>
        <meta name="description" content="Edit Price Menu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />;
      <div className="flex-grow sm:mt-6">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Izmjenjivanje cjenovnika
          </h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white px-6 py-8 shadow shadow-gray-700">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Cjenovnik za muškarce
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(menServices, "men");
                }}
              >
                {menServices.map((service) => (
                  <div
                    key={service.id}
                    className="mb-4 grid grid-cols-11 gap-2"
                  >
                    <label
                      htmlFor={`men-service-name-${service.id}`}
                      className="col-span-5 mb-2 block font-bold text-gray-700"
                    >
                      Naziv usluge
                    </label>
                    <label
                      htmlFor={`women-service-price-${service.id}`}
                      className="col-span-2 mb-2 block font-bold text-gray-700"
                    >
                      Cijena (KM)
                    </label>
                    <label
                      htmlFor={`women-service-price-${service.id}`}
                      className="col-span-3 mb-2 block font-bold text-gray-700"
                    >
                      Trajanje (min)
                    </label>
                    <input
                      type="text"
                      id={`men-service-name-${service.id}`}
                      name="name"
                      value={service.name}
                      onChange={(event) =>
                        handleServiceChange(
                          service.id,
                          event,
                          menServices,
                          setMenServices
                        )
                      }
                      className="focus:shadow-outline col-span-5 mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                    />
                    <input
                      type="number"
                      id={`men-service-price-${service.id}`}
                      name="price"
                      min={0}
                      value={service.price}
                      onChange={(event) =>
                        handleServiceChange(
                          service.id,
                          event,
                          menServices,
                          setMenServices
                        )
                      }
                      className="focus:shadow-outline col-span-2 mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                    />
                    <input
                      type="number"
                      id={`men-service-price-${service.id}`}
                      name="duration"
                      min={0}
                      value={service.duration || ""}
                      onChange={(event) =>
                        handleServiceChange(
                          service.id,
                          event,
                          menServices,
                          setMenServices
                        )
                      }
                      className="focus:shadow-outline col-span-2 mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeService(
                          service.id,
                          menServices,
                          "men",
                          setMenServices
                        )
                      }
                      className="focus:shadow-outline h-10 rounded bg-red-500 py-0 px-0 font-bold text-white hover:bg-red-600 focus:outline-none"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addService(setMenServices)}
                  className="focus:shadow-outline mb-4 mr-5 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:outline-none"
                >
                  Dodaj uslugu
                </button>
                <button
                  type="submit"
                  className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:outline-none"
                >
                  Sačuvaj
                </button>
              </form>
            </div>

            <div className="rounded-lg bg-white px-6 py-8 shadow shadow-gray-700">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Cjenovnik za žene
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(womenServices, "women");
                }}
              >
                {womenServices.map((service) => (
                  <div
                    key={service.id}
                    className="mb-4 grid grid-cols-11 gap-2"
                  >
                    <label
                      htmlFor={`women-service-name-${service.id}`}
                      className="col-span-5 mb-2 block font-bold text-gray-700"
                    >
                      Naziv usluge
                    </label>
                    <label
                      htmlFor={`women-service-price-${service.id}`}
                      className="col-span-2 mb-2 block font-bold text-gray-700"
                    >
                      Cijena (KM)
                    </label>
                    <label
                      htmlFor={`women-service-price-${service.id}`}
                      className="col-span-3 mb-2 block font-bold text-gray-700"
                    >
                      Trajanje (min)
                    </label>
                    <input
                      type="text"
                      id={`women-service-name-${service.id}`}
                      name="name"
                      value={service.name}
                      onChange={(event) =>
                        handleServiceChange(
                          service.id,
                          event,
                          womenServices,
                          setWomenServices
                        )
                      }
                      className="focus:shadow-outline col-span-5 mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                    />
                    <input
                      type="number"
                      id={`women-service-price-${service.id}`}
                      name="price"
                      min={0}
                      value={service.price}
                      onChange={(event) =>
                        handleServiceChange(
                          service.id,
                          event,
                          womenServices,
                          setWomenServices
                        )
                      }
                      className="focus:shadow-outline col-span-2 mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                    />
                    <input
                      type="number"
                      id={`women-service-price-${service.id}`}
                      name="duration"
                      min={0}
                      value={service.duration || ""}
                      onChange={(event) =>
                        handleServiceChange(
                          service.id,
                          event,
                          womenServices,
                          setWomenServices
                        )
                      }
                      className="focus:shadow-outline col-span-2 mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeService(
                          service.id,
                          womenServices,
                          "women",
                          setWomenServices
                        )
                      }
                      className="focus:shadow-outline h-10 rounded bg-red-500 py-0 px-0 font-bold text-white hover:bg-red-600 focus:outline-none"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addService(setWomenServices)}
                  className="focus:shadow-outline mb-4 mr-5 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:outline-none"
                >
                  Dodaj uslugu
                </button>
                <button
                  type="submit"
                  className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:outline-none"
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
