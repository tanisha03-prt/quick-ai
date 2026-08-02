import React, { useState } from "react";
import {
  Sparkles,
  Image,
  Loader2,
  Download,
  Copy,
} from "lucide-react";

const GenerateImages = () => {
  const imageStyles = [
    "Realistic",
    "Anime",
    "Ghibli",
    "Cartoon",
    "Fantasy",
    "3D Render",
    "Portrait",
    "Oil Painting",
  ];

  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setLoading(true);

    // Temporary Demo
    setTimeout(() => {
      setGeneratedImage(
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900"
      );

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-wrap gap-6">

      {/* LEFT PANEL */}

      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:flex-1 bg-white rounded-xl border border-gray-200 p-6"
      >

        {/* Heading */}

        <div className="flex items-center gap-3">

          <Sparkles className="w-6 h-6 text-green-500" />

          <h2 className="text-xl font-semibold">
            AI Image Generator
          </h2>

        </div>

        {/* Prompt */}

        <p className="mt-8 text-sm font-medium">
          Describe Your Image
        </p>

        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to generate..."
          className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Style */}

        <p className="mt-6 text-sm font-medium">
          Select Style
        </p>

        <div className="flex flex-wrap gap-3 mt-3">

          {imageStyles.map((style) => (

            <button
              key={style}
              type="button"
              onClick={() => setSelectedStyle(style)}
              className={`px-4 py-2 rounded-full border text-sm transition

              ${
                selectedStyle === style
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "border-gray-300 text-gray-500 hover:bg-gray-100"
              }
              
              `}
            >
              {style}
            </button>

          ))}

        </div>

        {/* Publish */}

        <div className="mt-8 flex items-center gap-4">

          <label className="relative inline-flex items-center cursor-pointer">

            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="sr-only peer"
            />

            <div
              className="
              w-11
              h-6
              bg-gray-300
              rounded-full
              peer
              peer-checked:bg-green-500
              transition
              "
            ></div>

            <div
              className="
              absolute
              left-1
              top-1
              bg-white
              w-4
              h-4
              rounded-full
              transition
              peer-checked:translate-x-5
              "
            ></div>

          </label>

          <span className="text-sm text-gray-700">
            Make this image public
          </span>

        </div>

        {/* Button */}

        <button
          disabled={loading}
          className="
          mt-8
          w-full
          flex
          justify-center
          items-center
          gap-2
          py-3
          rounded-lg
          text-white
          bg-gradient-to-r
          from-green-600
          to-emerald-500
          hover:opacity-90
          transition
          "
        >

          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image className="w-5 h-5" />
              Generate Image
            </>
          )}

        </button>
      </form>
            {/* RIGHT PANEL */}

      <div
        className="
        w-full
        lg:flex-1
        bg-white
        rounded-xl
        border
        border-gray-200
        p-6
        min-h-[600px]
        flex
        flex-col
        "
      >

        {/* Heading */}

        <div className="flex items-center gap-3">

          <Image className="w-6 h-6 text-green-500" />

          <h2 className="text-xl font-semibold">
            Generated Image
          </h2>

        </div>

        {/* CONTENT */}

        <div className="flex-1 flex items-center justify-center mt-6">

          {/* Loading */}

          {loading ? (

            <div className="text-center">

              <Loader2 className="w-14 h-14 mx-auto animate-spin text-green-500" />

              <p className="mt-4 text-gray-500">
                Creating your AI image...
              </p>

            </div>

          ) : generatedImage ? (

            <div className="w-full">

              <img
                src={generatedImage}
                alt="Generated"
                className="
                w-full
                rounded-xl
                border
                border-gray-200
                object-cover
                shadow-md
                "
              />

              {/* Buttons */}

              <div className="grid grid-cols-2 gap-3 mt-5">

                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(prompt)}
                  className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-lg
                  border
                  hover:bg-gray-50
                  "
                >
                  <Copy className="w-5 h-5" />
                  Copy Prompt
                </button>

                <a
                  href={generatedImage}
                  download
                  className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-lg
                  bg-green-600
                  text-white
                  hover:bg-green-700
                  transition
                  "
                >
                  <Download className="w-5 h-5" />
                  Download
                </a>

              </div>

              {/* Details */}

              <div className="mt-6 space-y-2 text-sm text-gray-600">

                <p>
                  <span className="font-semibold">
                    Prompt:
                  </span>{" "}
                  {prompt}
                </p>

                <p>
                  <span className="font-semibold">
                    Style:
                  </span>{" "}
                  {selectedStyle}
                </p>

                <p>
                  <span className="font-semibold">
                    Public:
                  </span>{" "}
                  {publish ? "Yes" : "No"}
                </p>

              </div>

            </div>

          ) : (

            /* Empty State */

            <div className="text-center text-gray-400">

              <Image className="mx-auto w-16 h-16 mb-5" />

              <h3 className="text-lg font-medium mb-2">
                No Image Generated
              </h3>

              <p>
                Describe your idea, choose a style
              </p>

              <p>
                and click
                <span className="font-semibold">
                  {" "}Generate Image
                </span>
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );
};

export default GenerateImages;