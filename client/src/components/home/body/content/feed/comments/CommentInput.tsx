import React, { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { useAllUsersContext } from "../../../../../../context/AllUsersContext";
import { useCreateCommentMutation } from "../../../../../../graphql/generated";
import { handleErrors } from "../../../../../../utils/error_handler";
import EmojiPicker from "./EmojiPicker";

interface Props {
  postId: string;
}

let markedUsers: { id: string; display: string }[] = [];

const CommentInput: React.FC<Props> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [createComment, { loading }] = useCreateCommentMutation();

  const { allUsers } = useAllUsersContext();

  const handleonKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.which === 13 && !event.shiftKey) {
      (event.target as any).form.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
      event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment || loading) return;

    let markedUsersId: string[] = [];

    markedUsers.forEach(({ id, display }) =>
      comment.search(display) > -1 ? markedUsersId.push(id) : null
    );

    markedUsersId = Array.from(new Set([...markedUsersId]));

    try {
      await createComment({
        variables: {
          commentInput: { postId, text: comment, usersMarked: markedUsersId },
        },
      });
      setComment("");
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <div
      className=" px-3 py-2 w-full text-gray-800 rounded-lg"
      style={{ background: "#e8e8ea" }}
    >
      <form className="block" onSubmit={handleOnSubmit}>
        <MentionsInput
          className="comments-textarea text-xs"
          value={comment}
          onChange={(_, __, text) => setComment(text)}
          allowSuggestionsAboveCursor
          // style={{ maxWidth: window.innerWidth * 0.5 }}
          style={{ width: 566.67, maxWidth: 566.67 }}
          placeholder="Comment..."
          onKeyPress={handleonKeyPress}
          disabled={loading}
        >
          <Mention
            trigger="@"
            displayTransform={(_, display) => `@${display}`}
            style={{ color: "#326aca", fontWeight: "bold" }}
            data={
              allUsers?.map(({ id, username }) => ({ id, display: username }))!
            }
            onAdd={(id, display) =>
              markedUsers.push({ id: id as any, display })
            }
          />
        </MentionsInput>
      </form>
      <EmojiPicker setComment={setComment} />
    </div>
  );
};

export default CommentInput;
