import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';

const init = async () => { 
  const authClient = await AuthClient.create();

  if(authClient.isAuthenticated()) {
    console.log(authClient.getIdentity());
    renderApp();
  }
  else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app#authorize",
      onSuccess: () => {
        renderApp();
      }
    })
  }
}

async function renderApp() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();


