import React, { useState, useEffect} from 'react';
import './Main.css';
import DOMPurify from 'dompurify';

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
  const [textValor, setTextValor] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedMessageUid, setClickedMessageUid] = useState(null); // Estado para armazenar o UID do email clicado

  const handleTextChange = async (event) => {
    event.preventDefault();
    if (valorInput === '') {
      setShowPopup(true);
      document.getElementById('blur').classList.toggle('popup-open')
      document.getElementById('blur2').classList.toggle('popup-open')
      setTimeout(() => {
        document.getElementById('blur').classList.remove('popup-open')
        document.getElementById('blur2').classList.remove('popup-open')
        setShowPopup(false)}, 3000); // Popup desaparece após 3 segundos
    } else {
      await fetchData();
      setTextValor(!textValor);
    }
  };

  const handleChange = (event) => {
    setValorInput(event.target.value);
  };

 let touchStartTimestamp = 0;

const handleTouchStart = (event) => {
  
  touchStartTimestamp = Date.now();
};

const handleMosmailChange = async (id) => {
  
  const now = Date.now();
  if (now - touchStartTimestamp < 300) {
    return; // Ignorar ação se o intervalo entre o toque e o clique for inferior a300ms
  }

  if (clickedMessageUid === id) {
    setClickedMessageUid(null); // Se o mesmo email foi clicado novamente, oculta o conteúdo
  } else {
    if (messages && messages.uid === id) {
      setClickedMessageUid(id); // Se for um novo email, exibe o conteúdo correspondente
    } else {
      await fetchMessage(id);
      setClickedMessageUid(id); // Se for um novo email, exibe o conteúdo correspondente
    }
  }
};



  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const [results, setResults] = useState();
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(true); 

  const fetchData = async () => {
    try {
        const proxies = await getProxy();
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

  const fetchMessage = async (id) => {
    try {
        const proxies = await getProxy();
        const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
        const inboxUrl = `http://localhost:4000/api/v2/message/${id}`;
        const response = await fetch(inboxUrl, { proxy: randomProxy });
        const data = await response.json();
        setMessages(data);
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error.message);
    }
  };

  const domains = ["blondmail.com", 'chapsmail.com', 'clowmail.com', 'dropjar.com', 'fivermail.com', 'getairmail.com' , 'getmule.com', 'getnada.com', 'gimpmail.com', 'givmail.com', 'guysmail.com',  'vomoto.com', 'tupmail.com', 'temptami.com', 'tafmail.com', 'spicysoda.com', 'robot-mail.com', 'replyloop.com', 'inboxbear.com'];

  return (
    <div className='main'>
    <div id="blur2">
      <h1>Welcome to WiGenerator!</h1>
      <div className='input'>
        <form onSubmit={handleTextChange}>
          <div id='container3'>
          <input type="text" value={valorInput} placeholder='Name your email' onChange={handleChange} disabled={textValor} />
          <select value={selectedDomain} onChange={handleDomainChange} disabled={textValor}>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
          </div>
          <br/>
          {!textValor && (
            <button type='submit' id='submit' disabled={textValor}>Submit</button>
          )}
          {textValor && (
            <button type="button" onClick={() => {fetchData()}} onTouchStart={() => {fetchData()}}>Reload</button>
          )}
          {textValor && (
            <button type='submit'>Cancel</button>
          )}
        </form>
      </div>
      <div className='fds'>
        {textValor && (
          <div className='result'>
            <h2 id='pp'>{valorInput + "@" + selectedDomain}</h2>
            
            {loading ? (
              <p>Carregando...</p>
            ) : results && results.msgs.length === 0 ? (
              <h2>The inbox is empty. Waiting for messages....</h2>
            ) : (
              <section>
                {results['msgs'].map((message, index) => (
                    <div className='date' key={index}>
                      <p id="name"><strong>From:</strong> {message.f}</p>
                      <p><strong>Message:</strong> {message.s}</p>
                      <p><strong>Time sent:</strong> {message.rr}</p>
                      <button onTouchStart={(event) => {handleMosmailChange(message.uid);
                      handleTouchStart() }} onClick={() => {handleMosmailChange(message.uid)}}>Show email</button>
                      
                      {clickedMessageUid === message.uid && (
                        <div id='pteste' className='dark:text-slate-400 text-slate-500 prose-a:text-blue-600'>
                          <h1>Slide to the side....</h1>
                          <div className="text-black bg-gray-50 p-4 flex flex-col justify-center relative overflow-hidden sm:py-12" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(messages.html)}}/>
                        </div>
                      )}
                    </div>
                ))}
              </section>
            )}
          </div>
        )}
      </div>
      </div>
      {showPopup && <div className="popup">
      <svg width="30%" height="30%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9V14" stroke="rgb(15, 15, 15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.0001 21.41H5.94005C2.47005 21.41 1.02005 18.93 2.70005 15.9L5.82006 10.28L8.76006 5.00003C10.5401 1.79003 13.4601 1.79003 15.2401 5.00003L18.1801 10.29L21.3001 15.91C22.9801 18.94 21.5201 21.42 18.0601 21.42H12.0001V21.41Z" stroke=" rgb(15, 15, 15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.9945 17H12.0035" stroke=" rgb(15, 15, 15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <p> Empty tex box!! Name the email to submit...</p>
      </div>}
      
      
    </div>
  );
}

export default Main;
