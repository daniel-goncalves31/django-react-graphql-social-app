import DefaultBackImage from "../images/back_image.jpg";
import DefaultUserImage from "../images/user.jpg";

export const getImageUrl = (
  image: string | null | undefined,
  type: "photo" | "back image"
) => {
  if (image) {
    return concatenatePath(image);
  } else if (type === "photo") {
    return DefaultUserImage;
  } else if (type === "back image") {
    return DefaultBackImage;
  }
};

const concatenatePath = (imageUrl: string) =>
  `${process.env.REACT_APP_SERVER_URL}/images/${imageUrl}`;
