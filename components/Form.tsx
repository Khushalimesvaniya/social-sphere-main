import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import ImageUpload from "./ImageUpload";
import GenerateModal from "@/components/modals/GenerateModal"; 
import useGenerateModal from "@/hooks/useGenerateModal"; 

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const generateModal = useGenerateModal(); 

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); 

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";
      await axios.post(url, { body, imageUrl });
      const successMessage = isComment ? "Comment created successfully" : "Post created successfully";
      toast.success(successMessage);
      setBody("");
      setImageUrl(null); // Reset imageUrl here
      mutatePosts();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, imageUrl, mutatePosts, isComment, postId]);

  const handleGeneratedContent = (content: string) => {
    setBody(content); 
    toast.success("AI generated content added!");
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [body]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              ref={textareaRef} 
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none
                mt-3
                w-full
                bg-black
                ring-0
                outline-none
                text-[20px]
                placeholder-neutral-500
                text-white
              "
              placeholder={placeholder}
            />
            <hr
              className="
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-neutral-800
                transition
              "
            />
            {!isComment && (
              <div className="my-4">
                <ImageUpload 
                  onChange={(base64) => setImageUrl(base64)} 
                  label="" 
                  value={imageUrl || ""} 
                />
              </div>
            )}
            <div className="flex flex-row justify-end mt-4 gap-2">
              <Button
                label="Post"
                secondary
                disabled={isLoading || (!body && !imageUrl)}
                onClick={onSubmit}
              />
              {!isComment && (
                <Button
                  label="Create With AI"
                  secondary
                  disabled={isLoading}
                  onClick={generateModal.onOpen} 
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold ">
            Welcome to SocialSphere
          </h1>
          <div className="flex flex-row items-center justify-center gap-4 ">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" secondary onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
      <GenerateModal
        isOpen={generateModal.isOpen}
        onClose={generateModal.onClose}
        onGenerate={handleGeneratedContent} 
      />
    </div>
  );
};

export default Form;
