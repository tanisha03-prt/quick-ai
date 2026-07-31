import { useState } from "react";
import { Sparkles, Hash, Loader2, Copy, Check } from "lucide-react";

const categories = [
  "General",
  "Technology",
  "Business",
  "Health",
  "Lifestyle",
  "Education",
  "Travel",
  "Food",
];

export default function BlogTitles() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState([]);
  const [copied, setCopied] = useState("");

  const generateTitles = async (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    setLoading(true);

    // Replace with backend later
    setTimeout(() => {
      setTitles([
        `10 Amazing ${keyword} Trends in ${category}`,
        `Complete Guide to ${keyword} for Beginners`,
        `Why ${keyword} Will Change ${category} Forever`,
        `${keyword}: Everything You Need to Know`,
        `Top ${keyword} Tips Every Beginner Should Learn`,
        `How to Master ${keyword} Step by Step`,
        `${keyword} Mistakes You Should Avoid`,
        `The Future of ${keyword} in ${category}`,
      ]);

      setLoading(false);
    }, 1800);
  };

  const copyTitle = async (title) => {
    await navigator.clipboard.writeText(title);
    setCopied(title);

    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="h-full overflow-y-auto p-6 grid lg:grid-cols-2 gap-6 text-slate-800">

      {/* LEFT */}

      <form
        onSubmit={generateTitles}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="text-violet-600" size={26} />
          <h2 className="text-xl font-bold">
            AI Blog Title Generator
          </h2>
        </div>

        <label className="block mt-8 text-sm font-semibold">
          Keyword
        </label>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Artificial Intelligence"
          className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <label className="block mt-8 text-sm font-semibold">
          Category
        </label>

        <div className="flex flex-wrap gap-3 mt-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`px-4 py-2 rounded-full border text-sm transition

              ${
                category === item
                  ? "bg-violet-100 border-violet-500 text-violet-700"
                  : "border-slate-300 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 text-white py-3 flex justify-center items-center gap-2 hover:opacity-95 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Generating...
            </>
          ) : (
            <>
              <Hash size={18} />
              Generate Titles
            </>
          )}
        </button>
      </form>

      {/* RIGHT */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col min-h-[600px]">

        <div className="flex items-center gap-3">
          <Hash className="text-violet-600" />
          <h2 className="text-xl font-bold">
            Generated Titles
          </h2>
        </div>

        {titles.length === 0 ? (
          <div className="flex-1 flex justify-center items-center">

            <div className="text-center text-slate-400">

              <Hash size={50} className="mx-auto mb-4" />

              <p>
                Enter a keyword and generate
              </p>

              <p className="font-semibold">
                AI Blog Titles
              </p>

            </div>

          </div>
        ) : (
          <div className="mt-6 space-y-4 overflow-y-auto">

            {titles.map((title, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 hover:border-violet-400 transition"
              >
                <div className="flex justify-between gap-3">

                  <p className="font-medium leading-6">
                    {index + 1}. {title}
                  </p>

                  <button
                    onClick={() => copyTitle(title)}
                    type="button"
                    className="text-violet-600"
                  >
                    {copied === title ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}