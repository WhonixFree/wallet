import { useEffect, useState } from "react";
import { Badge, Card } from "@/components/ui";
import { demoApi } from "@/services/mock/demoApi";

export const NotesPanel = ({
  entityType,
  entityId,
  title = "Notes"
}: {
  entityType: "wallet" | "group";
  entityId: string;
  title?: string;
}) => {
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    demoApi.getNote(entityType, entityId).then(setContent);
  }, [entityId, entityType]);

  const save = async () => {
    setSaving(true);
    const result = await demoApi.saveNote(entityType, entityId, content);
    setSavedAt(result.savedAt);
    setEditing(false);
    setSaving(false);
  };

  return (
    <Card>
      <div className="panel-header">
        <div>
          <p className="eyebrow">Markdown-style editor</p>
          <h3>{title}</h3>
        </div>
        <div className="button-row">
          {savedAt ? <Badge tone="positive">Saved {new Date(savedAt).toLocaleTimeString()}</Badge> : null}
          <button className="ghost-button" onClick={() => setEditing((value) => !value)}>
            {editing ? "Preview" : "Edit"}
          </button>
          <button className="primary-button" disabled={saving} onClick={save}>
            {saving ? "Saving..." : "Save note"}
          </button>
        </div>
      </div>

      {editing ? (
        <textarea
          className="note-editor"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      ) : (
        <div className="note-preview">
          {content.split("\n").map((line, index) => {
            if (line.startsWith("# ")) {
              return <h2 key={index}>{line.slice(2)}</h2>;
            }
            if (line.startsWith("## ")) {
              return <h3 key={index}>{line.slice(3)}</h3>;
            }
            if (line.startsWith("- ")) {
              return <p key={index}>• {line.slice(2)}</p>;
            }
            return line ? <p key={index}>{line}</p> : <div key={index} className="spacer-line" />;
          })}
        </div>
      )}
    </Card>
  );
};
