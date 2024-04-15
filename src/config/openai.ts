import OpenAI from "openai";

const openai = new OpenAI({
  organization: "org-tudGMTQl2OVOITFZPgytDyin",
  apiKey: process.env.OPENAI_API_KEY!,
});

export default openai;
