import React, { useEffect, useState } from "react";

function Faucet(props) {
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const [btnTxt, setBtnTxt] = useState("Gimme Gimme");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    async function fetchIdentity() {
      const userIdentity = await (await props.authenticatedUser()).getIdentity();
      setIdentity(toString(userIdentity._principal.toString()));
    };

    fetchIdentity();
  }, []);

  async function handleClick(event) {
    setBtnDisabled(true);

    const authenticatedCanister = await props.authenticatedCanister();

    const txt = await authenticatedCanister.freeTokens();
    setBtnTxt(txt);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Bro tokens here! Claim 10,000 BRO coins to your account.
        <br />
        {identity}
      </label>
      <p className="trade-buttons">
        <button
          id="btn-payout"
          onClick={handleClick}
          disabled={isBtnDisabled}
        >
          {btnTxt}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
