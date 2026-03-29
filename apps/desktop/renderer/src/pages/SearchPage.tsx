import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, SectionTitle, TextInput } from "@/components/ui";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useAsyncData } from "@/hooks/useAsyncData";
import { demoApi } from "@/services/mock/demoApi";
import type { SearchResult } from "@/types/demo";

export const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const debouncedQuery = useDebouncedValue(query, 250);
  const { data, loading } = useAsyncData(() => demoApi.searchEntities(debouncedQuery), [debouncedQuery]);

  const grouped = useMemo(() => {
    return (data ?? []).reduce<Record<string, SearchResult[]>>((acc, item) => {
      const bucket = acc[item.type] ?? [];
      bucket.push(item);
      acc[item.type] = bucket;
      return acc;
    }, {});
  }, [data]);

  return (
    <div className="page-stack">
      <Card className="toolbar-card">
        <SectionTitle title="Global search" kicker="Debounced local index" />
        <TextInput
          value={query}
          onChange={(value) => {
            setQuery(value);
            setParams(value ? { q: value } : {});
          }}
          placeholder="Search wallets, groups, alerts, or reminders"
        />
      </Card>

      {loading ? <Card><div className="loading-list">Searching local mock index...</div></Card> : null}

      {Object.entries(grouped).map(([type, items]) => (
        <Card key={type}>
          <SectionTitle title={type} kicker={`${items?.length ?? 0} matches`} />
          <div className="list-stack">
            {items?.map((item) => (
              <Link key={item.id} className="list-link" to={item.route}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
