import React, { useContext, useState } from "react";
import {
  FileText,
  Sparkles,
  Wand2,
  Copy,
  Check,
  RefreshCw,
  BookOpen,
  Clock3,
  Hash,
  ChevronDown,
} from "lucide-react";

import { AppContext } from "../context/AppContext";

const WriteArticle = () => {
  const { axios } = useContext(AppContext);

  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("Short");
  const [tone, setTone] = useState("Professional");
  const [language, setLanguage] = useState("English");

  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const suggestions = [
    "AI in Education",
    "Future of Web Development",
    "Healthy Lifestyle",
  ];

  // =========================
  // GENERATE ARTICLE
  // =========================
  const generateArticle = async () => {
    if (!topic.trim()) {
      alert("Please enter an article topic.");
      return;
    }

    try {
      setLoading(true);
      setArticle("");

      const { data } = await axios.post("/api/ai/write-article", {
        topic,
        length,
        tone,
        language,
      });

      if (data.success) {
        setArticle(data.article || data.content || "");
      } else {
        alert(data.message || "Failed to generate article.");
      }
    } catch (error) {
      console.log("Write Article Error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while generating the article."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // COPY ARTICLE
  // =========================
  const copyArticle = async () => {
    if (!article) return;

    try {
      await navigator.clipboard.writeText(article);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // WORD COUNT
  // =========================
  const wordCount = article
    ? article.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="write-article-page h-full overflow-hidden bg-[#f8fafc] p-2.5">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-2 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <FileText size={16} />
          </div>

          <div>
            <h1 className="text-[14px] font-bold leading-5 text-slate-800">
              Write Article
            </h1>

            <p className="text-[8px] text-slate-400">
              Create polished articles with AI
            </p>
          </div>

        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-violet-100 bg-white px-2.5 py-1 text-[8px] font-semibold text-violet-600">
          <Sparkles size={10} />
          AI Writer
        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="grid h-[calc(100%-45px)] grid-cols-1 gap-2.5 md:grid-cols-[235px_minmax(0,1fr)]">


        {/* ===================================================
            LEFT CONTROL PANEL
        =================================================== */}

        <div className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">

          {/* Topic */}
          <div>

            <div className="mb-1.5 flex items-center justify-between">

              <label className="text-[9px] font-semibold text-slate-700">
                Article Topic
              </label>

              <span className="text-[7px] text-slate-400">
                Required
              </span>

            </div>

            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How AI is changing education..."
              className="h-[72px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50/60 p-2 text-[9px] leading-4 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />

          </div>


          {/* Quick Ideas */}
          <div className="mt-2">

            <p className="mb-1 text-[7px] font-bold uppercase tracking-wide text-slate-400">
              Quick Ideas
            </p>

            <div className="flex flex-wrap gap-1">

              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setTopic(suggestion)}
                  className="rounded-full border border-slate-200 bg-white px-1.5 py-1 text-[7px] text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                >
                  {suggestion}
                </button>
              ))}

            </div>

          </div>


          {/* Settings */}
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">

            {/* Length */}
            <div>

              <label className="mb-1 block text-[7px] font-semibold text-slate-500">
                Length
              </label>

              <div className="relative">

                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[8px] text-slate-600 outline-none focus:border-violet-300"
                >
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                </select>

                <ChevronDown
                  size={9}
                  className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>


            {/* Tone */}
            <div>

              <label className="mb-1 block text-[7px] font-semibold text-slate-500">
                Tone
              </label>

              <div className="relative">

                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[8px] text-slate-600 outline-none focus:border-violet-300"
                >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
                  <option>Creative</option>
                </select>

                <ChevronDown
                  size={9}
                  className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

          </div>


          {/* Language */}
          <div className="mt-2">

            <label className="mb-1 block text-[7px] font-semibold text-slate-500">
              Language
            </label>

            <div className="relative">

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[8px] text-slate-600 outline-none focus:border-violet-300"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Hinglish</option>
              </select>

              <ChevronDown
                size={9}
                className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

          </div>


          {/* Generate Button */}
          <div className="mt-auto pt-2.5">

            <button
              type="button"
              onClick={generateArticle}
              disabled={!topic.trim() || loading}
              className="group flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 py-2 text-[9px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading ? (
                <>
                  <RefreshCw
                    size={11}
                    className="animate-spin"
                  />

                  Generating...
                </>
              ) : (
                <>
                  <Wand2
                    size={11}
                    className="transition-transform group-hover:rotate-12"
                  />

                  Generate Article
                </>
              )}

            </button>

            <p className="mt-1 text-center text-[6px] text-slate-400">
              AI-generated content may need review
            </p>

          </div>

        </div>


        {/* ===================================================
            RIGHT ARTICLE PREVIEW
        =================================================== */}

        <div className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Preview Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">

            <div className="flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                <BookOpen size={13} />
              </div>

              <div>

                <h2 className="text-[10px] font-bold text-slate-700">
                  Article Preview
                </h2>

                <p className="text-[7px] text-slate-400">
                  Your generated content appears here
                </p>

              </div>

            </div>


            {/* Copy */}
            {article && (
              <button
                type="button"
                onClick={copyArticle}
                className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[7px] font-medium text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
              >
                {copied ? (
                  <>
                    <Check size={9} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={9} />
                    Copy
                  </>
                )}
              </button>
            )}

          </div>


          {/* =================================================
              ARTICLE BODY
          ================================================= */}

          <div className="min-h-0 flex-1 overflow-y-auto">

            {/* Loading */}
            {loading && (
              <div className="flex h-full flex-col items-center justify-center">

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">

                  <Sparkles
                    size={19}
                    className="animate-pulse"
                  />

                  <span className="absolute inset-0 animate-ping rounded-xl border border-violet-200 opacity-40" />

                </div>

                <p className="mt-2.5 text-[9px] font-semibold text-slate-600">
                  Writing your article...
                </p>

                <p className="mt-0.5 text-[7px] text-slate-400">
                  AI is turning your idea into polished content
                </p>

              </div>
            )}


            {/* Generated Article */}
            {!loading && article && (
              <div className="mx-auto max-w-3xl px-4 py-3">

                {/* Article Meta */}
                <div className="mb-3 border-b border-slate-100 pb-2.5">

                  <div className="mb-1 flex items-center gap-1.5">

                    <span className="rounded-full bg-violet-50 px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wide text-violet-600">
                      AI ARTICLE
                    </span>

                    <span className="text-[7px] text-slate-400">
                      {tone}
                    </span>

                    <span className="text-slate-300">
                      •
                    </span>

                    <span className="text-[7px] text-slate-400">
                      {language}
                    </span>

                  </div>

                  <h1 className="text-[17px] font-bold leading-6 text-slate-800">
                    {topic}
                  </h1>

                </div>


                {/* Article */}
                <article className="whitespace-pre-wrap text-[9px] leading-[1.7] text-slate-600">
                  {article}
                </article>

              </div>
            )}


            {/* Empty State */}
            {!loading && !article && (
              <div className="flex h-full flex-col items-center justify-center px-5 text-center">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 text-violet-500">
                  <FileText size={22} />
                </div>

                <h3 className="mt-2.5 text-[11px] font-bold text-slate-700">
                  Your article will appear here
                </h3>

                <p className="mt-1 max-w-xs text-[8px] leading-4 text-slate-400">
                  Enter a topic, choose your preferences and let AI create a polished article for you.
                </p>

              </div>
            )}

          </div>


          {/* =================================================
              FOOTER STATS
          ================================================= */}

          {article && (
            <div className="flex items-center gap-3 border-t border-slate-100 px-2.5 py-1.5">

              <div className="flex items-center gap-1 text-[7px] text-slate-400">
                <Hash size={9} />
                {wordCount} words
              </div>

              <div className="flex items-center gap-1 text-[7px] text-slate-400">
                <Clock3 size={9} />
                {readingTime} min read
              </div>

              <div className="ml-auto flex items-center gap-1 text-[7px] text-emerald-500">
                <Sparkles size={8} />
                AI Generated
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default WriteArticle;