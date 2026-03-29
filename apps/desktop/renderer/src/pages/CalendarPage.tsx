import { useMemo, useState } from "react";
import { Card, Modal, SectionTitle, SelectInput, TextInput } from "@/components/ui";
import { useAsyncData } from "@/hooks/useAsyncData";
import { demoApi } from "@/services/mock/demoApi";
import type { CalendarEvent } from "@/types/demo";

const blankEvent = {
  title: "",
  date: "2026-04-10T16:00",
  type: "review",
  relatedEntityType: "group",
  relatedEntityId: "group-watchlist",
  notes: ""
};

export const CalendarPage = () => {
  const { data, reload } = useAsyncData(() => demoApi.getCalendarEvents(), []);
  const [editing, setEditing] = useState<CalendarEvent | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(blankEvent);

  const grouped = useMemo(() => {
    const events = [...(data ?? [])].sort((a, b) => a.date.localeCompare(b.date));
    return events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
      const key = new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric" });
      acc[key] = [...(acc[key] ?? []), event];
      return acc;
    }, {});
  }, [data]);

  const openCreate = () => {
    setForm(blankEvent);
    setCreating(true);
    setEditing(null);
  };

  const openEdit = (event: CalendarEvent) => {
    setEditing(event);
    setCreating(false);
    setForm({
      title: event.title,
      date: event.date.slice(0, 16),
      type: event.type,
      relatedEntityType: event.relatedEntityType,
      relatedEntityId: event.relatedEntityId,
      notes: event.notes
    });
  };

  const save = async () => {
    const payload = {
      ...form,
      date: new Date(form.date).toISOString(),
      type: form.type as CalendarEvent["type"],
      relatedEntityType: form.relatedEntityType as CalendarEvent["relatedEntityType"]
    };
    if (editing) {
      await demoApi.updateCalendarEvent(editing.id, payload);
    } else {
      await demoApi.createCalendarEvent(payload);
    }
    setEditing(null);
    setCreating(false);
    reload();
  };

  return (
    <div className="page-stack">
      <Card className="toolbar-card">
        <SectionTitle title="Calendar and reminders" kicker={`${data?.length ?? 0} scheduled items`} />
        <button className="primary-button" onClick={openCreate}>Add reminder</button>
      </Card>

      {Object.entries(grouped).map(([date, events]) => (
        <Card key={date}>
          <SectionTitle title={date} kicker="Upcoming" />
          <div className="list-stack">
            {events.map((event) => (
              <div key={event.id} className="transfer-row">
                <div>
                  <strong>{event.title}</strong>
                  <p>{event.notes}</p>
                </div>
                <div className="button-row">
                  <span className="metric">{new Date(event.date).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
                  <button className="ghost-button" onClick={() => openEdit(event)}>Edit</button>
                  <button className="ghost-button" onClick={() => void demoApi.deleteCalendarEvent(event.id).then(reload)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {(creating || editing) ? (
        <Modal title={editing ? "Edit reminder" : "Create reminder"} onClose={() => { setEditing(null); setCreating(false); }}>
          <div className="form-grid">
            <label>
              <span>Title</span>
              <TextInput value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} />
            </label>
            <label>
              <span>Date</span>
              <input
                className="text-input"
                type="datetime-local"
                value={form.date}
                onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
              />
            </label>
            <label>
              <span>Type</span>
              <SelectInput
                value={form.type}
                onChange={(value) => setForm((current) => ({ ...current, type: value }))}
                options={[
                  { label: "Review", value: "review" },
                  { label: "Rebalance", value: "rebalance" },
                  { label: "Tax", value: "tax" },
                  { label: "Earnings", value: "earnings" }
                ]}
              />
            </label>
            <label>
              <span>Related entity</span>
              <TextInput value={form.relatedEntityId} onChange={(value) => setForm((current) => ({ ...current, relatedEntityId: value }))} />
            </label>
            <label className="full-span">
              <span>Notes</span>
              <textarea
                className="note-editor compact"
                value={form.notes}
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
              />
            </label>
          </div>
          <div className="modal-actions">
            <button className="primary-button" onClick={() => void save()}>Save reminder</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
