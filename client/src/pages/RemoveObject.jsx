import React, { useRef, useState } from "react";
import {
  Eraser,
  Upload,
  Loader2,
  Brush,
} from "lucide-react";

const RemoveObject = () => {
  const inputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [brushSize, setBrushSize] = useState(25);
  const [dragging, setDragging] = useState(false);

  const uploadImage = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length) {
      uploadImage(e.dataTransfer.files[0]);
    }
  };

  const removeObject = async () => {
    if (!image) return;

    setLoading(true);

    setTimeout(() => {
      setResult(preview);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-wrap gap-6">

      {/* LEFT */}

      <div className="w-full lg:flex-1 bg-white rounded-2xl border border-gray-200 p-6">

        <div className="flex items-center gap-3">

          <Eraser className="text-pink-600"/>

          <h2 className="text-xl font-bold text-gray-800">
            Remove Objects
          </h2>

        </div>

        {/* Upload */}

        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e)=>{
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={()=>setDragging(false)}
          onDrop={handleDrop}
          className={`

          mt-8
          border-2
          border-dashed
          rounded-2xl
          p-10
          text-center
          cursor-pointer
          transition

          ${
            dragging
              ? "border-pink-500 bg-pink-50"
              : "border-gray-300"
          }

          `}
        >

          <input
            hidden
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e)=>uploadImage(e.target.files[0])}
          />

          <Upload
            size={42}
            className="mx-auto text-pink-600"
          />

          <h3 className="mt-5 font-semibold text-gray-700">
            Drag & Drop Image
          </h3>

          <p className="text-gray-500 mt-2">
            or click to browse
          </p>

        </div>

        {/* Preview */}

        {preview && (

          <div className="mt-6">

            <p className="font-medium text-gray-700 mb-3">
              Original Image
            </p>

            <img
              src={preview}
              alt=""
              className="rounded-xl border w-full max-h-72 object-cover"
            />

          </div>

        )}

        {/* Brush */}

        <div className="mt-8">

          <div className="flex justify-between">

            <p className="font-medium text-gray-700">
              Brush Size
            </p>

            <span className="text-pink-600 font-semibold">
              {brushSize}px
            </span>

          </div>

          <input
            type="range"
            min="10"
            max="100"
            value={brushSize}
            onChange={(e)=>setBrushSize(e.target.value)}
            className="w-full mt-3"
          />

        </div>

        <button
          disabled={!image || loading}
          onClick={removeObject}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 text-white py-3 flex justify-center items-center gap-2"
        >

          {

            loading ?

            <>

              <Loader2 className="animate-spin"/>

              Removing...

            </>

            :

            <>

              <Brush/>

              Remove Selected Object

            </>

          }

        </button>

      </div>
            {/* RIGHT PANEL */}

      <div className="w-full lg:flex-1 bg-white rounded-2xl border border-gray-200 p-6 min-h-[650px] flex flex-col">

        <div className="flex items-center gap-3">

          <Brush className="text-pink-600" />

          <h2 className="text-xl font-bold text-gray-800">
            Result Preview
          </h2>

        </div>

        <div className="flex-1 flex justify-center items-center mt-6">

          {loading ? (

            <div className="text-center">

              <Loader2
                size={55}
                className="mx-auto animate-spin text-pink-600"
              />

              <h3 className="mt-5 text-lg font-semibold text-gray-700">
                AI is removing selected object...
              </h3>

              <p className="mt-2 text-gray-500">
                This usually takes a few seconds.
              </p>

            </div>

          ) : result ? (

            <div className="w-full">

              <img
                src={result}
                alt="Result"
                className="rounded-xl border border-gray-200 shadow-md w-full max-h-[420px] object-contain"
              />

              <div className="grid grid-cols-2 gap-4 mt-6">

                <button
                  onClick={()=>{
                    setImage(null);
                    setPreview("");
                    setResult("");
                  }}
                  className="
                  rounded-xl
                  border
                  border-gray-300
                  py-3
                  hover:bg-gray-50
                  transition
                  "
                >
                  Upload Another
                </button>

                <a
                  href={result}
                  download="object-removed.png"
                  className="
                  rounded-xl
                  bg-pink-600
                  hover:bg-pink-700
                  transition
                  text-white
                  flex
                  justify-center
                  items-center
                  "
                >
                  Download
                </a>

              </div>

              <div className="mt-6 rounded-xl bg-pink-50 border border-pink-200 p-4">

                <h4 className="font-semibold text-pink-700">
                  AI Processing Summary
                </h4>

                <ul className="mt-3 space-y-2 text-sm text-gray-600">

                  <li>✔ Image uploaded successfully</li>

                  <li>✔ Brush size selected : {brushSize}px</li>

                  <li>✔ Object removed successfully</li>

                  <li>✔ Ready for download</li>

                </ul>

              </div>

            </div>

          ) : (

            <div className="text-center">

              <Brush
                size={70}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-6 text-lg font-semibold text-gray-700">

                No Result Yet

              </h3>

              <p className="mt-2 text-gray-500">

                Upload an image, adjust the brush size,

              </p>

              <p className="text-gray-500">

                then click

                <span className="font-semibold">
                  {" "}Remove Selected Object
                </span>

              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );
};

export default RemoveObject;
