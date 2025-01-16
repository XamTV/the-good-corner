import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_USER } from "../services/mutations";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [doCreateUser, { loading, data }] = useMutation(CREATE_USER);

  async function doSubmit() {
    try {
      await doCreateUser({
        variables: {
          data: {
            email,
            hashedPassword: password,
          },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      if (error.message.includes("hashedPassword is not strong enough")) {
        setError("Probleme de Mot de passe");
      } else if (error.message.includes("email must be an email")) {
        setError("Probleme d'email");
      } else {
        setError("Un compte avec cette adresse existe deja");
      }
    }
  }
  if (loading) {
    return <p>Chargement...</p>;
  }

  if (data) {
    return (
      <>
        <p>Compte bien enregistré , tu peux maintenant te connecter</p>
        <Link to="/signin" className="button">
          <button className="hidden md:inline mt-4">Se Connecter</button>
        </Link>
      </>
    );
  }
  return (
    <div
      className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-lg"
      style={{ maxHeight: "calc(100vh - 20px)" }}
    >
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="overflow-y-auto max-h-[80vh]">
        <h1>S'enregistrer</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            doSubmit();
          }}
          className="space-y-6"
        >
          <div>
            <label className="block font-medium text-lg">Email *</label>
            <input
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium text-lg">Mot de passe *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white rounded-md px-6 py-2 hover:bg-green-600"
          >
            S'Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
