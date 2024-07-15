import React, { Children } from "react";

export default function Button({ title, handleAction, icon }: any) {
  return (
    <button
      className="items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 flex gap-2  ring-offset-background transition-colors
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:pointer-events-none disabled:opacity-50 border
              border-input bg-background hover:bg-accent
             text-accent-foreground"
      onClick={handleAction}
    >
      {icon}
      {title}
    </button>
  );
}
