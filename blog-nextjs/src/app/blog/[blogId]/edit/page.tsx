"use client";

import { TiptapEditor } from "@/components/toolbars/tiptap-editor";
import { useState } from "react";

export default function BlogEdit() {
  const [content, setContent] = useState("<h2>Hello world 🌍</h2>");
  return <TiptapEditor content={content} onChange={setContent} />;
}
