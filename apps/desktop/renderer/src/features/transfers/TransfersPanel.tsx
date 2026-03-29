import { useState } from "react";
import { Badge, Card, SectionTitle, formatCurrency, formatDateTime } from "@/components/ui";
import type { Transfer } from "@/types/demo";

const toneMap = {
  incoming: "positive",
  outgoing: "negative",
  internal: "accent"
} as const;

const statusToneMap = {
  confirmed: "positive",
  pending: "warning",
  flagged: "negative"
} as const;

export const TransfersPanel = ({ transfers }: { transfers: Transfer[] }) => {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <Card>
      <div className="panel-header">
        <SectionTitle title="Recent transfers" kicker="Read-only activity" />
        {notice ? <Badge tone="accent">{notice}</Badge> : null}
      </div>
      <div className="list-stack">
        {transfers.map((transfer) => (
          <div key={transfer.id} className="transfer-row">
            <div>
              <strong>{transfer.asset}</strong>
              <p>
                {transfer.counterparty} • {formatDateTime(transfer.timestamp)}
              </p>
            </div>
            <div className="button-row">
              <Badge tone={toneMap[transfer.direction]}>{transfer.direction}</Badge>
              <Badge tone={statusToneMap[transfer.status]}>{transfer.status}</Badge>
              <span className="metric">{transfer.amount.toLocaleString()}</span>
              <span className="metric">{formatCurrency(transfer.usdValue)}</span>
              <button
                className="ghost-button"
                onClick={() => setNotice(`Prepared mocked explorer view for ${transfer.id}`)}
              >
                Explorer
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
