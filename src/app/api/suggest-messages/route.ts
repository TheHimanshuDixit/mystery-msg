import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY as string);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Generate three engaging and lighthearted icebreaker questions formatted as a single string, separated by '||'. These questions are intended for a casual conversation app and should promote fun, inclusive, and friendly discussions. Avoid overly personal or controversial topics. For example, questions could include imaginative scenarios, preferences, or simple joys in life. Ensure the tone is approachable and universal. For instance, your output should look like this: 'What’s the most interesting place you’ve visited?||If you could live in any fictional universe, which one would it be?||What’s a song that always lifts your mood?'. Focus on questions that spark curiosity and inspire warm connections."


        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        const response = result.response.text();
        return Response.json({
            success: true,
            message: response
        },
            {
                status: 200
            });


    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return Response.json({
            success: false,
            message: "An unexpected error occurred"
        },
            {
                status: 500
            });
    }
}