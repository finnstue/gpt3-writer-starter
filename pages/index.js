import Head from 'next/head';
import Image from 'next/image';
// import { useState } from 'react';
import React, { useState } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const entertainmentArray = ["Boardgames","Puzzles","Cardgames","Current Affairs","History","Movie Geek","Reading","Retro", "Old School","SciFi","Fantasy","Superhero","Video Games"];
  const foodArray = ["Baking", "Barbeque", "Beer", "Carnivore", "Cocktails", "Coffee", "Cooking", "Restaurants", "Sweets", "Snacks", "Vegan", "Vegetarian", "Whiskey", "Wine"];
  const homeArray = ["Babies", "Cats", "Dogs", "Entertaining", "Gardening", "House & Home", "Other Pets", "Outdoor Living", "Parenting", "Smart Home"];
  const musicArray = ["Drums", "Guitar", "Live Music", "Festivals", "Musician", "Listening to Music", "MusicMaking", "Piano","Keyboard", "Recording", "Singing"]  ;
  const natureArray = ["Animals", "Bird Watching", "Conservation", "Farming", "Natural History", "Geology", "Nature", "Science", "Space"];
  const skillsArray = ["Aviation", "Computers", "Software", "DIY Enthusiast", "Graphic Design", "Hobbyist", "Interior Design", "Languages", "Painting", "Drawing", "Photography", "Sculpture", "Woodworking", "Writing"];
  const sportsArray = ["American Football", "Baseball", "Climbing", "CrossFit", "Cycling", "Football", "Golf", "Gym", "Hiking", "Hunting", "MotorSports", "Snowsports", "Trail", "Running", "Triathlon", "Watersports", "Yoga"];
  const travelArray = ["Beach","Camping","Glamping","Luxury","Travel","Road Trips"];
  const pricesArray = ["1€","5€","10€","20€","30€","40€","50€","75€","100€","150€","200€","300€","400€"]
  const categoriesArray = [["Entertainment",entertainmentArray],["Food and Drink",foodArray],["Home and Family",homeArray],["Music",musicArray],["Nature & Outdoors",natureArray],["Skills",skillsArray],["Sports and Activities",sportsArray],["Travel & Adventure",travelArray]];

  const hellogello = {"isBestSeller":false, "product_title":"Apple iPhone X 64 GB Space Grey (Refurbished)", "product_main_image_url":"https://m.media-amazon.com/images/I/611fy2og0QL._AC_UY218_.jpg", "app_sale_price":"309.00", "app_sale_price_currency":"€", "isPrime":false, "product_detail_url":"https://www.amazon.de/dp/B07985C44N", "product_id":"B07985C44N", "evaluate_rate":"3.9 out of 5 stars", "original_price":"€582.50"}
  const [userInput, setUserInput] = useState('');
  const [interests, setInterests] = useState([]);
  const [didGenerate,setDidGenerate] = useState(false);

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [pricemax, setPricemax] = useState("");
  const [pricemin, setPricemin] = useState("");
  const [category, setCategory] = useState("");

  const [obj, setObj] = useState('');
  const [amazonoutput, setAmazonoutput] = useState([]);
  const [amazonoutput2, setAmazonoutput2] = useState([]);
  const [amazonoutput3, setAmazonoutput3] = useState([]);
  const [amazonoutput4, setAmazonoutput4] = useState([]);
  const [amazonoutput5, setAmazonoutput5] = useState([]);
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    console.log("hello");
    console.log(JSON.stringify({ gender, interests, pricemax, age }));
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gender, interests, pricemax, age }),
    });

    console.log("this works 4");
    console.log(response);

    const data = await response.json();
    const { output } = data;
    console.log("hello test")
    console.log("OpenAI replied...", output.text);

    console.log("this works 5");

    setApiOutput(`${output.text}`);
    const obj2 = JSON.parse(output.text);
    console.log(obj2[0]);
    setObj(`${obj2}`);

    // hier amazon api call

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd07fd643fcmshb27e56e9b67ae1bp1d3c8fjsnc56dc2154cb5',
        'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
      }
    };

    getResponse1();
    async function getResponse1() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[0].brand}${obj2[0].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput(data["docs"][0]);
      console.log(data["docs"][0]);
    }

    setDidGenerate(true);
    setIsGenerating(false);
    await new Promise(r => setTimeout(r,1500));

    getResponse2();
    async function getResponse2() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[1].brand}${obj2[1].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput2(data["docs"][0]);
      console.log(data["docs"][0]);
    }

    await new Promise(r => setTimeout(r,1500));

    getResponse3();
    async function getResponse3() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[2].brand}${obj2[2].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput3(data["docs"][0]);
      console.log(data["docs"][0]);
    }

    await new Promise(r => setTimeout(r,1500));

    getResponse4();
    async function getResponse4() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[3].brand}${obj2[3].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput4(data["docs"][0]);
      console.log(data["docs"][0]);
    }

    await new Promise(r => setTimeout(r,1500));

    getResponse5();
    async function getResponse5() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[4].brand}${obj2[4].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput5(data["docs"][0]);
      console.log(data["docs"][0]);
    }
  }
  return (
      <div className="root">
        <div className="container">
          <div className="header">
            <div className="header-title">
              {/* <h1>Get the perfect gift for anyone.</h1> */}
              {gender=="" && (
              <h1>Für wen ist das Geschenk?</h1>)}
              {age=="" && gender!== "" && (
              <h1>Wie alt ist die Person?</h1>)}
              {age!=="" && gender!== "" && pricemax=="" && (
              <h1>Maximaler Preis für das Geschenk?</h1>)}
              {age!=="" && gender!== "" && pricemax!=="" && amazonoutput=="" && (
              <div>
                <h1>Welche Interessen hat die Person?</h1>
                <br />
                <h4 className='h1flex'>Bitte vier auswählen.</h4>
              </div>)}
            </div>
          </div>
          {amazonoutput == '' && (
          <div>
            {gender=="" && (
            <div className='button-container'>
              <ToggleButton
                  className="mb-2 color-btn"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={gender=="man"}
                  value="1"
                  onChange={() => setGender("man")}
                >
                  Männlich
              </ToggleButton>
              <ToggleButton
                  className="mb-2 color-btn"
                  id="toggle-check2"
                  type="checkbox"
                  key="woman"
                  variant="outline-primary"
                  checked={gender=="woman"}
                  value="1"
                  onChange={() => setGender("woman")}
                >
                  Weiblich
              </ToggleButton>
              <ToggleButton
                  className="mb-2 color-btn"
                  id="toggle-check3"
                  type="checkbox"
                  key="unisex"
                  variant="outline-primary"
                  checked={gender=="unisex"}
                  value="1"
                  onChange={() => setGender("unisex")}
                >
                  Unisex
              </ToggleButton>
            </div>)}
            {gender!=="" && age=="" && (
            <div className='button-container'>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={age=="one to three"}
                  value="1"
                  onChange={() => setAge("one to three")}
                >
                  Baby
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={age=="four to tvelve"}
                  value="1"
                  onChange={() => setAge("four to tvelve")}
                >
                  Kind
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={age=="13 to 17"}
                  value="1"
                  onChange={() => setAge("13 to 17")}
                >
                  Teenager
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={age=="20 to 30"}
                  value="1"
                  onChange={() => setAge("20 to 30")}
                >
                  20 bis 30
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={age=="31 to 50"}
                  value="1"
                  onChange={() => setAge("31 bis 50")}
                >
                  31 bis 50
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={age=="51 bis 65"}
                  value="1"
                  onChange={() => setAge("51 bis 65")}
                >
                  51 bis 65
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={age=="older than 65"}
                  value="1"
                  onChange={() => setAge("older than 65")}
                >
                  Älter als 65
              </ToggleButton>
            </div>)}
            <div className='button-container'>
            {gender!=="" && age!=="" && pricemax=="" && pricesArray.map(element =>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  key={element}
                  variant="outline-primary"
                  checked={pricemax==element}
                  value="1"
                  onChange={() => setPricemax(element)}
                >
                  {element}
              </ToggleButton>
            )}
              {/* <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  variant=""
                  checked={false}
                  value="1"
                  onChange={() => setPricemax("")}
                >
                  Zurück
              </ToggleButton> */}
            </div>
            <div className='button-container'>
            {(gender!=="") && age!=="" && pricemax!=="" && categoriesArray.map(element =>
              <div>
                <h2 className='divh2'>{element[0]}</h2>
                <div className='divdiv'>
                  {element[1].map(i =>
                  <ToggleButton
                    className="mb-2 color-btn"
                    id={i}
                    type="checkbox"
                    key={i}
                    variant="outline-primary"
                    checked={interests.includes(i)}
                    value="1"
                    onChange={() => {
                      if (interests.includes(i)) {
                        let newInterests = interests.filter(item => item !== i)
                        setInterests(newInterests)
                      } else {
                        setInterests([...interests,i])
                      }
                    }}
                    >
                    {i}
                  </ToggleButton>)}
                </div>
                <br />
              </div>
              )}
            </div>
            {interests.length > 3 && (
            <div className="overlay2">
              <div className="prompt-buttons overlay">
                <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
                  <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                  </div>
                </a>
              </div>
            </div>)}
          </div>)}
          {didGenerate ?
          <div className="output">
            <div className="output-content">
              {amazonoutput && (
                <div>
                  <img src={amazonoutput.product_main_image_url} className='imgflex'></img>
                  <div class="card mb-2 d-inline-block">
                    <div className="card-body">
                      <h3 className="card-title h5">{amazonoutput.product_title}</h3>
                        <div className='cardflex'>
                          <p className="card-text">{amazonoutput.evaluate_rate}</p>
                          <a target={"_blank"} href={amazonoutput.product_detail_url}>
                            <p className="card-text">{amazonoutput.app_sale_price}{amazonoutput.app_sale_price_currency}</p>
                          </a>
                        </div>
                    </div>
                  </div>
                  <br />
                </div>
              )}
              {amazonoutput2 && (
                <div>
                  <img src={amazonoutput2.product_main_image_url} className='imgflex'></img>
                  <div class="card mb-2 d-inline-block">
                    <div className="card-body">
                      <h3 className="card-title h5">{amazonoutput2.product_title}</h3>
                        <div className='cardflex'>
                          <p className="card-text">{amazonoutput2.evaluate_rate}</p>
                          <a target={"_blank"} href={amazonoutput2.product_detail_url}>
                            <p className="card-text">{amazonoutput2.app_sale_price}{amazonoutput2.app_sale_price_currency}</p>
                          </a>
                        </div>
                    </div>
                  </div>
                  <br />
                </div>
              )}
              {amazonoutput3 && (
                <div>
                  <img src={amazonoutput3.product_main_image_url} className='imgflex'></img>
                  <div class="card mb-2 d-inline-block">
                    <div className="card-body">
                      <h3 className="card-title h5">{amazonoutput3.product_title}</h3>
                        <div className='cardflex'>
                          <p className="card-text">{amazonoutput3.evaluate_rate}</p>
                          <a target={"_blank"} href={amazonoutput3.product_detail_url}>
                            <p className="card-text">{amazonoutput3.app_sale_price}{amazonoutput3.app_sale_price_currency}</p>
                          </a>
                        </div>
                    </div>
                  </div>
                  <br />
                </div>
              )}
              {amazonoutput4 && (
                <div>
                  <img src={amazonoutput4.product_main_image_url} className='imgflex'></img>
                  <div class="card mb-2 d-inline-block">
                    <div className="card-body">
                      <h3 className="card-title h5">{amazonoutput4.product_title}</h3>
                        <div className='cardflex'>
                          <p className="card-text">{amazonoutput4.evaluate_rate}</p>
                          <a target={"_blank"} href={amazonoutput4.product_detail_url}>
                            <p className="card-text">{amazonoutput4.app_sale_price}{amazonoutput4.app_sale_price_currency}</p>
                          </a>
                        </div>
                    </div>
                  </div>
                  <br />
                </div>
              )}
              {amazonoutput5 && (
                <div>
                  <img src={amazonoutput5.product_main_image_url} className='imgflex'></img>
                  <div class="card mb-2 d-inline-block">
                    <div className="card-body">
                      <h3 className="card-title h5">{amazonoutput5.product_title}</h3>
                        <div className='cardflex'>
                          <p className="card-text">{amazonoutput5.evaluate_rate}</p>
                          <a target={"_blank"} href={amazonoutput5.product_detail_url}>
                            <p className="card-text">{amazonoutput5.app_sale_price}{amazonoutput5.app_sale_price_currency}</p>
                          </a>
                        </div>
                    </div>
                  </div>
                  <br />
                </div>
              )}
            </div>
          </div> : <div></div>}
        </div>
      </div>
  );
};

export default Home;
