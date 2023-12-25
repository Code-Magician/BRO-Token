import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { token } from "../../../declarations/token/index";

function Transfer() {
  const [pId, setPId] = useState("");
  const [amount, setAmount] = useState(0);
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const [btnTxt, setBtnTxt] = useState("Transfer");
  
  async function handleClick() {
    setBtnDisabled(true);

    const txt = await token.transfer(Principal.fromText(pId), parseInt(amount));
    setBtnTxt(txt);
    
    setAmount(0);
    setPId("");

    setTimeout(() => {
      setBtnTxt("Transfer");
      setBtnDisabled(false);
    }, 1000);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={e => setPId(e.target.value)}
                value={pId}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={e => setAmount(e.target.value)}
                value={amount}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isBtnDisabled} >
            {btnTxt}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
