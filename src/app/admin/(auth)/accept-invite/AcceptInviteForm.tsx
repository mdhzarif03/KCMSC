"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
    >
      {pending ? "Creating account…" : "Set password & create account"}
    </button>
  );
}

export function AcceptInviteForm({
  token,
  action
}: {
  token: string;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <input type="hidden" name="token" value={token} />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={10}
          className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-ink-muted">At least 10 characters.</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={10}
          className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
