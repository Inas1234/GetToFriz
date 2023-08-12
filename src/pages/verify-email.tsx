import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import Link from "next/link";
import { NextPage } from "next";

const ConfirmEmail: NextPage = () => {
  const router = useRouter();
  const [emailToken, setEmailToken] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.token) {
      setEmailToken(router.query.token as string);
    }
  }, [router.query]);

  useEffect(() => {
    if (emailToken) {
      confirmEmailToken(emailToken);
    }
  }, [emailToken]);

  const { mutate: confirmEmail } = api.users.confirmEmail.useMutation({
    onSuccess: (user) => {
        if (user.activated) {
        router.push("/login"); // Redirect to login after successful confirmation
        } else {
        // Handle the case where the user was not activated
        console.error("Failed to activate user");
        }
    },
    onError: (error) => {
        console.error("Error confirming email", error);
    },
  });

  const confirmEmailToken = async (emailToken: string) => {
  
    confirmEmail({ token: emailToken });
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Potvrda Email-a</h1>
        <p className="text-gray-600 mb-4">Potvrđujemo vaš email...</p>
        <p className="text-gray-500">
          Ako niste preusmjereni u roku od 10 sekundi,
          <Link href="/login" className="text-blue-500 ml-2">
            pritisnite ovdje {""}
          </Link>
          da se prijavite.
        </p>
      </div>
    </div>
  );
};

export default ConfirmEmail;
