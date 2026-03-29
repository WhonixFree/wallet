import { useState } from "react";
import { Badge, Card, SectionTitle, SelectInput } from "@/components/ui";
import { useAsyncData } from "@/hooks/useAsyncData";
import { demoApi } from "@/services/mock/demoApi";
import { demoSeed } from "@/mocks/demoData";

const toneMap = {
  valid: "positive",
  duplicate: "warning",
  existing: "accent",
  invalid: "negative"
} as const;

export const ImportPage = () => {
  const [targetGroupId, setTargetGroupId] = useState(demoSeed.importPreview.targetGroupId);
  const [network, setNetwork] = useState(demoSeed.importPreview.network);
  const { data, loading, reload } = useAsyncData(
    () => demoApi.getImportPreview(targetGroupId, network),
    [targetGroupId, network]
  );
  const [complete, setComplete] = useState(false);

  return (
    <div className="page-stack">
      <Card className="toolbar-card">
        <SectionTitle title="Import preview" kicker="Mocked validation pipeline" />
        <div className="toolbar-controls">
          <SelectInput
            value={targetGroupId}
            onChange={setTargetGroupId}
            options={demoSeed.groups.map((group) => ({ label: group.name, value: group.id }))}
          />
          <SelectInput
            value={network}
            onChange={(value) => setNetwork(value as typeof network)}
            options={["Bitcoin", "Ethereum", "Solana", "Base", "Arbitrum"].map((chain) => ({ label: chain, value: chain }))}
          />
          <button className="ghost-button" onClick={reload}>Refresh preview</button>
          <button className="primary-button" onClick={() => setComplete(true)}>Mock import</button>
        </div>
      </Card>

      {complete ? (
        <Card className="success-card">
          <h3>Import staged successfully</h3>
          <p>8 valid rows are ready for the next backend-driven phase. No real data was written in this demo build.</p>
        </Card>
      ) : null}

      <Card>
        {loading || !data ? (
          <div className="loading-list">Loading preview results...</div>
        ) : (
          <>
            <div className="stats-row">
              <div className="stat-pill"><span>Scanned</span><strong>{data.summary.scanned}</strong></div>
              <div className="stat-pill"><span>Valid</span><strong>{data.summary.valid}</strong></div>
              <div className="stat-pill"><span>Duplicates</span><strong>{data.summary.duplicates}</strong></div>
              <div className="stat-pill"><span>Existing</span><strong>{data.summary.existing}</strong></div>
              <div className="stat-pill"><span>Invalid</span><strong>{data.summary.invalid}</strong></div>
            </div>
            <div className="list-stack">
              {data.rows.map((row) => (
                <div key={row.id} className="transfer-row">
                  <div>
                    <strong>{row.label}</strong>
                    <p>{row.address}</p>
                  </div>
                  <Badge tone={toneMap[row.status]}>{row.status}</Badge>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
