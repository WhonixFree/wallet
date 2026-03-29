import { useParams } from "react-router-dom";
import { Badge, Card, EmptyState, LoadingCard, SectionTitle, Sparkline, formatCurrency, formatPercent } from "@/components/ui";
import { useAsyncData } from "@/hooks/useAsyncData";
import { demoApi } from "@/services/mock/demoApi";
import { NotesPanel } from "@/features/notes/NotesPanel";

export const GroupDetailPage = () => {
  const { groupId = "" } = useParams();
  const group = useAsyncData(() => demoApi.getGroupById(groupId), [groupId]);
  const wallets = useAsyncData(() => demoApi.getGroupWallets(groupId), [groupId]);
  const chart = useAsyncData(() => demoApi.getGroupChart(groupId), [groupId]);

  if (!group.loading && !group.data) {
    return <EmptyState title="Group not found" description="The requested group could not be loaded." />;
  }

  return (
    <div className="page-stack">
      {group.loading || !group.data ? (
        <LoadingCard label="Loading group detail" />
      ) : (
        <Card className="detail-hero">
          <div className="hero-top">
            <div>
              <p className="eyebrow">Group detail</p>
              <h2>{group.data.name}</h2>
              <p>{group.data.description}</p>
            </div>
            <Badge tone="accent">{group.data.walletIds.length} linked wallets</Badge>
          </div>
          <div className="stats-row">
            <div className="stat-pill">
              <span>Total value</span>
              <strong>{formatCurrency(group.data.totalValueUsd)}</strong>
            </div>
            <div className="stat-pill">
              <span>24h</span>
              <strong className={group.data.dayChangePct >= 0 ? "positive-text" : "negative-text"}>{formatPercent(group.data.dayChangePct)}</strong>
            </div>
            <div className="stat-pill">
              <span>7d</span>
              <strong className={group.data.weekChangePct >= 0 ? "positive-text" : "negative-text"}>{formatPercent(group.data.weekChangePct)}</strong>
            </div>
          </div>
          {chart.data ? <Sparkline points={chart.data} /> : null}
        </Card>
      )}

      <div className="content-grid">
        <Card>
          <SectionTitle title="Linked wallets" kicker="Contributors" />
          <div className="list-stack">
            {wallets.loading || !wallets.data ? (
              <div className="loading-list">Loading linked wallets...</div>
            ) : (
              wallets.data.map((wallet) => (
                <div key={wallet.id} className="transfer-row">
                  <div>
                    <strong>{wallet.name}</strong>
                    <p>
                      {wallet.chainType} • {wallet.shortAddress}
                    </p>
                  </div>
                  <div className="align-right">
                    <strong>{formatCurrency(wallet.valueUsd)}</strong>
                    <span className={wallet.dayChangePct >= 0 ? "positive-text" : "negative-text"}>{formatPercent(wallet.dayChangePct)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {group.data ? <NotesPanel entityType="group" entityId={group.data.id} title="Group notes" /> : null}
      </div>
    </div>
  );
};
