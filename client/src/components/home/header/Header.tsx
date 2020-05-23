import React, { useRef } from "react";
import { useUserContext } from "../../../context/UserContext";
import { EImageType, useChangeImageMutation } from "../../../graphql/generated";
import { handleErrors } from "../../../utils/error_handler";
import { getImageUrl } from "../../../utils/getImageUrl";
import Navbar from "./navbar/Navbar";

interface Props {}

const Header: React.FC<Props> = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const [chageImage] = useChangeImageMutation();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const image = e.target.files![0];
    if (!image) return;
    try {
      const res = await chageImage({
        variables: { imageInput: { image, imageType: EImageType.BackImage } },
      });
      if (res.data && res.data.changeImage && res.data.changeImage.imageUrl) {
        const backImage = res.data.changeImage.imageUrl;
        setCurrentUser({ ...currentUser!, backImage });
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const image = getImageUrl(currentUser?.backImage, "back image");
  return (
    <>
      <Navbar />
      <img
        className="w-full h-48 object-cover object-center flex cursor-pointer"
        src={image}
        alt="background"
        style={{ filter: "brightness(0.8)" }}
        onClick={() => fileRef.current?.click()}
      />
      <input type="file" ref={fileRef} hidden onChange={handleFileChange} />
    </>
  );
};

export default Header;
