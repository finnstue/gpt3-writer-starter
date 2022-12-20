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
  console.log(`API: Generate 7 fun or practical gift ideas, for a ${req.body.age} ${req.body.gender} from Germany who is interested in ${req.body.interests}. The maximum gift price is €${req.body.pricemax}. Format the output as a JSON and only include brand and name in lower case.`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate 7 fun or practical gift ideas, for a ${req.body.age} ${req.body.gender} from Germany who is interested in ${req.body.interests}. The maximum gift price is €${req.body.pricemax}. Format the output as a JSON and only include the brand and the name of each gift in lower case.\n`,
    temperature: 0.7,
    max_tokens: 400,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
