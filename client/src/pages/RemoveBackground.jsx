import React, { useRef, useState } from "react";
import {
  Upload,
  Wand2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

const RemoveBackground = () => {
  const inputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [outputImage, setOutputImage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  // Upload Image

  const handleImage = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setOutputImage("");
  };

  // Input Change

  const onInputChange = (e) => {
    handleImage(e.target.files[0]);
  };

  // Drag Drop

  const onDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length) {
      handleImage(e.dataTransfer.files[0]);
    }
  };

  // Remove Background

  const removeBackground = async () => {
    if (!selectedImage) return;

    setLoading(true);

    // Demo

    setTimeout(() => {
      setOutputImage(preview);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-wrap gap-6">

      {/* LEFT PANEL */}

      <div className="w-full lg:flex-1 bg-white rounded-2xl border border-gray-200 p-6">

        <div className="flex items-center gap-3">

          <Wand2 className="text-violet-600" />

          <h2 className="text-xl font-bold text-gray-800">
            Remove Background
          </h2>

        </div>

        {/* Upload */}

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current.click()}
          className={`

          mt-8

          border-2

          border-dashed

          rounded-2xl

          cursor-pointer

          transition

          p-10

          text-center

          ${
            dragging
              ? "border-violet-500 bg-violet-50"
              : "border-gray-300"
          }

          `}
        >

          <input
            ref={inputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={onInputChange}
          />

          <Upload
            size={42}
            className="mx-auto text-violet-500"
          />

          <h3 className="mt-5 font-semibold text-gray-700">

            Drag & Drop Image

          </h3>

          <p className="text-sm text-gray-500 mt-2">

            or click to browse

          </p>

        </div>

        {/* Selected Image */}

        {preview && (

          <div className="mt-6">

            <p className="font-medium text-gray-700 mb-3">

              Selected Image

            </p>

            <img
              src={preview}
              alt=""
              className="rounded-xl border w-full max-h-72 object-cover"
            />

          </div>

        )}

        {/* Button */}

        <button
          onClick={removeBackground}
          disabled={!selectedImage || loading}
          className="mt-8 w-full py-3 rounded-xl
          bg-gradient-to-r
          from-violet-600
          to-indigo-500
          text-white
          flex
          justify-center
          items-center
          gap-2
          disabled:opacity-60"
        >

          {loading ? (
            <>
              <Loader2 className="animate-spin" />

              Removing...
            </>
          ) : (
            <>
              <ImageIcon />

              Remove Background
            </>
          )}

        </button>
      </div>
            {/* RIGHT PANEL */}

      <div className="w-full lg:flex-1 bg-white rounded-2xl border border-gray-200 p-6 min-h-[650px] flex flex-col">

        <div className="flex items-center gap-3">

          <ImageIcon className="text-violet-600" />

          <h2 className="text-xl font-bold text-gray-800">
            Preview
          </h2>

        </div>

        {/* CONTENT */}

        <div className="flex-1 flex items-center justify-center mt-6">

          {loading ? (

            <div className="text-center">

              <Loader2
                size={55}
                className="mx-auto animate-spin text-violet-600"
              />

              <h3 className="mt-5 text-lg font-semibold text-gray-700">
                Removing Background...
              </h3>

              <p className="text-gray-500 mt-2">
                Please wait while AI processes your image.
              </p>

            </div>

          ) : outputImage ? (

            <div className="w-full">

              <img
                src={outputImage}
                alt="Result"
                className="rounded-xl border border-gray-200 shadow-md w-full max-h-[420px] object-contain"
              />

              <div className="grid grid-cols-2 gap-3 mt-6">

                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setPreview("");
                    setOutputImage("");
                  }}
                  className="border rounded-xl py-3 hover:bg-gray-50 transition"
                >
                  Upload Another
                </button>

                <a
                  href={outputImage}
                  download="background-removed.png"
                  className="bg-violet-600 hover:bg-violet-700 transition text-white rounded-xl py-3 flex justify-center items-center"
                >
                  Download PNG
                </a>

              </div>

            </div>

          ) : (

            <div className="text-center">

              <ImageIcon
                size={70}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-6 text-lg font-semibold text-gray-700">
                No Image Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Upload an image to preview the result.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default RemoveBackground;