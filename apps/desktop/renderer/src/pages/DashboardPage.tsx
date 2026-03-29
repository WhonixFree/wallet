import { Link } from "react-router-dom";
import { Card, EmptyState, LoadingCard, SectionTitle, Sparkline, Badge, formatCurrency, formatPercent, formatDateTime } from "@/components/ui";
import { useAsyncData } from "@/hooks/useAsyncData";
import { demoApi } from "@/services/mock/demoApi";

export const DashboardPage = () => {
  const summary = useAsyncData(() => demoApi.getPortfolioSummary(), []);
  const chart = useAsyncData(() => demoApi.getPortfolioChart(), []);
  const topWallets = useAsyncData(() => demoApi.getTopWallets(), []);
  const recentActivity = useAsyncData(() => demoApi.getRecentActivity(), []);

  if (summary.error) {
    return (
      <EmptyState
        title="Dashboard unavailable"
        description={summary.error}
        action={<button className="primary-button" onClick={summary.reload}>Retry</button>}
      />
    );
  }

  return (
    <div className="page-grid">
      {summary.loading || !summary.data ? (
        <>
          <LoadingCard label="Loading portfolio summary" />
          <LoadingCard label="Loading chart" />
        </>
      ) : (
        <>
          <Card className="hero-card">
            <div className="hero-top">
              <div>
                <p className="eyebrow">Total portfolio value</p>
                <h2>{formatCurrency(summary.data.totalValue)}</h2>
              </div>
              <Badge tone={summary.data.syncState === "healthy" ? "positive" : "warning"}>
                {summary.data.syncState} • {formatDateTime(summary.data.lastUpdated)}
              </Badge>
            </div>
            <div className="stats-row">
              <div className="stat-pill">
                <span>24h</span>
                <strong>{formatCurrency(summary.data.dayChangeUsd)}</strong>
                <em>{formatPercent(summary.data.dayChangePct)}</em>
              </div>
              <div className="stat-pill">
                <span>7d</span>
                <strong>{formatCurrency(summary.data.weekChangeUsd)}</strong>
                <em>{formatPercent(summary.data.weekChangePct)}</em>
              </div>
            </div>
            {chart.data ? <Sparkline points={chart.data} /> : null}
          </Card>

          <Card>
            <SectionTitle title="Allocation overview" kicker="Current mix" />
            <div className="allocation-list">
              {summary.data.allocation.map((entry) => (
                <div key={entry.asset} className="allocation-row">
                  <div className="allocation-label">
                    <span className="allocation-dot" style={{ backgroundColor: entry.color }} />
                    <strong>{entry.asset}</strong>
                  </div>
                  <span>{entry.pct.toFixed(1)}%</span>
                  <span>{formatCurrency(entry.value)}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      <Card>
        <SectionTitle title="Top wallets" kicker="Largest positions" />
        <div className="list-stack">
          {topWallets.loading || !topWallets.data ? (
            <div className="loading-list">Loading wallets...</div>
          ) : (
            topWallets.data.map((wallet) => (
              <Link key={wallet.id} className="list-link" to={`/wallets/${wallet.id}`}>
                <div>
                  <strong>{wallet.name}</strong>
                  <p>
                    {wallet.chainType} • {wallet.shortAddress}
                  </p>
                </div>
                <div className="align-right">
                  <strong>{formatCurrency(wallet.valueUsd)}</strong>
                  <span className={wallet.dayChangePct >= 0 ? "positive-text" : "negative-text"}>
                    {formatPercent(wallet.dayChangePct)}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Recent activity" kicker="Latest events" />
        <div className="list-stack">
          {recentActivity.loading || !recentActivity.data ? (
            <div className="loading-list">Loading activity...</div>
          ) : (
            recentActivity.data.map((item) => (
              <div key={item.id} className="transfer-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.subtitle}</p>
                </div>
                <span className={`${item.tone}-text metric`}>{item.amountLabel}</span>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Quick links" kicker="Demo path" />
        <div className="quick-links">
          <Link className="quick-link-card" to="/wallets">Open wallets</Link>
          <Link className="quick-link-card" to="/groups">Review groups</Link>
          <Link className="quick-link-card" to="/alerts">Manage alerts</Link>
          <Link className="quick-link-card" to="/search?q=eth">Search entities</Link>
        </div>
      </Card>
    </div>
  );
};
