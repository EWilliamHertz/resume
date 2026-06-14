import { notFound } from "next/navigation";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
  });

  if (!post || !post.published) {
    notFound();
  }

  const renderMarkdown = (markdown: string) => {
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.+?)_/g, "<em>$1</em>")
      .replace(/## (.*)/g, "<h2>$1</h2>")
      .replace(/# (.*)/g, "<h1>$1</h1>")
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-6" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-400 hover:underline">$1</a>')
      .replace(/\n\n/g, "</p><p>");

    return `<p>${html}</p>`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <article className="bg-slate-700 rounded-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-600">
            <span className="text-slate-400">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.project && (
              <Link href={`/projects#${post.project.toLowerCase()}`}>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition">
                  {post.project}
                </span>
              </Link>
            )}
          </div>

          <div
            className="prose prose-invert max-w-none text-slate-100"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </article>

        <div className="mt-12">
          <Link href="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              ← Back to Blog
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
