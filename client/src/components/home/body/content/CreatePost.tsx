import imageCompression from "browser-image-compression";
import React, { useRef, useState } from "react";
import ImageSelectPreview from "react-image-select-pv";
import { useCreatePostMutation } from "../../../../graphql/generated";
interface Props {}

const CreatePost: React.FC<Props> = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const [createPost] = useCreatePostMutation();

  const handleImageChange = (files: any) => {
    console.log(files);
    setImage(files[0].blob);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    console.log(image);
    try {
      let compressedFile = null;
      if (image) {
        compressedFile = await imageCompression(image, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
        });
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );
      }
      console.log(compressedFile);
      const text = textRef.current!.value;
      const response = await createPost({
        variables: { postInput: { image: compressedFile, text } },
      });
      console.log(response);
      setImage(null);
    } catch (error) {
      if (error.networkError) console.log(error.networkError.result);
      else console.log(error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-center text-2xl mb-2">Create a Post</h1>
      <hr />
      <form
        encType="multipart/form-data"
        className="space-y-2 py-2"
        onSubmit={handleOnSubmit}
      >
        <div>
          <label htmlFor="text font-semibold" className="text-sm">
            Text
          </label>
          <textarea
            className="w-full rounded block bg-gray-200 text-sm p-2"
            id="text"
            rows={4}
            required
            ref={textRef}
          ></textarea>
        </div>
        <ImageSelectPreview
          max={1}
          onChange={handleImageChange}
          onError={(e: any) => (e.length ? console.error(e) : null)}
          maxImageSize={3000000}
          imageStyle={{
            width: "100%",
            height: "360px",
            objectFit: "cover",
            objectPostion: "center",
          }}
        />
        <button
          type="submit"
          className="bg-green-400 rounded px-4 py-2 text-sm text-white ml-auto block hover:bg-green-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
