import { Link } from "react-router-dom";
import { Card, LoadingCard, SectionTitle, formatCurrency, formatPercent } from "@/components/ui";
import { useAsyncData } from "@/hooks/useAsyncData";
import { demoApi } from "@/services/mock/demoApi";

export const GroupsPage = () => {
  const { data, loading } = useAsyncData(() => demoApi.getGroups(), []);

  if (loading || !data) {
    return <LoadingCard label="Loading groups" />;
  }

  return (
    <div className="card-grid">
      {data.map((group) => (
        <Link key={group.id} className="card-link" to={`/groups/${group.id}`}>
          <Card className="group-card">
            <SectionTitle title={group.name} kicker={`${group.walletIds.length} linked wallets`} />
            <p>{group.description}</p>
            <div className="stats-row">
              <div className="stat-pill">
                <span>Total value</span>
                <strong>{formatCurrency(group.totalValueUsd)}</strong>
              </div>
              <div className="stat-pill">
                <span>24h</span>
                <strong className={group.dayChangePct >= 0 ? "positive-text" : "negative-text"}>{formatPercent(group.dayChangePct)}</strong>
              </div>
              <div className="stat-pill">
                <span>Reminders</span>
                <strong>{group.reminders}</strong>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
