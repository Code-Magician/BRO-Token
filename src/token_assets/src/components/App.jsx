import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";
import { token, canisterId, createActor } from "../../../declarations/token/index";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";

function App() {

  async function getAuthenticatedCanister() {
    const identity = await (await getAuthenticatedUser()).getIdentity();

    const authenticatedCanister = await createActor(canisterId, {
      actorOptions: {
        identity,
      }
    });

    return authenticatedCanister;
  }

  async function getAuthenticatedUser() {
    const authClient = await AuthClient.create();

    return authClient;
  }

  return (
    <div id="screen">
      <Header />
      <Faucet 
        authenticatedCanister={getAuthenticatedCanister}
        authenticatedUser={getAuthenticatedUser}
      />
      <Balance />
      <Transfer 
        authenticatedCanister={getAuthenticatedCanister}
      />
    </div>
  );
}

export default App;
