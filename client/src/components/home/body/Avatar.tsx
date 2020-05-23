import React, { useRef } from "react";
import { useUserContext } from "../../../context/UserContext";
import { EImageType, useChangeImageMutation } from "../../../graphql/generated";
import { handleErrors } from "../../../utils/error_handler";
import { getImageUrl } from "../../../utils/getImageUrl";

interface Props {}

const Avatar: React.FC<Props> = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const fileRef = useRef<HTMLInputElement>(null);
  const userPhoto = getImageUrl(currentUser?.photo, "photo");
  const [chageImage] = useChangeImageMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const image = e.target.files![0];
    if (!image) return;
    try {
      const res = await chageImage({
        variables: { imageInput: { image, imageType: EImageType.Photo } },
      });
      if (res.data && res.data.changeImage && res.data.changeImage.imageUrl) {
        const photo = res.data.changeImage.imageUrl;
        setCurrentUser({ ...currentUser!, photo });
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <div className="w-2/12 flex justify-center">
      <img
        className="h-40 w-40 rounded-full shadow object-center object-cover border-2 border-gray-300 cursor-pointer"
        src={userPhoto}
        alt="user"
        onClick={() => fileRef.current?.click()}
      />
      <input type="file" ref={fileRef} hidden onChange={handleFileChange} />
    </div>
  );
};

export default React.memo(Avatar);
