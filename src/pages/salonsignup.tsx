import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "../utils/api";
import Link from "next/link";
import { useEffect } from "react";
import aws from "aws-sdk";
import { bool } from "aws-sdk/clients/signer";
import { set } from "zod";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import e from "express";
import { useRouter } from "next/router";

type InputState = {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  vrijeme_od: string;
  vrijeme_do: string;
  description: string;
  city: string;
  address: string;
  premium: boolean;
};

type PaymentInfo = {
  cardNumber: string;
  expDate: string;
  cvv: string;
};
const initialOptions = {
  clientId: "test",
  currency: "USD",
  intent: "capture",
};
const SalonSignup: NextPage = () => {
  const [step, setStep] = useState<number>(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  const [error, setError] = useState<boolean>(false);

  const [checkedMale, setCheckedMale] = useState<boolean>(false);
  const [checkedFemale, setCheckedFemale] = useState<boolean>(false);
  const [checkedMonthly, setCheckedMonthly] = useState<boolean>(false);
  const [checkedYearly, setCheckedYearly] = useState<boolean>(false);
  const [input, setInput] = useState<InputState>({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    vrijeme_od: "",
    vrijeme_do: "",
    description: "",
    city: "",
    address: "",
    premium: false,
  });

  const { mutate: createSalon } = api.salons.createSalon.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] ?? null);
  };

  const imagePath = imageFile ? URL.createObjectURL(imageFile) : null;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value });
  };

  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, expDate: e.target.value });
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, cvv: e.target.value });
  };
  const router = useRouter();
  const handleNextStep = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const requirements = [
      input.password.length >= 8,
      /[A-Z]/.test(input.password),
      /[0-9]/.test(input.password),
    ];

    const isPasswordValid = requirements.every(Boolean);
    if (step == 1) {
      if (!isPasswordValid) {
        setError(true);
        return;
      } else setError(false);
    }
    if (step == 2) {
      if (imageFile == null) {
        setError(true);
        return;
      } else setError(false);
    }
    if (step < 3) {
      setStep((prevStep) => prevStep + 1);
    }
    else {
      router.push("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Only allow to signup if only one gender is selected
    if (checkedMale === checkedFemale) {
      alert("Please select only one gender.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile ?? "");

    /*const response = await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();*/
    //console.log(data);

    try {
      const {
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
        vrijeme_od,
        vrijeme_do,
        name,
        city,
        address,
        premium,
      } = input;

      await createSalon({
        email: email,
        firstname: firstName,
        lastname: lastName,
        phoneNumber: phoneNumber,
        password: password,
        openTime: vrijeme_od,
        closeTime: vrijeme_do,
        image: "",
        description: input.description,
        gender: checkedMale ? "Male" : "Female",
        name: name,
        city: city,
        address: address,
        premium: premium,
      });
    } catch (error) {
      console.error(error);
      alert("There was an issue with signup.");
    }
  };

  return (
    <>
      <Head>
        <title>Registracija</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" dark:bg-blue-300  md:h-screen">
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
          <div className="m-auto w-full rounded-md bg-timberwolf p-6 shadow-md lg:max-w-xl">
            <h1 className="text-center text-3xl font-semibold text-rich-black ">
              Registracija
            </h1>
            {/* other content */}
            <form className="mt-6" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Naziv salona
                    </label>
                    <input
                      type="name"
                      className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-rich-black focus:ring-opacity-40 dark:placeholder-gray-400"
                      required
                      placeholder="Frizzy"
                      onChange={(e) => {
                        setInput({ ...input, name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-rich-black focus:ring-opacity-40 dark:placeholder-gray-400"
                      required
                      placeholder="john.doe@company.com"
                      onChange={(e) => {
                        setInput({ ...input, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Ime vlasnika
                    </label>
                    <input
                      className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-400"
                      required
                      placeholder="John"
                      onChange={(e) => {
                        setInput({ ...input, firstName: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Prezime vlasnika
                    </label>
                    <input
                      className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-400"
                      required
                      placeholder="Doe"
                      onChange={(e) => {
                        setInput({ ...input, lastName: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Broj telefona
                    </label>
                    <input
                      type="tel"
                      className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-400"
                      required
                      placeholder="123-456-7890"
                      onChange={(e) => {
                        setInput({ ...input, phoneNumber: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Šifra
                    </label>
                    <input
                      type="password"
                      className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-400"
                      required
                      placeholder="•••••••••"
                      onChange={(e) => {
                        setInput({ ...input, password: e.target.value });
                      }}
                    />
                    {error && (
                      <p className="mt-2 font-semibold text-red-500">
                        Šifra mora sadržati: minimalno 8 karaktera, 1 veliko
                        slovo i 1 broj.
                      </p>
                    )}
                  </div>
                  <div className="mb-2 ">
                    <label className="block text-sm font-semibold text-gray-800">
                      Spol
                    </label>
                    <div className="flex items-center justify-center gap-4">
                      <label>Muško</label>
                      <input
                        type="radio"
                        name="gender"
                        onChange={() => {
                          setCheckedMale(true);
                          setCheckedFemale(false);
                        }}
                        className="block rounded-md border bg-white  px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-400"
                      />

                      <label>Žensko</label>
                      <input
                        name="gender"
                        onChange={() => {
                          setCheckedFemale(true);
                          setCheckedMale(false);
                        }}
                        type="radio"
                        className="block rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="mb-2">
                    <label
                      htmlFor="image"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Slika salona
                    </label>

                    <div className="mb-4 flex justify-center">
                      <div className="h-32 w-32 overflow-hidden rounded-full">
                        <img
                          src={imagePath ?? "https://via.placeholder.com/150"}
                          alt="Profile picture"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="mb-4 flex justify-center">
                      <label className="font-medium text-blue-500">
                        Promijeni sliku
                        <input
                          type="file"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                    {error && (
                      <p className="mb-4 flex justify-center font-bold text-red-500">
                        Odaberite sliku
                      </p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Grad
                    </label>
                    <input
                      type="city"
                      className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-rich-black focus:ring-opacity-40 dark:placeholder-gray-400"
                      required
                      placeholder="Zenica"
                      onChange={(e) => {
                        setInput({ ...input, city: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Adresa
                    </label>
                    <input
                      type="address"
                      className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-rich-black focus:ring-opacity-40 dark:placeholder-gray-400"
                      required
                      placeholder="Maserykova 12"
                      onChange={(e) => {
                        setInput({ ...input, address: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-2 ">
                    <label className="block text-sm font-semibold text-gray-800">
                      Radno vrijeme
                    </label>
                    <div className="flex items-center justify-center gap-4">
                      <label>Od</label>
                      <input
                        type="time"
                        name="time"
                        required
                        className="block rounded-md border bg-white  px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-400"
                        onChange={(e) => {
                          setInput({ ...input, vrijeme_od: e.target.value });
                        }}
                      />

                      <label>Do</label>
                      <input
                        name="time"
                        type="time"
                        required
                        className="block rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-400"
                        onChange={(e) => {
                          setInput({ ...input, vrijeme_do: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="image"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Opis {"(opcionalno)"}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full"
                      onChange={(e) => {
                        setInput({ ...input, description: e.target.value });
                      }}
                    />
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="mb-2">
                    <h1 className="mb-5 block text-lg font-semibold text-gray-800">
                      Clanarina
                    </h1>
                    <div className="flex items-center">
                      <input
                        onChange={(e) => {
                          setInput({ ...input, premium: e.target.checked });
                        }}
                        type="checkbox"
                        className="mr-2"
                      ></input>
                      <h1 className="mb-2 block text-lg font-semibold text-gray-800">
                        Postani premium clan
                      </h1>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons></PayPalButtons>
                      </PayPalScriptProvider>
                    </div>
                  </div>
                </>
              )}
              <div className="mt-6">
                <button
                  onClick={step < 3 ? handleNextStep : undefined}
                  type={step < 3 ? "button" : "submit"}
                  className="w-full transform rounded-md bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-prussian-blue focus:bg-blue-600 focus:outline-none"
                >
                  {step < 3 ? "Next Step" : "Submit"}
                </button>
              </div>
            </form>
            {/* other content */}
          </div>
        </div>
      </main>
    </>
  );
};

export default SalonSignup;
