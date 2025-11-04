export interface Car {
  manufacturer: string;
  model: string;
  year: number;
  fuel: string;
  engine: string;
  mileage: number;
  price: number;
}

export interface AskCarBotResponse {
  message: string;
  reply: Car[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.LOCAL_API_URL;

export async function askCarBot(question: string): Promise<AskCarBotResponse> {
  try {
    const res = await fetch(`${API_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error contacting car bot API:", error);
    return {
      message: "Something went wrong while contacting the server.",
      reply: [],
    };
  }
}
