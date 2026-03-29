import { useMemo, useState } from "react";
import { Badge, Card, Modal, SectionTitle, SelectInput, TextInput } from "@/components/ui";
import { demoApi } from "@/services/mock/demoApi";
import { useAsyncData } from "@/hooks/useAsyncData";
import type { AlertRule } from "@/types/demo";

const emptyForm = {
  asset: "BTC",
  direction: "above",
  priceUsd: "88000",
  enabled: "true",
  scopeLabel: "High Conviction"
};

export const AlertsPage = () => {
  const { data, reload } = useAsyncData(() => demoApi.getAlerts(), []);
  const [editing, setEditing] = useState<AlertRule | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const activeCount = useMemo(() => data?.filter((item) => item.enabled).length ?? 0, [data]);

  const openCreate = () => {
    setForm(emptyForm);
    setCreating(true);
    setEditing(null);
  };

  const openEdit = (alert: AlertRule) => {
    setEditing(alert);
    setCreating(false);
    setForm({
      asset: alert.asset,
      direction: alert.direction,
      priceUsd: String(alert.priceUsd),
      enabled: String(alert.enabled),
      scopeLabel: alert.scopeLabel
    });
  };

  const submit = async () => {
    const payload = {
      asset: form.asset,
      direction: form.direction as AlertRule["direction"],
      priceUsd: Number(form.priceUsd),
      enabled: form.enabled === "true",
      scopeLabel: form.scopeLabel
    };
    if (editing) {
      await demoApi.updateAlert(editing.id, payload);
    } else {
      await demoApi.createAlert(payload);
    }
    setEditing(null);
    setCreating(false);
    reload();
  };

  return (
    <div className="page-stack">
      <Card className="toolbar-card">
        <SectionTitle title="Alert center" kicker={`${activeCount} enabled rules`} />
        <button className="primary-button" onClick={openCreate}>Create alert</button>
      </Card>

      <Card>
        <div className="list-stack">
          {(data ?? []).map((alert) => (
            <div key={alert.id} className="transfer-row">
              <div>
                <strong>
                  {alert.asset} {alert.direction} ${alert.priceUsd.toLocaleString()}
                </strong>
                <p>{alert.scopeLabel} • Last triggered {alert.lastTriggered}</p>
              </div>
              <div className="button-row">
                <Badge tone={alert.enabled ? "positive" : "warning"}>{alert.enabled ? "Enabled" : "Disabled"}</Badge>
                <button className="ghost-button" onClick={() => void demoApi.toggleAlert(alert.id).then(reload)}>Toggle</button>
                <button className="ghost-button" onClick={() => openEdit(alert)}>Edit</button>
                <button className="ghost-button" onClick={() => void demoApi.deleteAlert(alert.id).then(reload)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {(creating || editing) ? (
        <Modal title={editing ? "Edit alert" : "Create alert"} onClose={() => { setEditing(null); setCreating(false); }}>
          <div className="form-grid">
            <label>
              <span>Asset</span>
              <TextInput value={form.asset} onChange={(value) => setForm((current) => ({ ...current, asset: value.toUpperCase() }))} />
            </label>
            <label>
              <span>Direction</span>
              <SelectInput
                value={form.direction}
                onChange={(value) => setForm((current) => ({ ...current, direction: value }))}
                options={[
                  { label: "Price above", value: "above" },
                  { label: "Price below", value: "below" }
                ]}
              />
            </label>
            <label>
              <span>Trigger price</span>
              <TextInput value={form.priceUsd} onChange={(value) => setForm((current) => ({ ...current, priceUsd: value }))} />
            </label>
            <label>
              <span>Scope</span>
              <TextInput value={form.scopeLabel} onChange={(value) => setForm((current) => ({ ...current, scopeLabel: value }))} />
            </label>
            <label>
              <span>Status</span>
              <SelectInput
                value={form.enabled}
                onChange={(value) => setForm((current) => ({ ...current, enabled: value }))}
                options={[
                  { label: "Enabled", value: "true" },
                  { label: "Disabled", value: "false" }
                ]}
              />
            </label>
          </div>
          <div className="modal-actions">
            <button className="primary-button" onClick={() => void submit()}>Save alert</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
