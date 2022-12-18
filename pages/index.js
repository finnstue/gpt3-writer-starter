import Head from 'next/head';
import Image from 'next/image';
// import { useState } from 'react';
import React, { useState } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const entertainmentArray = ["Board Games and Puzzles","Card Games","Current Affairs","History","Movie Geek","Reading","Retro and Old School","SciFi and Fantasy","Superhero","Video Games"];
  const foodArray = ["Baking", "Barbeque", "Beer", "Carnivore", "Cocktails", "Coffee", "Cooking", "Restaurants", "Sweets", "Snacks and Treats", "Vegan", "Vegetarian", "Whiskey", "Wine"];
  const homeArray = ["Babies", "Cats", "Dogs", "Entertaining", "Gardening", "House and Home", "Other Pets", "Outdoor Living", "Parenting", "Smart Home"];
  const musicArray = ["Drums", "Guitar", "Live Music", "Festivals", "Musician", "Listeing to Music", "MusicMaking", "Piano and Keyboard", "Recording", "Singing"]  ;
  const natureArray = ["Animals", "Bird Watching", "Conservation", "Farming", "Natural History and Geology", "Nature", "Science", "Space"];
  const skillsArray = ["Aviation", "Computers and Software", "DIY Enthusiast", "Graphic Design", "Hobbyist", "Interior Design", "Languages", "Painting and Drawing", "Photography", "Sculpture", "Woodworking", "Writing"];
  const sportsArray = ["American Football", "Baseball", "Climbing", "CrossFit", "Cycling", "Football", "Golf", "Gym", "Hiking", "Hunting", "MotorSports", "Snowsports", "Trail", "Running", "Triathlon", "Water Sports", "Yoga"];
  const travelArray = ["Beach","Camping","Glamping","Luxury","Overseas Travel","Road Trips"];
  const pricesArray = ["1€","5€","10€","20€","30€","40€","50€","75€","100€","150€","200€","300€","400€"]
  const categoriesArray = [["Entertainment",entertainmentArray],["Food and Drink",foodArray],["Home and Family",homeArray],["Music",musicArray],["Nature & Outdoors",natureArray],["Skills",skillsArray],["Sports and Activities",sportsArray],["Travel & Adventure",travelArray]];

  const hellogello = {"isBestSeller":false, "product_title":"Apple iPhone X 64 GB Space Grey (Refurbished)", "product_main_image_url":"https://m.media-amazon.com/images/I/611fy2og0QL._AC_UY218_.jpg", "app_sale_price":"309.00", "app_sale_price_currency":"€", "isPrime":false, "product_detail_url":"https://www.amazon.de/dp/B07985C44N", "product_id":"B07985C44N", "evaluate_rate":"3.9 out of 5 stars", "original_price":"€582.50"}
  const [userInput, setUserInput] = useState('');
  const [interests, setInterests] = useState([]);

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

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gender, interests }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    const obj2 = JSON.parse(output.text);
    console.log(obj2[0]);
    setObj(`${obj2}`);

    // hier amazon api call

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'dae9c8474cmshda391c24b0cf5a1p114eeajsndc0899068c49',
        'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
      }
    };

    // for (let i = 0; i < obj2.length; i++) {
      // console.log(obj2[i].brand)
    getResponse1();
    async function getResponse1() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[0].brand}${obj2[0].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput(data["docs"][0]);
      // setAmazonoutput([...amazonoutput,data["docs"][0]]);
      // console.log([...amazonoutput,data["docs"][0]]);
    }
    // await new Promise(r => setTimeout(r,1800));
    // }
    await new Promise(r => setTimeout(r,1800));

    getResponse2();
    async function getResponse2() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[1].brand}${obj2[1].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput2(data["docs"][0]);
    }

    await new Promise(r => setTimeout(r,1800));

    getResponse3();
    async function getResponse3() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[2].brand}${obj2[2].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput3(data["docs"][0]);
    }

    await new Promise(r => setTimeout(r,1800));

    getResponse4();
    async function getResponse4() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[3].brand}${obj2[3].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput4(data["docs"][0]);
    }

    await new Promise(r => setTimeout(r,1800));

    getResponse5();
    async function getResponse5() {
      const response = await fetch(
        `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[4].brand}${obj2[4].name}&country=DE&page=1`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAmazonoutput5(data["docs"][0]);
    }

    setIsGenerating(false);
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
              <h1>Welche Interessen hat die Person?</h1>)}
            </div>
          </div>
          {amazonoutput == '' && (
          <div className='container2'>
            {gender=="" && (
            <div className='button-container'>
              <ToggleButton
                  className="mb-2 color-btn"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={gender=="männlich"}
                  value="1"
                  onChange={() => setGender("männlich")}
                >
                  Männlich
              </ToggleButton>
              <ToggleButton
                  className="mb-2 color-btn"
                  id="toggle-check2"
                  type="checkbox"
                  key="woman"
                  variant="outline-primary"
                  checked={gender=="weiblich"}
                  value="1"
                  onChange={() => setGender("weiblich")}
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
            <div className='button-container2'>
            {(gender!=="") && age!=="" && pricemax!=="" && categoriesArray.map(element => <ToggleButton
                className="mb-2 color-btn"
                id={element[0]}
                type="checkbox"
                key={element}
                variant="outline-primary"
                checked={category==element[0]}
                value="1"
                onChange={() => setCategory(element[0])}
              >
                {element[0]}
              </ToggleButton>)}
            </div>
            <div className='button-container3'>
              {(category=="Entertainment") && entertainmentArray.map(element => <ToggleButton
                className="mb-2 color-btn"
                key={element}
                id={element}
                type="checkbox"
                variant="outline-primary"
                checked={interests.includes(element)}
                value="1"
                onChange={() => {
                  if (interests.includes(element)) {
                    let newInterests = interests.filter(item => item !== element)
                    setInterests(newInterests)
                  } else {
                    setInterests([...interests,element])
                  }
                  console.log(interests)
                }}
              >
                {element}
              </ToggleButton>)}
              {(category=="Food and Drink") && foodArray.map(element => <ToggleButton
                className="mb-2 color-btn"
                key={element}
                id={element}
                type="checkbox"
                variant="outline-primary"
                checked={interests.includes(element)}
                value="1"
                onChange={() => {
                  if (interests.includes(element)) {
                    let newInterests = interests.filter(item => item !== element)
                    setInterests(newInterests)
                  } else {
                    setInterests([...interests,element])
                  }
                  console.log(interests)
                }}
              >
                {element}
              </ToggleButton>)}
              {(category=="Home and Family") && homeArray.map(element => <ToggleButton
                className="mb-2 color-btn"
                key={element}
                id={element}
                type="checkbox"
                variant="outline-primary"
                checked={interests.includes(element)}
                value="1"
                onChange={() => {
                  if (interests.includes(element)) {
                    let newInterests = interests.filter(item => item !== element)
                    setInterests(newInterests)
                  } else {
                    setInterests([...interests,element])
                  }
                  console.log(interests)
                }}
              >
                {element}
              </ToggleButton>)}
              {(category=="Nature & Outdoors") && natureArray.map(element => <ToggleButton
                className="mb-2 color-btn"
                key={element}
                id={element}
                type="checkbox"
                variant="outline-primary"
                checked={interests.includes(element)}
                value="1"
                onChange={() => {
                  if (interests.includes(element)) {
                    let newInterests = interests.filter(item => item !== element)
                    setInterests(newInterests)
                  } else {
                    setInterests([...interests,element])
                  }
                  console.log(interests)
                }}
              >
                {element}
              </ToggleButton>)}
              {(category=="Music") && musicArray.map(element => <ToggleButton
                className="mb-2 color-btn"
                key={element}
                id={element}
                type="checkbox"
                variant="outline-primary"
                checked={interests.includes(element)}
                value="1"
                onChange={() => {
                  if (interests.includes(element)) {
                    let newInterests = interests.filter(item => item !== element)
                    setInterests(newInterests)
                  } else {
                    setInterests([...interests,element])
                  }
                  console.log(interests)
                }}
              >
                {element}
              </ToggleButton>)}
              {(category=="Skills") && skillsArray.map(element => <ToggleButton
                className="mb-2 color-btn"
                key={element}
                id={element}
                type="checkbox"
                variant="outline-primary"
                checked={interests.includes(element)}
                value="1"
                onChange={() => {
                  if (interests.includes(element)) {
                    let newInterests = interests.filter(item => item !== element)
                    setInterests(newInterests)
                  } else {
                    setInterests([...interests,element])
                  }
                  console.log(interests)
                }}
              >
                {element}
              </ToggleButton>)}
              {(category=="Sports and Activities") && sportsArray.map(element => <ToggleButton
                className="mb-2 color-btn"
                key={element}
                id={element}
                type="checkbox"
                variant="outline-secondary"
                checked={interests.includes(element)}
                value="1"
                onChange={() => {
                  if (interests.includes(element)) {
                    let newInterests = interests.filter(item => item !== element)
                    setInterests(newInterests)
                  } else {
                    setInterests([...interests,element])
                  }
                  console.log(interests)
                }}
              >
                {element}
              </ToggleButton>)}
              {(category=="Travel & Adventure") && travelArray.map(element => <ToggleButton
                className="mb-2 color-btn"
                key={element}
                id={element}
                type="checkbox"
                variant="outline-primary"
                checked={interests.includes(element)}
                value="1"
                onChange={() => {
                  if (interests.includes(element)) {
                    let newInterests = interests.filter(item => item !== element)
                    setInterests(newInterests)
                  } else {
                    setInterests([...interests,element])
                  }
                  console.log(interests)
                }}
              >
                {element}
              </ToggleButton>)}
            </div>
            {interests.length > 3 && (
            <div className="prompt-container">
              <div className="prompt-buttons">
                <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
                  <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                  </div>
                </a>
              </div>
            </div>)}
          </div>)}
          <div className="output">
            <div className="output-content">
              {amazonoutput!==[] && (
              <div class="card mb-2 d-inline-block">
                {/* <img class="card-img-top" src={amazonoutput.product_main_image_url}></img> */}
                <div class="card-body">
                  <h3 class="card-title h5">{amazonoutput.product_title}</h3>
                  <div class="card-subtitle text-muted">{amazonoutput.evaluate_rate}</div>
                  <div className='cardflex'>
                    <p class="card-text">{amazonoutput.app_sale_price}{amazonoutput.app_sale_price_currency}</p>
                    <a href={amazonoutput.product_detail_url} class="card-link"></a>
                  </div>
                </div>
              </div>
              )}
              {amazonoutput2 && (
                <div>
                  <p>{amazonoutput2.product_title}</p>
                  <a href={amazonoutput2.product_detail_url}>
                    <p>{amazonoutput2.app_sale_price}{amazonoutput2.app_sale_price_currency}</p>
                  </a>
                  <p>{amazonoutput2.evaluate_rate}</p>
                  <img src={amazonoutput2.product_main_image_url}></img>
                </div>
              )}
              {amazonoutput3 && (
                <div>
                  <p>{amazonoutput3.product_title}</p>
                  <a href={amazonoutput3.product_detail_url}>
                    <p>{amazonoutput3.app_sale_price}{amazonoutput3.app_sale_price_currency}</p>
                  </a>
                  <p>{amazonoutput3.evaluate_rate}</p>
                  <img src={amazonoutput3.product_main_image_url}></img>
                </div>
              )}
              {amazonoutput4 && (
                <div>
                  <p>{amazonoutput4.product_title}</p>
                  <a href={amazonoutput4.product_detail_url}>
                    <p>{amazonoutput4.app_sale_price}{amazonoutput4.app_sale_price_currency}</p>
                  </a>
                  <p>{amazonoutput4.evaluate_rate}</p>
                  <img src={amazonoutput4.product_main_image_url}></img>
                </div>
              )}
              {amazonoutput5 && (
                <div>
                  <p>{amazonoutput5.product_title}</p>
                  <a href={amazonoutput5.product_detail_url}>
                    <p>{amazonoutput5.app_sale_price}{amazonoutput5.app_sale_price_currency}</p>
                  </a>
                  <p>{amazonoutput5.evaluate_rate}</p>
                  <img src={amazonoutput5.product_main_image_url}></img>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Home;
