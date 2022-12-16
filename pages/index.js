import Head from 'next/head';
import Image from 'next/image';
// import buildspaceLogo from '../assets/buildspace-logo.png';
// import { useState } from 'react';
import React, { useState } from 'react';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  // function MyButton(params) {
  //   return <button>my Button {params.name}</button>
  // }

  const categoriesArray = ["Entertainment","Food and Drink","Home and Family","Music","Nature and Outdoors","Skills","Sports and Activities","Travel and Adventure"];
  const entertainmentArray = ["Board Games and Puzzles","Card Games","Current Affairs","History","Movie Geek","Reading","Retro and Old School","SciFi and Fantasy","Superhero","Video Games"];
  const foodArray = ["Baking", "Barbeque", "Beer", "Carnivore", "Cocktails", "Coffee", "Cooking", "Restaurants", "Sweets", "Snacks and Treats", "Vegan", "Vegetarian", "Whiskey", "Wine"];
  const homeArray = ["Babies", "Cats", "Dogs", "Entertaining", "Gardening", "House and Home", "Other Pets", "Outdoor Living", "Parenting", "Smart Home"];
  const musicArray = ["Drums", "Guitar", "Live Music", "Festivals", "Musician", "Listeing to Music", "MusicMaking", "Piano and Keyboard", "Recording", "Singing"]  ;
  const natureArray = ["Animals", "Bird Watching", "Conservation", "Farming", "Natural History and Geology", "Nature", "Science", "Space"];
  const skillsArray = ["Aviation", "Computers and Software", "DIY Enthusiast", "Graphic Design", "Hobbyist", "Interior Design", "Languages", "Painting and Drawing", "Photography", "Sculpture", "Woodworking", "Writing"];
  const sportsArray = ["American Football", "Baseball", "Climbing", "CrossFit", "Cycling", "Football", "Golf", "Gym", "Hiking", "Hunting", "MotorSports", "Running", "Snowsports", "Trail", "Running", "Triathlon", "Water Sports", "Yoga"];
  const travelArray = ["Beach","Camping","Glamping","Luxury","Overseas Travel","Road Trips"];

  const [userInput, setUserInput] = useState('');

  // const [checked, setChecked] = useState(false);
  // const [checked2, setChecked2] = useState(false);
  // const [checked3, setChecked3] = useState(false);
  const [interests, setInterests] = useState([]);

  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");

  const [obj, setObj] = useState('');
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
      // body: JSON.stringify({ userInput }),
      body: JSON.stringify({ gender, interests }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    const obj2 = JSON.parse(output.text);
    console.log(obj2);
    setObj(`${obj2}`);
    setIsGenerating(false);
    // hier amazon api call machen

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
          {apiOutput == '' && (
          <div className='container'>
            {gender=="" && (
            <p>What Gender does the Person receiving the Gift have?</p>
            )}
            <div className='button-container'>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  key="man"
                  variant="outline-primary"
                  checked={gender=="Man"}
                  value="1"
                  onChange={() => setGender("Man")}
                >
                  Man
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check2"
                  type="checkbox"
                  key="woman"
                  variant="outline-primary"
                  checked={gender=="Woman"}
                  value="1"
                  onChange={() => setGender("Woman")}
                >
                  Women
              </ToggleButton>
              <ToggleButton
                  className="mb-2"
                  id="toggle-check3"
                  type="checkbox"
                  key="unisex"
                  variant="outline-primary"
                  checked={gender=="Unisex"}
                  value="1"
                  onChange={() => setGender("Unisex")}
                >
                  Unisex
              </ToggleButton>
            </div>
            <div className='button-container2'>
            {(gender!=="") && categoriesArray.map(element => <ToggleButton
                className="mb-2"
                id={element}
                type="checkbox"
                key={element}
                variant="outline-primary"
                checked={category==element}
                value="1"
                onChange={() => setCategory(element)}
              >
                {element}
              </ToggleButton>)}
            </div>
            <div>
              {(category=="Entertainment") && entertainmentArray.map(element => <ToggleButton
                className="mb-2"
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
                className="mb-2"
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
                className="mb-2"
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
              {(category=="Nature and Outdoors") && natureArray.map(element => <ToggleButton
                className="mb-2"
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
                className="mb-2"
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
                className="mb-2"
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
                className="mb-2"
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
              {(category=="Travel and Adventure") && travelArray.map(element => <ToggleButton
                className="mb-2"
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
            {interests.length > 4 && (
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
          {apiOutput && (
              <div className="output">
                <div className="output-content">
                  <table>
                    <tr>
                      <th>Brand</th>
                      <th>Item</th>
                      <th>Price</th>
                    </tr>
                    {JSON.parse(apiOutput).map(i =>
                      <tr>
                        <td>{i.brand.charAt(0).toUpperCase() + i.brand.slice(1)}</td>
                        <td>{i.name.charAt(0).toUpperCase() + i.name.slice(1)}</td>
                        <td>{i.price}€</td>
                      </tr>)}
                  </table>
                </div>
              </div>
            )}
        </div>
      </div>
  );
};

export default Home;
