import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireOfficer } from "@/lib/session";
import { APPLICATION_STATUSES } from "@/lib/admissions";
import { ApplicationDetail, statusText } from "@/components/admin/ApplicationDetail";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { claimApplicationAction, releaseApplicationAction, submitReviewAction } from "../actions";

const MESSAGES: Record<string, { tone: "error" | "ok"; text: string }> = {
  already_assigned: { tone: "error", text: "Another officer claimed this application first." },
  not_yours: { tone: "error", text: "Only the officer handling this application can change it." },
  invalid: { tone: "error", text: "Choose a status and write an internal note." },
  saved: { tone: "ok", text: "Review saved." }
};

export default async function OfficerApplicationPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { error?: string; saved?: string };
}) {
  const officer = await requireOfficer();

  const app = await prisma.admissionApplication.findUnique({
    where: { id: params.id },
    include: {
      cycle: { select: { nameEn: true } },
      assignedOfficer: { select: { id: true, name: true, email: true } },
      guardians: true,
      reviews: {
        orderBy: { createdAt: "desc" },
        include: { officer: { select: { name: true, email: true } } }
      }
    }
  });
  if (!app) notFound();

  const isMine = app.assignedOfficer?.id === officer.id;
  const isUnassigned = !app.assignedOfficer;
  const banner = searchParams.error
    ? MESSAGES[searchParams.error]
    : searchParams.saved
      ? MESSAGES.saved
      : null;
  const boundReview = submitReviewAction.bind(null, app.id);

  return (
    <div className="max-w-5xl">
      <Link href="/officer/applications" className="text-sm text-primary hover:underline">
        ← All applications
      </Link>

      {banner ? (
        <p
          className={`mt-4 rounded-md border px-4 py-3 text-sm ${
            banner.tone === "error"
              ? "border-brick/30 bg-brick/5 text-brick"
              : "border-primary/30 bg-primary/5 text-primary-dark"
          }`}
        >
          {banner.text}
        </p>
      ) : null}

      <div className="mt-4">
        <ApplicationDetail app={app} />
      </div>

      <section className="mt-6 rounded-lg border border-border bg-surface p-6">
        {isUnassigned ? (
          <form action={claimApplicationAction} className="flex items-center gap-4">
            <input type="hidden" name="id" value={app.id} />
            <p className="text-sm text-ink-muted">Nobody is handling this application yet.</p>
            <SubmitButton label="Claim this application" pendingLabel="Claiming…" />
          </form>
        ) : isMine ? (
          <div className="space-y-6">
            <form action={boundReview} className="space-y-4">
              <h2 className="font-medium text-ink">Record a review</h2>
              <div>
                <label className="block text-sm font-medium text-ink">New status</label>
                <select
                  name="status"
                  required
                  defaultValue={app.status === "ASSIGNED" ? "UNDER_REVIEW" : app.status}
                  className="mt-1 rounded-md border border-border bg-white px-3 py-2 text-sm"
                >
                  {APPLICATION_STATUSES.filter((s) => s !== "UNASSIGNED").map((s) => (
                    <option key={s} value={s}>
                      {statusText(s)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">
                  Internal note <span className="text-ink-muted">(never shown to the applicant)</span>
                </label>
                <textarea
                  name="internalNote"
                  required
                  rows={3}
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">
                  Message to applicant <span className="text-ink-muted">(optional — visible on the tracking page)</span>
                </label>
                <textarea
                  name="applicantMessage"
                  rows={2}
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
                />
              </div>
              <SubmitButton label="Save review" pendingLabel="Saving…" />
            </form>

            <form action={releaseApplicationAction}>
              <input type="hidden" name="id" value={app.id} />
              <button type="submit" className="text-sm text-brick hover:underline">
                Release back to the unassigned pool
              </button>
            </form>
          </div>
        ) : (
          <p className="text-sm text-ink">
            This application is currently being handled by{" "}
            <strong>{app.assignedOfficer?.name}</strong>. You can read it, but only they can update
            it.
          </p>
        )}
      </section>
    </div>
  );
}
