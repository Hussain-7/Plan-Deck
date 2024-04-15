import openai from "@/config/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { todos } = await req.json();
  console.log(todos);
  // communincate with open ai

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, welcome the user always as Mr.Hussain and say welcome to PlanDeck!. Limit the response to 300 characters",
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. I have 3 categories todo, inprogess and done. Remove mention of a category if no task are left in that category. Then tell the user to have a productive day!. In summary make it look like you are a person.Here's the data: ${JSON.stringify(
          todos
        )}
				`,
      },
    ],
  });
  console.log("response is: ", response);
  return NextResponse.json(response.choices[0].message);
}
