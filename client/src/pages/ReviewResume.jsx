import React, { useRef, useState } from "react";
import {
  FileText,
  Upload,
  Loader2,
  ScanSearch,
} from "lucide-react";

const ReviewResume = () => {
  const inputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  // Upload Resume

  const handleResume = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF Resume.");
      return;
    }

    setResume(file);
    setPreviewName(file.name);
    setAnalysis(null);
  };

  // Input

  const onInputChange = (e) => {
    handleResume(e.target.files[0]);
  };

  // Drag & Drop

  const onDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length) {
      handleResume(e.dataTransfer.files[0]);
    }
  };

  // Analyze Resume

  const analyzeResume = async () => {
    if (!resume) return;

    setLoading(true);

    // Temporary Demo

    setTimeout(() => {
      setAnalysis({
        score: 88,
      });

      setLoading(false);
    }, 2500);
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-wrap gap-6">

      {/* LEFT PANEL */}

      <div className="w-full lg:flex-1 bg-white rounded-2xl border border-gray-200 p-6">

        {/* Heading */}

        <div className="flex items-center gap-3">

          <ScanSearch className="text-blue-600" />

          <h2 className="text-xl font-bold text-gray-800">
            AI Resume Analyzer
          </h2>

        </div>

        {/* Upload */}

        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`

          mt-8

          border-2

          border-dashed

          rounded-2xl

          p-10

          cursor-pointer

          text-center

          transition

          ${
            dragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }

          `}
        >

          <input
            ref={inputRef}
            hidden
            type="file"
            accept=".pdf"
            onChange={onInputChange}
          />

          <Upload
            size={45}
            className="mx-auto text-blue-600"
          />

          <h3 className="mt-5 font-semibold text-gray-700">
            Upload Resume
          </h3>

          <p className="text-gray-500 mt-2">
            Drag & Drop PDF
          </p>

          <p className="text-gray-400 text-sm">
            or click to browse
          </p>

        </div>

        {/* Preview */}

        {previewName && (

          <div className="mt-8 rounded-xl border border-gray-200 p-5">

            <div className="flex items-center gap-4">

              <FileText
                size={42}
                className="text-red-500"
              />

              <div>

                <h3 className="font-semibold text-gray-800">
                  Resume Uploaded
                </h3>

                <p className="text-gray-500 text-sm">
                  {previewName}
                </p>

              </div>

            </div>

          </div>

        )}

        {/* Analyze */}

        <button
          disabled={!resume || loading}
          onClick={analyzeResume}
          className="
          mt-8
          w-full
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          text-white
          py-3
          flex
          justify-center
          items-center
          gap-2
          disabled:opacity-60
          "
        >

          {

            loading ?

            <>

              <Loader2 className="animate-spin" />

              Analyzing Resume...

            </>

            :

            <>

              <ScanSearch />

              Analyze Resume

            </>

          }

        </button>

      </div>
            {/* RIGHT PANEL */}

      <div className="w-full lg:flex-1 bg-white rounded-2xl border border-gray-200 p-6 min-h-[650px] flex flex-col">

        <div className="flex items-center gap-3">

          <ScanSearch className="text-blue-600" />

          <h2 className="text-xl font-bold text-gray-800">
            Resume Analysis
          </h2>

        </div>

        <div className="flex-1 flex items-center justify-center mt-6">

          {loading ? (

            <div className="text-center">

              <Loader2
                size={55}
                className="mx-auto animate-spin text-blue-600"
              />

              <h3 className="mt-5 text-lg font-semibold text-gray-700">
                AI is reviewing your resume...
              </h3>

              <p className="mt-2 text-gray-500">
                Please wait while we analyze your resume.
              </p>

            </div>

          ) : analysis ? (

            <div className="w-full space-y-5">

              {/* ATS Score */}

              <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">

                <p className="text-sm uppercase tracking-wide">
                  ATS Score
                </p>

                <h1 className="text-5xl font-bold mt-2">
                  {analysis.score}%
                </h1>

                <p className="mt-3 text-sm text-blue-100">
                  Your resume is ATS friendly with room for improvement.
                </p>

              </div>

              {/* Strengths */}

              <div className="rounded-xl border border-green-200 bg-green-50 p-5">

                <h3 className="font-semibold text-green-700">
                  Strengths
                </h3>

                <ul className="list-disc ml-5 mt-3 space-y-2 text-gray-700">

                  <li>Clear section headings</li>

                  <li>Professional formatting</li>

                  <li>Relevant technical skills</li>

                  <li>Good education section</li>

                </ul>

              </div>

              {/* Improvements */}

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">

                <h3 className="font-semibold text-yellow-700">
                  Improvement Suggestions
                </h3>

                <ul className="list-disc ml-5 mt-3 space-y-2 text-gray-700">

                  <li>Add measurable achievements.</li>

                  <li>Include more action verbs.</li>

                  <li>Tailor keywords for the job role.</li>

                  <li>Add 2–3 impactful projects.</li>

                </ul>

              </div>

              {/* Skills */}

              <div className="rounded-xl border border-gray-200 p-5">

                <h3 className="font-semibold text-gray-800 mb-4">
                  Detected Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {[
                    "Java",
                    "React",
                    "JavaScript",
                    "HTML",
                    "CSS",
                    "Git",
                    "SQL",
                  ].map((skill) => (

                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

              {/* Buttons */}

              <div className="grid grid-cols-2 gap-4">

                <button
                  onClick={() => {
                    setResume(null);
                    setPreviewName("");
                    setAnalysis(null);
                  }}
                  className="border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition"
                >
                  Upload Another
                </button>

                <button
                  onClick={() => window.print()}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 transition"
                >
                  Download Report
                </button>

              </div>

            </div>

          ) : (

            <div className="text-center">

              <ScanSearch
                size={70}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-6 text-lg font-semibold text-gray-700">
                No Resume Analysis Yet
              </h3>

              <p className="mt-2 text-gray-500">
                Upload your resume and click
              </p>

              <p className="text-gray-500">
                <span className="font-semibold">
                  Analyze Resume
                </span>{" "}
                to receive AI-powered feedback.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default ReviewResume;
