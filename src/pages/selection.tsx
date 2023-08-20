import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { NextPage } from 'next';

const PeopleSelection: NextPage = () => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const people = [
    { id: 1, name: 'Geto Kovač' },
    { id: 2, name: 'Mlinjo Mlinasić' },
    { id: 3, name: 'Mirsad Softić' },
  ];

  const handlePersonSelection = (personName: string) => {
    setSelectedPerson(personName);
  };

  return (
    <div>
      <Head>
        <title>Frizeri</title>
        <meta name="description" content="Select a person for your service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl text-center font-bold mb-6 text-gray-700">Izaberite frizera</h1>
          <div className="flex flex-col items-center mb-6">
            {people.map((person) => (
              <button
                key={person.id}
                onClick={() => handlePersonSelection(person.name)}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 mb-4 w-full ${
                  selectedPerson === person.name ? 'bg-blue-600' : ''
                }`}
              >
                {person.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PeopleSelection;
