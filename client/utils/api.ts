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

export async function askCarBot(question: string): Promise<AskCarBotResponse> {
  const res = await fetch("http://localhost:8000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  return res.json();
}
