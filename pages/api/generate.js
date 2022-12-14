import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Generate a list of 10 gift ideas from Amazon.com including the brand name, for a person and gift with the following characteristics. The gift price should be between the gift price maximum and the gift price minimum. In the output for each item include the items brand, its name and its price, all in lowwer case. Give out an integer for the price value without returning the currency. Format the output as a an array of JSON files with no spaces. These are the inputs:
`
// `
// Generate a list of 5 gift ideas from Amazon.com including the brand name, for a person and gift with the following characteristics. The gift price should be between the gift price maximum and the gift price minimum. In the output for each item include the items brand, its name and its price. Format the output as a JSON file with no spaces.

// Input:
// [{"Person's Gender": "Male"},{Person's Interests: Dogs, Running, Home, Medical},{Person's Age: 27},{Person's Country: Germany},{Gift Price Maximum: €150.00},{Gift Price Minimum: €10.00},{Gift Intent: Fun or Practical}]

// Output:
// [{"Brand":"Apple","Name":"AirPods Pro Wireless Earbuds","Price":€129.00},{"Brand":"Bose","Name":"SoundLink Around-Ear Headphones II","Price":€99.95},{"Brand":"Furbo Dog Camera Treat Tossing & Full HD Wifi Pet Cam with Night Vision & 2 Way Audio, White (UK Edition) ","Price": €159.90}, {"Brand":"/LifeStraw/Go Water Filter Bottle With 2-Stage Integrated Filter Straw for Hiking, Backpacking and Travel - Blue", "Price": €44.21},{" Brand: Furminator deShedding Tool For Dogs Long Hair Medium Size" , " Price:" €20}]

// Input:
// `
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 500,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
