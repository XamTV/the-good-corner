import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <header className="fixed top-0 left-0 right-0 p-2 bg-white border-b-white border-solid">
        <Navbar />
      </header>
      <main className="max-w-max mx-auto mt-40">
        <Outlet />
      </main>
    </ApolloProvider>
  );
}

export default App;
