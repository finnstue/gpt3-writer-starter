import Head from 'next/head';
import Image from 'next/image';
// import buildspaceLogo from '../assets/buildspace-logo.png';
// import { useState } from 'react';
import React, { useState } from 'react';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  // const [checked4, setChecked4] = useState(false);

  const [obj, setObj] = useState('');
  // var testObj = [];
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    // for (let i = 0; i < 10; i++) {
    //     testArray.push(JSON.parse(output.text)[0]["brand"]+": "+JSON.parse(output.text)[0]["name"]+": "+JSON.parse(output.text)[0]["price"]);
    //   }
    // setTestVar(`${JSON.parse((output.text.split("},")[0].slice(2)+"}"))}`)
    // setTestVar(`${JSON.parse(output.text)[0]["brand"]+": "+JSON.parse(output.text)[0]["name"]+": "+JSON.parse(output.text)[0]["price"]}`)

    setApiOutput(`${output.text}`);
    const obj2 = JSON.parse(output.text);
    console.log(obj2);
    // testObj = obj2;
    // console.log(testObj);
    setObj(`${obj2}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
      <div className="root">
        <div className="container">
          <div className="header">
            <div className="header-title">
              <h1>Get the perfect gift for anyone, anytime.</h1>
            </div>
            <div className="header-subtitle">
              <h2>HeyGifts will generate unique gift ideas tailored to the recipients interests.</h2>
            </div>
          </div>
          <div className="prompt-container">
            <textarea
              placeholder="start typing here"
              className="prompt-box"
              value={userInput}
              onChange={onUserChangedText}
            />
            <div className="prompt-buttons">
              <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
                <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>
            {apiOutput && (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>Output</h3>
                  </div>
                </div>
                <div className="output-content">
                  <table>
                    <tr>
                      <th>Brand</th>
                      <th>Item</th>
                      <th>Price</th>
                    </tr>
                  {/* <p>{JSON.parse(apiOutput)[0].brand}</p> */}
                  {JSON.parse(apiOutput).map(i => <div>{i.brand}</div>)}
                  </table>
                </div>
              </div>
            )}
          </div>
          <div className=''>
            <ToggleButton
              className="mb-2"
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={checked}
              value="1"
              onChange={(e) => setChecked(e.currentTarget.checked)}
            >
              Male
            </ToggleButton>
            <ToggleButton
              className="mb-2"
              id="toggle-check2"
              type="checkbox"
              variant="outline-primary"
              checked={checked2}
              value="1"
              onChange={(e) => setChecked2(e.currentTarget.checked)}
            >
              Female
            </ToggleButton>
            <ToggleButton
              className="mb-2"
              id="toggle-check3"
              type="checkbox"
              variant="outline-primary"
              checked={checked3}
              value="1"
              onChange={(e) => setChecked3(e.currentTarget.checked)}
            >
              Unisex
            </ToggleButton>
            {/* <ToggleButton
              className="mb-2"
              id="toggle-check4"
              type="checkbox"
              variant="outline-primary"
              checked={checked4}
              value="1"
              onChange={(e) => setChecked4(e.currentTarget.checked)}
            >
              Without Gender
            </ToggleButton> */}
          </div>
        </div>
        {/* <div className="badge-container grow">
          <a
            href="https://buildspace.so/builds/ai-writer"
            target="_blank"
            rel="noreferrer"
          >
            <div className="badge">
              <Image src={buildspaceLogo} alt="buildspace logo" />
              <p>build with buildspace</p>
            </div>
          </a>
        </div> */}

      </div>
  );
};

export default Home;
