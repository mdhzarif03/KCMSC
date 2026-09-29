import { NoticeForm } from "../NoticeForm";
import { createNoticeAction } from "../actions";

export default function NewNoticePage() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-ink">New Notice</h1>
      <div className="mt-6">
        <NoticeForm action={createNoticeAction} />
      </div>
    </div>
  );
}
