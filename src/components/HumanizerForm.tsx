import { useState } from "react";
import axios from "axios";

const HumanizerForm = () => {
  const [input, setInput] = useState("");
  const [textData, setTextData] = useState({
    humanized: "",
    confidence: "",
    changes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/humanize`, {
        text: input,
      });

      setTextData({
        humanized: response.data.humanized,
        confidence: response.data.confidence,
        changes: response.data.changes,
      });
    } catch (error) {
      console.error("Error fetching humanized data:", error);
      setTextData({
        humanized: "[Error processing request]",
        confidence: "",
        changes: "",
      });
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter AI-generated text..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Humanize
        </button>
      </form>

      {textData.humanized && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
          <strong>Humanized Text:</strong>
          <p>{textData.humanized}</p>
          <p><strong>Confidence:</strong> {textData.confidence}%</p>
          <p><strong>Changes:</strong> {textData.changes}</p>
        </div>
      )}
    </div>
  );
};

export default HumanizerForm;
