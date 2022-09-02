import { useState } from "react";
import axios from "axios";
import { Button } from "../components/Buttons/Button";

function ComprarIngresso () {


  const [filme, setFilme] = useState("");
  const [sala, setSala] = useState('');
  const [cadeira,  setCadeira] = useState('');
  const [data, setData] = useState(0);
  const [hora, setHora ] = useState(0)
  const [precoIngresso, setPrecoIngresso] = useState('');
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://cine-indie-api-resilia.herokuapp.com/ingresso", {
        method: "POST",
        body: JSON.stringify({
            filme: filme,
            sala: sala,
            cadeira: cadeira,
            dataHora: (data + hora),
            precoIngresso: precoIngresso,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setFilme("");
        setSala('');
        setCadeira('');
        setData('');
        setHora(0)
        setPrecoIngresso('');
        setMessage("Ingresso comprado com sucesso");
      } else {
        setMessage("Erro na sua solicitação");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
        <h2>Comprar ingresso</h2>
      <form onSubmit={handleSubmit}>
        <label> Escolha o Filme: </label>
        <input
          type="text"
          value={filme}
          placeholder="Filme"
          onChange={(e) => setFilme(e.target.value)}
        />
        <label> Sala de exibição:</label>
        <input
          type="number"
          value={sala}
          placeholder="Sala de exibição"
          onChange={(e) => setSala(e.target.value)}
        />
        <label>Numeração da cadeira: </label>
        <input
          type="text"
          value={cadeira}
          placeholder="Número da cadeira"
          onChange={(e) => setCadeira(e.target.value)}
        />
        <label> Dia: </label>
        <input
          type="date"
          value={data}
          placeholder="Data da sessão"
          onChange={(e) => setData(e.target.value)}
        />
        <label> Hora: </label>
        <input
          type="time"
          value={hora}
          placeholder="Hora da sessão"
          onChange={(e) => setHora(e.target.value)}
        />
       <label> Preço colaborativo: </label>
        <input
          type="number"
          value={precoIngresso}
          placeholder="preço do ingresso"
          onChange={(e) => setPrecoIngresso(e.target.value)}
        />
        <Button type='submit' textoBtn='Comprar Ingresso'/>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default ComprarIngresso;