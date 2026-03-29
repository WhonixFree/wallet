import { Link } from "react-router-dom";
import { Badge, Card, EmptyState, LoadingCard, SectionTitle, TextInput, formatCurrency, formatPercent, formatDateTime } from "@/components/ui";
import { useAsyncData } from "@/hooks/useAsyncData";
import { demoApi } from "@/services/mock/demoApi";
import { useMemo, useState } from "react";

export const WalletsPage = () => {
  const { data, loading, error, reload } = useAsyncData(() => demoApi.getWallets(), []);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!data) {
      return [];
    }
    const needle = query.trim().toLowerCase();
    return data.filter((wallet) =>
      [wallet.name, wallet.chainType, wallet.shortAddress].some((value) =>
        value.toLowerCase().includes(needle)
      )
    );
  }, [data, query]);

  if (error) {
    return (
      <EmptyState
        title="Wallet list unavailable"
        description={error}
        action={<button className="primary-button" onClick={reload}>Retry</button>}
      />
    );
  }

  return (
    <div className="page-stack">
      <Card className="toolbar-card">
        <SectionTitle title="Wallet registry" kicker="Searchable list" />
        <TextInput value={query} onChange={setQuery} placeholder="Search wallets, chains, or addresses" />
      </Card>

      {loading || !data ? (
        <LoadingCard label="Loading wallets" />
      ) : filtered.length === 0 ? (
        <EmptyState title="No wallets found" description="Adjust the search query to see matching wallets." />
      ) : (
        <Card>
          <div className="table-grid wallet-table">
            <div className="table-head">Wallet</div>
            <div className="table-head">Chain</div>
            <div className="table-head">Value</div>
            <div className="table-head">24h</div>
            <div className="table-head">Sync</div>
            <div className="table-head">State</div>
            {filtered.map((wallet) => (
              <Link key={wallet.id} className="table-row table-link" to={`/wallets/${wallet.id}`}>
                <div>
                  <strong>{wallet.name}</strong>
                  <p>{wallet.shortAddress}</p>
                </div>
                <div><Badge tone="accent">{wallet.chainType}</Badge></div>
                <div>{formatCurrency(wallet.valueUsd)}</div>
                <div className={wallet.dayChangePct >= 0 ? "positive-text" : "negative-text"}>{formatPercent(wallet.dayChangePct)}</div>
                <div>{formatDateTime(wallet.lastSyncedAt)}</div>
                <div>{wallet.archived ? <Badge tone="warning">Archived</Badge> : <Badge tone="positive">Active</Badge>}</div>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
