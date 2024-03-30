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

  const handleTextChange = (event) => {
    event.preventDefault();
    setTextValor(!textValor)
  }
  const handleChange = (event) => {
    setValorInput(event.target.value);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proxies = await getProxy();
        await Promise.all(proxies.map(async (proxy) => {
        try {
            const inboxUrl = `https://inboxes.com/api/v2/inbox/${valorInput}@${selectedDomain}`;
            const response = await fetch(inboxUrl, { proxy: proxy });
            const data = await response.text();
              setResults(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }));
        
        
        
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])
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
        <div>
          {results.map((result, index) => (
            <p key={index}>Resultado: {result}</p>
          ))}
        </div>
      )}
     
      </div>
      )}
    </div>
  );
}

export default Main;