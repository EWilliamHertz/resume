"use client";
import { Bold, Italic, Heading2, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const wrapText = (before: string, after: string) => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = value.substring(start, end) || "text";
    const newContent =
      value.substring(0, start) + before + text + after + value.substring(end);

    onChange(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const insertMarkdown = (markdown: string) => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newContent = value.substring(0, start) + markdown + value.substring(start);
    onChange(newContent);
  };

  const renderPreview = (markdown: string) => {
    if (!markdown) return "";
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
      .replace(/_(.+?)_/g, "<em class='text-cyan-200'>$1</em>")
      .replace(/## (.*)/g, "<h2 class='text-xl font-bold text-white mt-4 mb-2 block'>$1</h2>")
      .replace(/# (.*)/g, "<h1 class='text-2xl font-bold text-white mt-4 mb-2 block'>$1</h1>")
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="p-2 border border-dashed border-neutral-700 text-neutral-500 text-center rounded my-4 bg-neutral-900/50 block">[Image Preview: $1]</div>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="#" class="text-cyan-400 underline decoration-cyan-500/30">$1</a>')
      .replace(/\n\n/g, "<br /><br />") // Standard double spacing
      .replace(/\n/g, "<br />");       // Support for Shift+Enter

    return html;
  };

  return (
    <div className="flex flex-col border border-neutral-700 rounded-xl overflow-hidden bg-neutral-900">
      <div className="flex gap-1 bg-neutral-800 p-2 border-b border-neutral-700 overflow-x-auto">
        <button onClick={() => wrapText("**", "**")} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors" title="Bold">
          <Bold size={16} />
        </button>
        <button onClick={() => wrapText("_", "_")} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors" title="Italic">
          <Italic size={16} />
        </button>
        <button onClick={() => wrapText("## ", "")} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors" title="Heading 2">
          <Heading2 size={16} />
        </button>
        <div className="w-px h-6 bg-neutral-700 mx-2 self-center"></div>
        <button onClick={() => wrapText("[", "](https://)")} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors" title="Link">
          <LinkIcon size={16} />
        </button>
        <button onClick={() => insertMarkdown('\n![Description](https://example.com/image.jpg)\n')} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors" title="Image">
          <ImageIcon size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-neutral-700 h-[500px]">
        <textarea
          id="editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start writing the broadcast... Use markdown."
          className="w-full h-full p-4 bg-transparent text-neutral-300 placeholder-neutral-600 focus:outline-none resize-none font-mono text-sm"
        />

        <div className="bg-neutral-950 p-4 h-full overflow-y-auto">
          <div className="text-xs text-neutral-600 uppercase tracking-widest font-mono mb-4 border-b border-neutral-800 pb-2">
            Live Preview Output
          </div>
          <div 
            className="prose prose-invert max-w-none break-words text-neutral-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: value ? renderPreview(value) : "<span class='text-neutral-700 italic'>Preview will appear here...</span>" }}
          />
        </div>
      </div>
    </div>
  );
}