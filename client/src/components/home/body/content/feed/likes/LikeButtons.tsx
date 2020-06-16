import React from "react";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { useUserStatisticsContext } from "../../../../../../context/UserStatistics";
import {
  LikeType,
  useDislikePostMutation,
  useLikePostMutation,
} from "../../../../../../graphql/generated";
import { handleErrors } from "../../../../../../utils/error_handler";

interface Props {
  likes: LikeType[];
  setLikes: React.Dispatch<React.SetStateAction<LikeType[]>>;
  currentUserId: string;
  postId: string;
}

const LikeButtons: React.FC<Props> = ({
  likes,
  setLikes,
  currentUserId,
  postId,
}) => {
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();
  const { setUserStatistics } = useUserStatisticsContext();
  const currentUserLike = likes.find((like) => like.user.id === currentUserId);
  const handleLikePost = async () => {
    try {
      const { data } = await likePost({ variables: { postId } });
      if (data?.likePost?.like) {
        setLikes((prevLikes) => [...prevLikes, data?.likePost?.like as any]);
        setUserStatistics((prevStats) => ({
          ...prevStats,
          likesCount: prevStats.likesCount! + 1,
        }));
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleDislikePost = async () => {
    try {
      const { data } = await dislikePost({
        variables: { likeId: currentUserLike?.id! },
      });
      if (data?.dislikePost?.disliked) {
        const likeToRemoveIndex = likes.findIndex(
          (like) => like.id === currentUserLike?.id
        );
        const newLikes = likes;
        newLikes.splice(likeToRemoveIndex, 1);
        setLikes([...newLikes]);
        setUserStatistics((prevStats) => ({
          ...prevStats,
          likesCount: prevStats.likesCount! - 1,
        }));
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <>
      {currentUserLike ? (
        <button
          type="button"
          className="flex items-center outline-none bg-transparent text-red-400 text-xs hover:text-red-600 focus:outline-none"
          style={{ lineHeight: "1px" }}
          onClick={handleDislikePost}
        >
          <FiThumbsDown className="mr-1" />
          Dislike
        </button>
      ) : (
        <button
          type="button"
          className="flex items-center outline-none bg-transparent text-indigo-400 text-xs hover:text-indigo-600 focus:outline-none"
          style={{ lineHeight: "1px" }}
          onClick={handleLikePost}
        >
          <FiThumbsUp className="mr-1" />
          Like
        </button>
      )}
    </>
  );
};

export default LikeButtons;
