import React, { useState } from "react";
import { NextPage } from "next";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Head from "next/head";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

const TimeTable: NextPage = () => {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: string }>({});
  const daysOfWeek = ["Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
  const hoursOfDay = Array.from({ length: 10 }, (_, i) => 7 + i);
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Šišanje', price: 20, duration: 30 },
    { id: 2, name: 'Brijanje', price: 15, duration: 30 },
  ]);

  const selectHour = (day: string, hour: number) => {
    if (!bookedSlots[`${day}-${hour}`]) {
      setSelectedHour(hour);
      setSelectedDay(day);
      setModalOpen(true);
    }
  };

  const bookService = (service: string) => {
    setBookedSlots({ ...bookedSlots, [`${selectedDay}-${selectedHour}`]: service });
    setModalOpen(false);
    setSelectedHour(null);
    setSelectedDay(null);
    setSelectedService(null);
  };

  return (
    <>
    <Head>
        <title>Rezervacija</title>
        <meta name="description" content="Edit Price Menu" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar username={"geto"} loginStatus={false}/>;
    <div className="p-4 mt-14">
      <h1 className="mb-4 text-xl font-bold">Rezervacija termina</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              {daysOfWeek.map((day, i) => (
                <th key={i} className="px-4 py-2 w-1/5 text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hoursOfDay.map((hour, i) => (
              <tr key={i}>
                {daysOfWeek.map((day, j) => (
                  <td key={j} className="border px-4 py-2">
                    <span className="text-gray-500 text-left mr-16 w-24 inline-block">{hour}:00 - {hour + 1}:00</span>
                    {bookedSlots[`${day}-${hour}`] ? 
                      <button className="py-1 bg-red-500 w-28 text-white rounded" disabled>
                        REZERVISANO
                      </button> :
                        
                        <button className="py-1 bg-green-500 w-28 text-white rounded" onClick={() => selectHour(day, hour)}>
                          REZERVIŠI
                        </button>
                      
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {modalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h2 className="mb-2 text-md font-bold">Odaberite uslugu:</h2>
                  {services.map((service) => (
                    <div key={service.id} className="bg-blue-50 p-6 rounded-lg flex items-center text-left shadow-md mb-4">
                      <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h2>
                        <p className="text-gray-700">{service.price} KM</p>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-500">{service.duration} minuta</span>
                      </div>
                      <button className="ml-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200" onClick={() => bookService(service.name)}>
                        Zakaži
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TimeTable;