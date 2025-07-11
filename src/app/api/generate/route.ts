import { InferenceClient } from "@huggingface/inference";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const { title, tags } = await request.json();

    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    const prompt = `
      You are an assistant that writes short, engaging, and relevant YouTube video descriptions.

      Use the given title and tags to write a natural-sounding 2–3 sentence description that attracts viewers and highlights the main content. Include keywords from the tags naturally in the description. Sometimes add emojis to make it more attractive.

      Do not repeat the words “Title”, “Tags”, or “Description” in your output — just return the pure description text only.

      ### Examples:

      Title: How I Built a Habit Tracker in React  
      Tags: react, productivity, habit, frontend  
      Description: Build your own habit tracker with React! A step-by-step tutorial to boost your productivity and level up your frontend skills.

      ---

      Title: BGMI 1v4 Clutch in Just 10 Seconds  
      Tags: bgmi, 1v4, gaming, clutch  
      Description: Watch this epic 1v4 clutch🔥 moment in BGMI! Pure gaming instincts and sharp reflexes in under 10 seconds.❤️

      ---

      Title: Learn Tailwind CSS in 15 Minutes  
      Tags: tailwind, css, webdev, frontend  
      Description: A quick and powerful guide to Tailwind CSS. Build beautiful websites faster and smarter with utility-first styling.✨

      ---

      Now generate a short description for:

      Title: ${title}  
      Tags: ${tags.join(", ")}  
      Description:
      `;


    const chatCompletion = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        {
          role: "system",
          content: "You are an assistant that writes YouTube video descriptions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });


    return Response.json({
      message: chatCompletion.choices[0].message.content
    }, { status: 201 })

  } catch (error) {
    console.error("Failed to Generate description", error)
    return Response.json({
      error: "Failed to Generate description"
    }, { status: 500 })
  }
}