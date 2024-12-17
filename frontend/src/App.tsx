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
      <header>
        <Navbar />
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </ApolloProvider>
  );
}

export default App;
