"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import {
  useGetTermsAndConditionsQuery,
  useSetTermsAndConditionsMutation,
} from "@/redux/feature/settingAPI";

const EditAboutUs = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [content, setContent] = useState<string>("");

  const {
    data: terms,
    isLoading,
    isSuccess,
  } = useGetTermsAndConditionsQuery({});
  const [setTermsAndConditions, { isLoading: isSaving }] =
    useSetTermsAndConditionsMutation();

  // Initialize Quill once
  useEffect(() => {
    const loadQuill = async () => {
      const Quill = (await import("quill")).default;

      if (
        editorRef.current &&
        !editorRef.current.classList.contains("ql-container")
      ) {
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Enter your Terms and Conditions...",
        });

        quillRef.current = quill;

        quill.on("text-change", () => {
          const html = quill.root.innerHTML;
          setContent(html);
        });
      }
    };

    if (typeof window !== "undefined") {
      loadQuill();
    }
  }, []);

  // Paste fetched terms into editor once available
  useEffect(() => {
    if (terms?.description && quillRef.current) {
      quillRef.current.clipboard.dangerouslyPasteHTML(terms.description);
      setContent(terms.description); // sync initial state
    }
  }, [terms]);

  const handleSubmit = async () => {
    try {
      const res = await setTermsAndConditions({
        description: content,
      }).unwrap();
      console.log("Updated:", res);
      alert("Terms and Conditions saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
  };

  console.log( "terms", terms);
  return (
    <div className='min-h-[75vh] w-[96%] mx-auto flex flex-col justify-between gap-6'>
      <div className='space-y-6'>
        <div className='h-auto'>
          <div
            ref={editorRef}
            id='editor'
            className='h-[50vh] bg-white text-base'
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          onClick={handleSubmit}
          disabled={isSaving}
          className='bg-primary hover:bg-teal-700'
        >
          {isSaving ? "Saving..." : "Save Content"}
        </Button>
      </div>
    </div>
  );
};

export default EditAboutUs;
