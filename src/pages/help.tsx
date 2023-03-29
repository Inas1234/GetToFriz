import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import Link from "next/link";

const Help: NextPage = () => {
    return (
        <>
            <Head>
                <title>Help | My App</title>
            </Head>
            <Navbar username={"geto"} loginStatus/>

            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8 mt-12">Centar za pomoć</h1>
                <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">FAQs</h2>
                    <div className="prose">
                        <h3 className="font-bold">Kako da kreiram nalog?</h3>
                        <p>Da kreirate nalog, kliknite na dugme "Registracija" u gornjem desnom uglu stranice i pratite uputstva.</p>

                        <h3 className="font-bold">Kako da resetujem svoju lozinku?</h3>
                        <p>Za resetiranje lozinke kliknite na "Zaboravljena lozinka?" link na stranici za prijavu i slijedite upute.</p>

                        <h3 className="font-bold">Kako da kontaktiram podršku?</h3>
                        <p>Možete kontaktirati naš tim za podršku putem e-pošte na support@example.com ili telefonom na +1 (123) 456-7890.</p>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
                    <div className="prose">
                        <p>Ako imate bilo kakvih pitanja ili nedoumica, ne ustručavajte se kontaktirati nas:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>
                                <FaEnvelope className="inline-block mr-2" />
                                Email: support@example.com
                            </li>
                            <li>
                                <FaPhoneAlt className="inline-block mr-2" />
                                Telefon: +1 (123) 456-7890
                            </li>
                        </ul>
                        <p>Naš tim za podršku dostupan je 24/7 da vam pomogne oko bilo kakvih problema ili pitanja koja imate.</p>
                    </div>
                    </div>
                <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Politika privatnosti</h2>
                    <div className="prose">
                        <p>Naša politika privatnosti objašnjava kako prikupljamo, koristimo i štitimo vaše lične podatke:</p>
                            <ul className="list-disc pl-6 mb-4">
                            <li>Prikupljamo lične podatke kao što su vaše ime, adresa e-pošte i podaci o naplati kada se prijavite za našu uslugu.</li>
                            <li>Koristimo vaše lične podatke kako bismo pružili i poboljšali našu uslugu i komunicirali s vama o vašem računu.</li>
                            <li>Vaše lične podatke štitimo standardnim sigurnosnim mjerama i procedurama.</li>
                        </ul>
                        <p>Za više informacija, molimo pročitajte našu <Link href="/privacy" className="text-blue-700">politiku privatnosti</Link>.</p>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Uslovi korištenja</h2>
                    <div className="prose">
                        <p>Naši uslovi pružanja usluge navode odredbe i uslove koji regulišu vaše korištenje naše usluge:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Morate imati najmanje 12 godina da biste koristili našu uslugu.</li>
                            <li>Ne smijete koristiti našu uslugu u bilo koju nezakonitu ili neovlaštenu svrhu.</li>
                            <li>Vi ste odgovorni za održavanje sigurnosti vašeg naloga i lozinke.</li>
                            <li>Zadržavamo pravo ukinuti ili suspendirati vaš račun u bilo koje vrijeme iz bilo kojeg razloga.</li>
                        </ul>
                        <p>Koristeći našu uslugu, slažete se da ćete biti vezani za naše uslove korištenja.</p>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">O nama</h2>
                    <div className="prose">
                        <p>Mi smo tim posvećenih profesionalaca posvećenih pružanju najbolje moguće usluge našim klijentima.</p>
                        <p>Naša misija je pomoći našim klijentima da ostvare svoje ciljeve pružajući im alate i resurse koji su im potrebni za uspjeh.</p>
                        <p>Ako imate bilo kakve povratne informacije ili prijedloge kako možemo poboljšati našu uslugu, javite nam!</p>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Help;