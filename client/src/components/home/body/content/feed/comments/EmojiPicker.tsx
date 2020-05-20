import { Picker } from "emoji-mart";
import React, { useState } from "react";
import { GrEmoji } from "react-icons/gr";

interface Props {
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const EmojiPicker: React.FC<Props> = ({ setComment }) => {
  const [showEmojis, setShowEmojis] = useState(false);

  return (
    <div className="flex justify-end relative">
      <button
        className="p-1 rounded-full focus:outline-none"
        onClick={() => setShowEmojis((prev) => !prev)}
      >
        <GrEmoji className="h-5 w-5" />
      </button>
      {showEmojis && (
        <Picker
          onSelect={(e) => setComment((prev) => prev + (e as any).native)}
          style={{ position: "absolute", top: "32px" }}
        />
      )}
    </div>
  );
};

export default EmojiPicker;
