import { Configuration, OpenAIApi } from 'openai';

console.log("this works 0");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
`
console.log("this works 1");

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: Generate 5 fun or practical gift ideas from Amazon.com, for a ${req.body.age} year old ${req.body.gender} from Germany who is interested in ${req.body.interests}. The gift price should be below €${req.body.pricemax}. Format the output as a JSON and only include brand and name in lower case.`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate 5 fun or practical gift ideas from Amazon.com, for a ${req.body.age} year old ${req.body.gender} from Germany who is interested in ${req.body.interests}. The gift price should be €${req.body.pricemax} maximum. Format the output as a JSON and only include brand and name in lower case.
    \n`,
    temperature: 0.7,
    max_tokens: 400,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

console.log("this works 2");

export default generateAction;
