import React, { useState } from "react";
import { useCreateMessageMutation } from "../../../graphql/generated";
import { handleErrors } from "../../../utils/error_handler";

interface Props {
  userId: string;
}

const ChatInput: React.FC<Props> = ({ userId }) => {
  const [sendMessage] = useCreateMessageMutation();
  const [text, setText] = useState("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text) return;

    try {
      const res = await sendMessage({
        variables: { messageInput: { userId, text } },
      });
      console.log(res);
      setText("");
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <form
      className="p-2 mt-2 border-t border-gray-300"
      onSubmit={handleOnSubmit}
    >
      <input
        type="text"
        placeholder="Say something..."
        className="inline-block p-2 w-full text-xs rounded-full bg-gray-200"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </form>
  );
};

export default ChatInput;
