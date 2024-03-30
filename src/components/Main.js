import React, { useState, useEffect } from 'react';
import './Main.css';

async function getProxy() {
    try {
        const response = await fetch('https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&protocol=http&proxy_format=protocolipport&format=text&timeout=619');
        const proxies = (await response.text()).trim().split('\n');
        return proxies.map(proxy => ({ http: proxy }));
    } catch (error) {
        console.error('Error fetching proxies:', error.message);
        return [];
    }
}




const Main = () => {
  
  const [valorInput, setValorInput] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('blondmail.com');
  const [textValor, setTextValor] = useState(false)

  const handleTextChange = async (event) => {
    event.preventDefault();
    await fetchData()
    setTextValor(!textValor)
  }
  const handleChange = (event) => {
    setValorInput(event.target.value);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true); 
    const fetchData = async () => {
    try {
        const proxies = await getProxy();
        
        // Selecionar uma proxy aleatória do array proxies
        const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
        
        const inboxUrl = `http://localhost:4000/api/v2/inbox/${valorInput}@${selectedDomain}`;
        const response = await fetch(inboxUrl, { proxy: randomProxy });
        const data = await response.json();
        setResults(data);
        
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error.message);
    } finally {
        setLoading(false);
    }
};


  const domains = ["blondmail.com", 'chapsmail.com', 'clowmail.com', 'dropjar.com', 'fivermail.com', 'getairmail.com' , 'getmule.com', 'getnada.com', 'gimpmail.com', 'givmail.com', 'guysmail.com',  'vomoto.com', 'tupmail.com', 'temptami.com', 'tafmail.com', 'spicysoda.com', 'robot-mail.com', 'replyloop.com', 'inboxbear.com'];


  return (
    <div className='main'>
      <h1>Welcome to WiGenerator!</h1>
      <div className='input'>
      <form onSubmit={handleTextChange}>
        <input type="text" value={valorInput} onChange={handleChange} disabled={textValor}/>
        <select value={selectedDomain} onChange={handleDomainChange} disabled={textValor}>
          {domains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
        <button type='submit' disabled={textValor}>Submit</button>
        <button type='submit' disabled={!textValor}>Cancel</button>
        </form>
      </div>
      {textValor && (
      <div>
        <p>{valorInput + "@" + selectedDomain}</p>
        
        {loading ? <p>Carregando...</p> : (
         <section>
          {results['msgs'].map((message, index) => (
        <div key={index}>
          <p><strong>UID:</strong> {message.uid}</p>
          <p><strong>From:</strong> {message.f}</p>
          <p><strong>Subject:</strong> {message.s}</p>
          <p><strong>Date:</strong> {message.cr}</p>
          {/* Adicione mais campos conforme necessário */}
        </div>
      ))}
    </section>
      )}
      </div>
      )}
    </div>
  );
}

export default Main;
