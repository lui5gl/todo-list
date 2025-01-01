import { useEffect, useRef } from "react";

export default function Card({
  title,
  checked,
  onTitleChange,
  onCheckChange,
}: {
  title: string;
  checked: boolean;
  onTitleChange: (title: string) => void;
  onCheckChange: () => void;
}) {
  const checkedRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleChange = () => {
      titleRef.current?.classList.toggle("line-through");
      onCheckChange();
    };

    const checkbox = checkedRef.current;
    checkbox?.addEventListener("change", handleChange);

    return () => {
      checkbox?.removeEventListener("change", handleChange);
    };
  }, [onCheckChange]);

  return (
    <div className="py-2 px-5 max-w-2xl hover:bg-neutral-200  flex flex-col gap-2 selection:bg-red-600 selection:text-red-50">
      <div className="flex items-center gap-2 ">
        <input
          type="checkbox"
          ref={checkedRef}
          className="accent-red-600 focus:outline-none focus:ring-0 focus:border-transparent bg-transparent"
          defaultChecked={checked}
        />
        <h2
          contentEditable
          ref={titleRef}
          className={checked ? "line-through" : ""}
          onBlur={() => onTitleChange(titleRef.current?.innerText || "")}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
