import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
const   CLIENT_ID = "089df41ea8578a846772";

function App() {
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if(codeParam && (localStorage.getItem("accessToken") === null)) {
      const getAccessToken = async () => {
        try{
          const response = await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, { 
            method: "GET"
          })
          const resp = await response.json();
          if(resp.access_token){
            localStorage.setItem("accessToken", resp.access_token);
            setRerender(!rerender)
          }
        } catch(error){
          console.log("Error::",error);
        }
      }
      getAccessToken();
    }
  }, []);

  function loginWithGituhub(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }

  return (
    <div className="App">
      <header className="App-header">
        {localStorage.getItem("accessToken") ? 
          <div>
            <h1>Got the Access Token!!</h1>
            <button onClick={() => {
              localStorage.removeItem("accessToken");
              setRerender(!rerender);
            }}>
            Log Out
            </button>
          </div>
        :  
          <div>
            <h3>User is not logged in</h3>
          </div>
        }
        <button onClick={loginWithGituhub}>
          Login with Github
        </button>
      </header>
    </div>
  );
}

export default App;
