import React, { useState } from "react";
import { token } from "../../../declarations/token/index";

function Faucet() {
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const [btnTxt, setBtnTxt] = useState("Gimme Gimme");

  async function handleClick(event) {
    setBtnDisabled(true);
    const txt = await token.freeTokens();
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
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
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
