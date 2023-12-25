import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Bro {
    var owner: Principal = Principal.fromText("bg65j-fvxzm-yw5y7-t233o-p6vac-n3fd5-hjhyc-xhmkr-r46rq-kiqja-hae");
    var totalCoins: Nat = 1000000000;
    var symbol: Text = "BRO";

    var balanceOf = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balanceOf.put(owner, totalCoins);

    public query func getBalance(pId: Principal):async Nat {
        let balance: Nat = switch(balanceOf.get(pId)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol(): async Text {
        return symbol;
    };

    
    public shared(msg) func freeTokens(): async Text {
        Debug.print(debug_show(msg.caller));
        if(balanceOf.get(msg.caller) == null) {
            return await transfer(msg.caller, 10000);
        }
        else {
            return "Already Claimed";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
        let senderBalance = await getBalance(msg.caller);
        if(senderBalance > amount) {
            let recieverBalance = await getBalance(to);

            balanceOf.put(msg.caller, senderBalance - amount);
            balanceOf.put(to, recieverBalance + amount);
            
            return "Success";
        }
        else {
            return "Insufficient Balance";
        }
    };
} 