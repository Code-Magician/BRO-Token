import React, { useEffect, useState } from "react";
import { token } from "../../../declarations/token/index";
import { Principal } from '@dfinity/principal';

function Balance() {
  const [balance, setBalance] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [pId, setPId] = useState("");

  useEffect(()=>{
    (async ()=>{
      setSymbol(await token.getSymbol());
    })();
  }, []);
  
   async function handleClick() {
    const value = await token.getBalance(Principal.fromText(pId));
    setBalance(value.toLocaleString());
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          onChange={(e)=>{
            let value = e.target.value;
            setPId(value);
          }}
          value={pId}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>This account has a balance of {balance} {symbol}.</p>
    </div>
  );
}

export default Balance;
