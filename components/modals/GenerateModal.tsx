import { useState } from "react";
import Modal from "@/components/Modal";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-hot-toast";

interface GenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (content: string) => void; // Prop to pass generated content
}

const GenerateModal: React.FC<GenerateModalProps> = ({ isOpen, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) throw new Error("API key is not defined.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setLoading(true);

    try {
      const result = await model.generateContent(prompt);
      const content = await result.response.text();
      onGenerate(content); // Pass the generated content back to the Form component
      toast.success("AI generated content successfully!");
      onClose(); // Close the modal after generating content
    } catch (error) {
      toast.error("Failed to generate content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Content Using AI 🪄"
      actionLabel={loading ? "Generating..." : "Generate"}
      disabled={loading}
      onSubmit={handleGenerate}
      body={
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-2 border border-zinc-700 rounded text-white bg-zinc-900 resize-none"
            rows={3}
            
          />
        </div>
      }
    />
  );
};

export default GenerateModal;
