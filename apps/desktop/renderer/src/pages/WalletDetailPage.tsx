import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Badge, Card, EmptyState, LoadingCard, SectionTitle, Sparkline, formatCurrency, formatPercent, formatDateTime } from "@/components/ui";
import { demoApi } from "@/services/mock/demoApi";
import { useAsyncData } from "@/hooks/useAsyncData";
import { NotesPanel } from "@/features/notes/NotesPanel";
import { TransfersPanel } from "@/features/transfers/TransfersPanel";

export const WalletDetailPage = () => {
  const { walletId = "" } = useParams();
  const [explorerNotice, setExplorerNotice] = useState<string | null>(null);
  const wallet = useAsyncData(() => demoApi.getWalletById(walletId), [walletId]);
  const chart = useAsyncData(() => demoApi.getWalletChart(walletId), [walletId]);
  const holdings = useAsyncData(() => demoApi.getWalletHoldings(walletId), [walletId]);
  const transfers = useAsyncData(() => demoApi.getWalletTransfers(walletId), [walletId]);

  if (!wallet.loading && !wallet.data) {
    return <EmptyState title="Wallet not found" description="The requested wallet could not be loaded." />;
  }

  return (
    <div className="page-stack">
      {wallet.loading || !wallet.data ? (
        <LoadingCard label="Loading wallet detail" />
      ) : (
        <Card className="detail-hero">
          <div className="hero-top">
            <div>
              <p className="eyebrow">Wallet detail</p>
              <h2>{wallet.data.name}</h2>
              <p>{wallet.data.normalizedAddress}</p>
            </div>
            <div className="button-row">
              <Badge tone="accent">{wallet.data.chainType}</Badge>
              {wallet.data.archived ? <Badge tone="warning">Archived</Badge> : <Badge tone="positive">Active</Badge>}
              <button
                className="ghost-button"
                onClick={() => setExplorerNotice(`Mocked explorer route prepared for ${wallet.data?.shortAddress}`)}
              >
                Explorer
              </button>
            </div>
          </div>
          {explorerNotice ? <Badge tone="accent">{explorerNotice}</Badge> : null}
          <div className="stats-row">
            <div className="stat-pill">
              <span>Current value</span>
              <strong>{formatCurrency(wallet.data.valueUsd)}</strong>
            </div>
            <div className="stat-pill">
              <span>24h</span>
              <strong className={wallet.data.dayChangePct >= 0 ? "positive-text" : "negative-text"}>{formatPercent(wallet.data.dayChangePct)}</strong>
            </div>
            <div className="stat-pill">
              <span>Sync status</span>
              <strong>{wallet.data.syncState}</strong>
              <em>{formatDateTime(wallet.data.lastSyncedAt)}</em>
            </div>
          </div>
          {chart.data ? <Sparkline points={chart.data} /> : null}
        </Card>
      )}

      <div className="content-grid">
        <Card>
          <SectionTitle title="Holdings" kicker="Asset breakdown" />
          {holdings.loading || !holdings.data ? (
            <div className="loading-list">Loading holdings...</div>
          ) : (
            <div className="table-grid holdings-table">
              <div className="table-head">Asset</div>
              <div className="table-head">Balance</div>
              <div className="table-head">Price</div>
              <div className="table-head">Value</div>
              <div className="table-head">24h</div>
              {holdings.data.map((holding) => (
                <div key={`${holding.walletId}-${holding.symbol}`} className="table-row">
                  <div>
                    <strong>{holding.symbol}</strong>
                    <p>{holding.asset}</p>
                  </div>
                  <div>{holding.balance.toLocaleString()}</div>
                  <div>{formatCurrency(holding.priceUsd)}</div>
                  <div>{formatCurrency(holding.valueUsd)}</div>
                  <div className={holding.dayChangePct >= 0 ? "positive-text" : "negative-text"}>{formatPercent(holding.dayChangePct)}</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {wallet.data ? <NotesPanel entityId={wallet.data.id} entityType="wallet" title="Wallet notes" /> : null}
      </div>

      {transfers.data ? <TransfersPanel transfers={transfers.data} /> : null}

      <Card>
        <SectionTitle title="Linked groups" kicker="Portfolio organization" />
        <div className="button-row">
          {wallet.data?.groupIds.map((groupId) => (
            <Link key={groupId} className="chip-link" to={`/groups/${groupId}`}>
              {groupId.replace("group-", "").replaceAll("-", " ")}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};
