import { useMemo } from "react";
import DOMPurify from "dompurify";

type RichTextContentProps = {
  html: string;
  className?: string;
};

const allowedTags = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "strike",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
  "code",
  "pre",
];

export default function RichTextContent({
  html,
  className = "",
}: RichTextContentProps) {
  const sanitizedHtml = useMemo(
    () =>
      DOMPurify.sanitize(html, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: ["href"],
      }),
    [html],
  );

  return (
    <div
      className={`rich-text-content whitespace-pre-wrap break-words text-sm leading-6 text-gray-900 [&_a]:text-blue-500 [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-100 [&_pre]:p-3 [&_ul]:list-disc [&_ul]:pl-6 ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
