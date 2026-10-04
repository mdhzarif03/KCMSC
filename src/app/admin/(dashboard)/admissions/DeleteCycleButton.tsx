"use client";

export function DeleteCycleButton({ action, cycleName }: { action: (formData: FormData) => void | Promise<void>; cycleName: string }) {
  return (
    <form action={action}>
      <button
        type="submit"
        className="text-xs font-medium text-[#9b4d3d] hover:underline"
        onClick={(event) => {
          if (!window.confirm(`Delete ${cycleName}? This cannot be undone.`)) event.preventDefault();
        }}
      >
        Delete
      </button>
    </form>
  );
}
