import { type NextPage } from "next";
import Navbar from "../components/navbar";
import { NextRequest } from "next/server";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import scissorsImg from "../styles/img/scissors.png";
import Footer from "../components/footer";

const Home: NextPage = (props) => {

  const items = [
    {
      id: 1,
      title: 'Item 1',
      image: 'https://bklyner.com/content/images/bklyner/wp-content/uploads/2019/01/Georges-Barbershop-has-been-in-Brooklyn-for-nearly-forty-years.-The-new-Fort-Greene-location-is-their-third-shop-in-the-neighborhood.jpg',
      description: 'Description for Item 1',
    },
    {
      id: 2,
      title: 'Item 2',
      image: 'https://images.saymedia-content.com/.image/t_share/MTc0MzkzOTk4NTc0NjI2NDM4/barber-shop-names.jpg',
      description: 'Description for Item 2',
    },
    {
      id: 3,
      title: 'Item 3',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ69NJh_tkHvIvN_7CJVvF0evHtjXqjBsU0ifNUmOclZhwTaAw4z9OsNrgl1FxQJd9Q9Gs&usqp=CAU',
      description: 'Description for Item 3',
    },
    {
      id: 4,
      title: 'Item 4',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRaclPWBvIUxySBepSJeGX6Kzin1wujZDI10yQi8UJBBfWmJiQ9ZIZO8BkavbqWUeD460&usqp=CAU',
      description: 'Description for Item 4',
    },
  ];


  const router = useRouter();
  const [token, setToken] = useState<any>("");
  const [username, setUsername] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token);
      setUsername(router.query.username);
      setEmail(router.query.email);
    }
  }, [router.query]);
  console.log(token);
  const isloggedIn = api.users.isLoggedIn.useQuery({
    token: token,
    email: email,
  });
  const loginStatus = isloggedIn.data !== null && isloggedIn.data !== undefined;

  return(
    <>
      <Navbar username={username} loginStatus={loginStatus} />;

      {/*<div className="flex flex-col justify-center header-photo">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Spremni za{" "}
            <a className="text-blue-600" href="https://nextjs.org">
              frizuru?
            </a>
          </h1>
          </main>
       </div>*/}

      <div className="sm:mt-16 flex sm:flex-row flex-col lg:space-y-0 space-y-8 video-flex items-center justify-evenly ">
        <div className="space-y-2 w-full">
          <h1 className="text-4xl font-bold text-center">Ne znate se naručiti?</h1>
          <video
            controls
            loop
            muted
            autoPlay
            className=" m-auto h-52 object-cover"
          >
            <source src="src\styles\videos\howto.mp4" type="video/mp4"/>
          </video>
        </div>
        <img src={scissorsImg.src} className="w-1/12"/>
        <div className="space-y-2 w-full">
          <h1 className="text-4xl font-bold text-center">Želite prijaviti svoj salon?</h1>
          <video
            controls
            loop
            muted
            autoPlay
            className=" m-auto h-52 object-cover"
          >
            <source src="src\styles\videos\howto.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>

    <div className="bg-blue p-8 m-auto w-10/12 mt-12">
      
      <h2 className="text-3xl flex items-center justify-center font-medium mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-6 h-6">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
      </svg>
        PREPORUČENI SALONI
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-6 h-6">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
      </svg>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-6">
        {items.map((item) => (
          <div key={item.id} className="bg-gray-300 p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.title} className="w-full h-60 object-cover object-center mb-4 rounded-md" />
            <h3 className="text-lg font-medium mb-2 flex">{item.title}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-6 h-6 ml-2">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            </h3>
            <p className="text-gray-600 mb-2">Adresa: {item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium invisible">blank</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
                Više informacija
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      <Footer/>
</>
  ) 
};

export default Home;
