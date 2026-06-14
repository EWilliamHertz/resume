"use client";
import { useState } from "react";
import { Bold, Italic, Heading2, Image, Save, X } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [content, setContent] = useState(value);
  const [selectedText, setSelectedText] = useState("");

  const wrapText = (before: string, after: string) => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = content.substring(start, end) || "text";
    const newContent =
      content.substring(0, start) + before + text + after + content.substring(end);

    setContent(newContent);
    onChange(newContent);
  };

  const insertMarkdown = (markdown: string) => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newContent = content.substring(0, start) + markdown + content.substring(start);
    setContent(newContent);
    onChange(newContent);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 bg-gray-100 p-2 rounded-t-lg flex-wrap">
        <button
          onClick={() => wrapText("**", "**")}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => wrapText("_", "_")}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => wrapText("## ", "")}
          className="p-2 hover:bg-gray-200 rounded"
          title="Heading"
        >
          <Heading2 size={18} />
        </button>
        <div className="border-l mx-1"></div>
        <button
          onClick={() =>
            insertMarkdown(
              '\n![alt text](https://example.com/image.jpg "Image title")\n'
            )
          }
          className="p-2 hover:bg-gray-200 rounded"
          title="Insert Image"
        >
          <Image size={18} />
        </button>
      </div>
      <textarea
        id="editor"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Write your post here... Use **bold**, _italic_, ## headings, and ![image](url) for images"
        className="w-full h-64 p-4 border rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="text-sm text-gray-500 mt-2">
        <p>Markdown Preview:</p>
        <div className="bg-gray-50 p-3 rounded border mt-1 max-h-32 overflow-y-auto text-xs">
          {content
            .split("\n")
            .slice(0, 5)
            .map((line, i) => (
              <div key={i} className="mb-1">
                {line.replace(/[*_#]/g, "").substring(0, 60)}...
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
