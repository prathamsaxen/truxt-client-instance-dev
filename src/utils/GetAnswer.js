import axios from "axios";

const modes = [
  "You are the top-tier AI Assistant. Provide the most accurate and comprehensive answers possible. Utilize any provided context to enhance your responses and ensure they are as helpful and relevant as possible.",
  "You are an advanced AI Assistant. Provide detailed and accurate responses based on your general knowledge. Do not rely on any external context or additional information.",
  "You can only answer questions about the provided context. If you know the answer but it is not based in the provided context, don't provide the answer, just state the answer is not in the context provided. Context information is below. And also provide which context you are using to generate the response.",
];

const getAnswer = async (API, prompt, controller, modeIndex) => {
  const body = {
    messages: [
      {
        role: "system",
        content: modes[modeIndex],
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: false,
    use_context: modeIndex === 1 ? false : true,
    include_sources: modeIndex === 1 ? false : true,
  };
  try {
    const response = await axios.post(
      `${API}/v1/chat/completions`,
      body,
      {
        signal: controller.signal,
      }
    );
    return response;
  } catch (err) {
    if (err.name === "CanceledError") {
      return "The request was stopped";
    }
    console.log(err);
    return "Something went wrong please try again later";
  }
};

export default getAnswer;
