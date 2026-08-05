import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  FilePenLine,
  PenSquare,
  Loader2,
} from "lucide-react";

const WriteArticle = () => {

  const articleLengths = [
    { label: "Short (500-800 words)", value: 800 },
    { label: "Medium (800-1200 words)", value: 1200 },
    { label: "Long (1200+ words)", value: 1600 },
  ];

  const [topic, setTopic] = useState("");
  const [selectedLength, setSelectedLength] = useState(articleLengths[0]);
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!topic.trim()) return;

    setLoading(true);

    // Temporary Demo
    setTimeout(() => {

      setArticle(`# ${topic}

Artificial Intelligence is transforming the world faster than ever.

## Introduction

AI is becoming an important part of healthcare, education, business and daily life.

## Benefits

- Automation
- Better decision making
- Time saving
- Higher productivity

## Challenges

- Privacy
- Security
- Bias

## Conclusion

Artificial Intelligence will continue to change every industry in the coming years.`);

      setLoading(false);

    }, 2000);
  };

  return (

    <div className="p-6 flex flex-wrap gap-6 overflow-y-auto h-full">

      {/* LEFT */}

      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:flex-1 bg-white rounded-xl border border-gray-200 p-6"
      >

        <div className="flex items-center gap-3">

          <Sparkles className="text-blue-500 w-6 h-6" />

          <h2 className="text-xl font-semibold">
            Article Configuration
          </h2>

        </div>

        <p className="mt-8 font-medium">
          Article Topic
        </p>

        <input
          type="text"
          value={topic}
          onChange={(e)=>setTopic(e.target.value)}
          placeholder="The future of Artificial Intelligence..."
          className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"
          required
        />

        <p className="mt-6 font-medium">
          Article Length
        </p>

        <div className="flex flex-wrap gap-3 mt-3">

          {
            articleLengths.map((item,index)=>(
              <button
                type="button"
                key={index}
                onClick={()=>setSelectedLength(item)}
                className={`px-4 py-2 rounded-full border text-sm transition

                ${
                  selectedLength.value===item.value
                  ?
                  "bg-blue-100 text-blue-700 border-blue-500"
                  :
                  "border-gray-300 text-gray-500 hover:bg-gray-100"
                }

                `}
              >

                {item.label}

              </button>
            ))
          }

        </div>

        <button
          disabled={loading}
          className="mt-8 w-full flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 font-medium"
        >

          {

            loading ?

            <>

              <Loader2 className="w-5 h-5 animate-spin"/>

              Generating...

            </>

            :

            <>

              <FilePenLine className="w-5 h-5"/>

              Generate Article

            </>

          }

        </button>

      </form>

      {/* RIGHT */}

      <div className="w-full lg:flex-1 bg-white rounded-xl border border-gray-200 p-6 min-h-[600px] flex flex-col">

        <div className="flex items-center gap-3">

          <FilePenLine className="text-blue-500 w-6 h-6"/>

          <h2 className="text-xl font-semibold">
            Generated Article
          </h2>

        </div>

        {

          article ?

          <div className="prose max-w-none mt-6 overflow-y-auto">

            <ReactMarkdown>

              {article}

            </ReactMarkdown>

          </div>

          :

          <div className="flex-1 flex justify-center items-center">

            <div className="text-center text-gray-400">

              <PenSquare className="mx-auto w-14 h-14 mb-5"/>

              <p>

                Enter a topic and click

              </p>

              <p className="font-medium">

                "Generate Article"

              </p>

              <p>

                to get started.

              </p>

            </div>

          </div>

        }

      </div>

    </div>

  );
};

export default WriteArticle;