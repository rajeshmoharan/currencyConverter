import { useEffect, useState } from "react";

export default function App() {
  return (
    <div className="bg-slate-700 w-full h-screen text-2xl">
      <Currency />
    </div>
  );
}
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

function Currency() {
  const [amount, setAmount] = useState("");
  const [fromAmount, setFromAmount] = useState("USD");
  const [toAmount, setToAmount] = useState("EUR");
  const [convertCurrency, setConvertCurrency] = useState("");
  const [curList, setCurList] = useState([]);

  useEffect(() => {
    async function conver() {
      const data = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromAmount}&to=${toAmount}`
      );
      const res = await data.json();
      setConvertCurrency(res.rates[toAmount]);
    }
    conver();
  }, [amount, fromAmount, toAmount]);

  useEffect(() => {
    async function getCurency() {
      const data = await fetch(`https://api.frankfurter.app/currencies`);
      const res = await data.json();
      const cur = Object.keys(res);
      setCurList(cur);
    }
    getCurency();
  }, []);

  return (
    <div>
      <div className="text-center flex flex-wrap justify-center ">
        <div>
          <select
            className="p-2 bg-slate-500 text-white font-bold hover:bg-indigo-300"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          >
            {curList.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            className="font-bold p-2.5 text-center"
            type="text"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <select
            className="p-2 bg-slate-500 text-white font-bold hover:bg-indigo-300"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
          >
            {curList.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-white text-center font-bold">{`${amount} ${fromAmount} IS ${convertCurrency} ${toAmount}`}</p>
    </div>
  );
}
