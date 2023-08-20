import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { NextPage } from 'next';

const CalendarPage: NextPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = (month: number) => new Date(new Date().getFullYear(), month + 1, 0).getDate();

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'next' && currentMonth === new Date().getMonth()) {
      setCurrentMonth(currentMonth + 1);
    } else if (direction === 'prev' && currentMonth > new Date().getMonth()) {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const daysOfWeek = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
  const monthsInBosnian = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];

  return (
    <div>
      <Head>
        <title>Kalendar</title>
        <meta name="description" content="Select a date for your service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-700 text-center">Odaberite datum</h1>
          <div className="mb-6 flex justify-between">
            {currentMonth > new Date().getMonth() && (
              <button onClick={() => handleMonthChange('prev')} className="text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
              </button>
            )}
            <span className="text-xl">{monthsInBosnian[currentMonth]}</span>
            {currentMonth === new Date().getMonth() && (
              <button onClick={() => handleMonthChange('next')} className="text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
              </button>
            )}
          </div>
          <div className="grid grid-cols-7 gap-4">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center font-bold text-gray-600">{day}</div>
            ))}
            {Array.from({ length: (new Date(new Date().getFullYear(), currentMonth, 1).getDay() + 6) % 7 }).map((_, index) => (
              <div key={index} className="bg-gray-200 py-4 px-4 rounded w-full"></div>
            ))}
            {Array.from({ length: daysInMonth(currentMonth) }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDateSelection(new Date(new Date().getFullYear(), currentMonth, index + 1))}
                className="bg-blue-500 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 w-full"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CalendarPage;