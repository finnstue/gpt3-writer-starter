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
  // const entertainmentArray = ["Brettspiele", "Puzzles", "Kartenspiele", "Zeitgeschehen", "Geschichte", "Filme", "Lesen", "Retro", "Old School", "SciFi", "Fantasy", "Superhelden", "Videospiele"];
  const foodArray = ["Baking", "Barbeque", "Beer", "Carnivore", "Cocktails", "Coffee", "Cooking", "Restaurants", "Sweets", "Snacks", "Vegan", "Vegetarian", "Whiskey", "Wine"];
  // const foodArray = ["Backen", "Barbecue", "Bier", "Fleischfresser", "Cocktails", "Kaffee", "Kochen", "Restaurants", "Süßigkeiten", "Snacks", "Vegan", "Vegetarisch", "Whiskey", "Wein"];
  const homeArray = ["Babies", "Cats", "Dogs", "Entertaining", "Gardening", "House & Home", "Other Pets", "Outdoor Living", "Parenting", "Smart Home"];
  // const homeArray = ["Babys", "Katzen", "Hunde", "Gartenarbeit", "Haus & Heim", "Andere Haustiere", "Leben im Freien", "Elternschaft", "Smart Home"];
  const musicArray = ["Drums", "Guitar", "Live Music", "Festivals", "Musician", "Listening to Music", "MusicMaking", "Piano","Keyboard", "Recording", "Singing"]  ;
  // const musicArray = ["Schlagzeug", "Gitarre", "Live-Musik", "Festivals", "Musik hören", "Musizieren", "Klavier", "Keyboard", "Aufnahme", "Gesang"];
  const natureArray = ["Animals", "Bird Watching", "Conservation", "Farming", "Natural History", "Geology", "Nature", "Science", "Space"];
  const skillsArray = ["Aviation", "Computers", "Software", "DIY Enthusiast", "Graphic Design", "Hobbyist", "Interior Design", "Languages", "Knitting", "Crochet", "Painting", "Drawing", "Photography", "Sculpture", "Woodworking", "Writing"];
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

  function capitalizeWords(str) {
    str = str.split(" ").map(element => {
      return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    }).join(" ");
    return str;
  }

  const callGenerateEndpoint = async () => {
    setDidGenerate(true);
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    console.log(JSON.stringify({ gender, interests, pricemax, age }));
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gender, interests, pricemax, age }),
    });

    console.log(response);

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    const obj2 = JSON.parse(output.text);
    console.log(obj2[0]);
    setObj(`${obj2}`);

    // hier amazon api call

    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'X-RapidAPI-Key': 'd07fd643fcmshb27e56e9b67ae1bp1d3c8fjsnc56dc2154cb5',
    //     'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
    //   }
    // };

    // getResponse1();
    // async function getResponse1() {
    //   const response = await fetch(
    //     `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[0].brand}${obj2[0].name}&country=DE&page=1`, options);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setAmazonoutput(data["docs"][0]);
    //   console.log(data["docs"][0]);
    // }

    setIsGenerating(false);
    // await new Promise(r => setTimeout(r,1500));

    // getResponse2();
    // async function getResponse2() {
    //   const response = await fetch(
    //     `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[1].brand}${obj2[1].name}&country=DE&page=1`, options);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setAmazonoutput2(data["docs"][0]);
    //   console.log(data["docs"][0]);
    // }

    // await new Promise(r => setTimeout(r,1500));

    // getResponse3();
    // async function getResponse3() {
    //   const response = await fetch(
    //     `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[2].brand}${obj2[2].name}&country=DE&page=1`, options);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setAmazonoutput3(data["docs"][0]);
    //   console.log(data["docs"][0]);
    // }

    // await new Promise(r => setTimeout(r,1500));

    // getResponse4();
    // async function getResponse4() {
    //   const response = await fetch(
    //     `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[3].brand}${obj2[3].name}&country=DE&page=1`, options);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setAmazonoutput4(data["docs"][0]);
    //   console.log(data["docs"][0]);
    // }

    // await new Promise(r => setTimeout(r,1500));

    // getResponse5();
    // async function getResponse5() {
    //   const response = await fetch(
    //     `https://amazon24.p.rapidapi.com/api/product?keyword=${obj2[4].brand}${obj2[4].name}&country=DE&page=1`, options);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setAmazonoutput5(data["docs"][0]);
    //   console.log(data["docs"][0]);
    // }
  }
  return (
      <div className="root">
        <div className="container">
          <div className="header">
            <div className="header-title">
              {/* <h1>Get the perfect gift for anyone.</h1> */}
              {gender=="" && (
              <h1>Who is getting the present?</h1>)}
              {age=="" && gender!== "" && (
              <h1>How old is the person?</h1>)}
              {age!=="" && gender!== "" && pricemax=="" && (
              <h1>Maximal Price for the Present?</h1>)}
              {age!=="" && gender!== "" && pricemax!=="" && apiOutput=="" && didGenerate!==true && (
              <div>
                <h1>What is the person interested in?</h1>
                <br />
                <h4 className='h1flex'>Please choose atleast four.</h4>
              </div>)}
            </div>
          </div>
          {didGenerate!==true ? <div>
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
                  Man
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
                  Woman
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
                  type="checkbox"
                  key="man"
                  id='two year old'
                  variant="outline-primary"
                  checked={age=="two year old"}
                  value="1"
                  onChange={() => setAge("two year old")}
                >
                  Baby
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  type="checkbox"
                  key="man"
                  id='ten year old'
                  variant="outline-primary"
                  checked={age=="ten year old"}
                  value="1"
                  onChange={() => setAge("ten year old")}
                >
                  Child
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  type="checkbox"
                  key="man"
                  id='seventeen year old'
                  variant="outline-primary"
                  checked={age=="seventeen year old"}
                  value="1"
                  onChange={() => setAge("seventeen year old")}
                >
                  Teenager
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  type="checkbox"
                  key="man"
                  id='24 year old'
                  variant="outline-primary"
                  checked={age=="24 year old"}
                  value="1"
                  onChange={() => setAge("24 year old")}
                >
                  20 to 30
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  type="checkbox"
                  key="man"
                  id="40 year old"
                  variant="outline-primary"
                  checked={age=="40 year old"}
                  value="1"
                  onChange={() => setAge("40 year old")}
                >
                  31 to 50
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  type="checkbox"
                  key="man"
                  id='55 year old'
                  variant="outline-primary"
                  checked={age=="55 year old"}
                  value="1"
                  onChange={() => setAge("55 year old")}
                >
                  51 to 65
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  type="checkbox"
                  id='68 year old'
                  key="man"
                  variant="outline-primary"
                  checked={age=="68 year old"}
                  value="1"
                  onChange={() => setAge("68 year old")}
                >
                  Older than 65
              </ToggleButton>
            </div>)}
            <div className='button-container'>
            {gender!=="" && age!=="" && pricemax=="" && pricesArray.map(element =>
              <ToggleButton
                  className="mb-2"
                  id={element}
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
                  // (interests.length < 4) ? <ToggleButton
                  //   className="mb-2 color-btn"
                  //   id={i}
                  //   type="checkbox"
                  //   key={i}
                  //   variant="outline-primary"
                  //   checked={interests.includes(i)}
                  //   value="1"
                  //   onChange={() => {
                  //     if (interests.includes(i)) {
                  //       let newInterests = interests.filter(item => item !== i)
                  //       setInterests(newInterests)
                  //     } else {
                  //       setInterests([...interests,i])
                  //     }
                  //   }}
                  //   >
                  //   {i}
                  // </ToggleButton> :
                  <ToggleButton
                    className="mb-2 color-btn"
                    id={i}
                    type="checkbox"
                    key={i}
                    variant="outline-primary"
                    checked={interests.includes(i)}
                    value="1"
                    // onClick={callGenerateEndpoint}
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
            </div>
          </div> : <div></div>}
          {isGenerating ?
          <div className='button-container'>
            <div>
              <iframe src="https://giphy.com/embed/hFmIU5GQF18Aw" width="343" height="480" className="giphys"></iframe>
            </div>
            <div className="header-title">
              <h2>We are generating ideas..</h2>
            </div>
          </div> : <div></div>}
          {apiOutput ?
          <div>
            <div className="header-title"><h1>Your Present Ideas</h1></div>
            <div className="output">
              <div className="output-content">
                <div>
                <br />
                {JSON.parse(apiOutput).map(i =>
                <div>
                  <a target={"_blank"} href={`https://www.amazon.de/s?k=${i.brand}+${i.name}&crid=6KTS57CKQVK5&sprefix=peter%2Caps%2C91&ref=nb_sb_noss_1`} className="no-underline">
                    <h4>{capitalizeWords(i.brand)}: {capitalizeWords(i.name)}</h4>
                  </a>
                </div>
                )}
                {/* {JSON.parse(apiOutput).map(i =>
                  <div className="card mb-2 d-inline-block">
                    <div className="card-body">
                      <a target={"_blank"} href={`https://www.amazon.de/s?k=$&crid=6KTS57CKQVK5&sprefix=peter%2Caps%2C91&ref=nb_sb_noss_1`}>
                        <h3 className="card-title h5">{i.brand}</h3>
                      </a>
                    </div>
                  </div>
                  )} */}
                </div>
              </div>
            </div>
          </div> : <div></div>}
        </div>
      </div>
  );
};

export default Home;
