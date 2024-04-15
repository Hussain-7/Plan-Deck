import openai from "@/config/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { todos } = await req.json();
  console.log(todos);
  // communincate with open ai

  const response = await openai.chat.completions.create({
    model: "gpt-3.5.turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, welcome the user always as Mr.Hussain and say welcome to PlanDeck!. Limit the response to 200 characters",
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as
				To do, in progress,done, then tell the user to have a productive day!. Here's the data: ${JSON.stringify(
          todos
        )}
				`,
      },
    ],
  });
  console.log("response is: ", response);
  return NextResponse.json({ result: response.choices[0].message });
}
