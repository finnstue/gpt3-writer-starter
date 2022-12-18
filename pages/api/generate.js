import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
`

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}
  Person's Gender: ${req.body.gender}
  Person's Interests: ${req.body.interests}
  Person's Country: Germany;
  Gift Price Maximum: €150.00;
  Gift Price Minimum: €10.00;
  Gift Intent: Fun or Practical
  `)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate 5 fun or practical gift ideas from Amazon.com, for a ${req.body.age} year old ${req.body.gender} from Germany who is interested in ${req.body.interests}. The gift price should be between €20 and €40. Format the output as a JSON and only include brand and name in lower case.
    \n`,
    temperature: 0.7,
    max_tokens: 400,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
