export type ChainType = "Bitcoin" | "Ethereum" | "Solana" | "Base" | "Arbitrum";
export type SyncState = "healthy" | "syncing" | "attention";
export type Direction = "incoming" | "outgoing" | "internal";
export type TransferStatus = "confirmed" | "pending" | "flagged";
export type AlertDirection = "above" | "below";
export type SearchEntityType = "wallet" | "group" | "alert" | "reminder";

export interface ChartPoint {
  label: string;
  value: number;
}

export interface PortfolioSummary {
  totalValue: number;
  dayChangeUsd: number;
  dayChangePct: number;
  weekChangeUsd: number;
  weekChangePct: number;
  syncState: SyncState;
  lastUpdated: string;
  allocation: Array<{ asset: string; value: number; pct: number; color: string }>;
}

export interface Wallet {
  id: string;
  name: string;
  chainType: ChainType;
  normalizedAddress: string;
  shortAddress: string;
  valueUsd: number;
  dayChangePct: number;
  weekChangePct: number;
  holdingsCount: number;
  archived: boolean;
  syncState: SyncState;
  lastSyncedAt: string;
  groupIds: string[];
  noteSnippet: string;
}

export interface Holding {
  walletId: string;
  asset: string;
  symbol: string;
  balance: number;
  priceUsd: number;
  valueUsd: number;
  allocationPct: number;
  dayChangePct: number;
}

export interface Transfer {
  id: string;
  walletId: string;
  asset: string;
  amount: number;
  usdValue: number;
  direction: Direction;
  status: TransferStatus;
  timestamp: string;
  counterparty: string;
  chainType: ChainType;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  walletIds: string[];
  totalValueUsd: number;
  dayChangePct: number;
  weekChangePct: number;
  noteSnippet: string;
  reminders: number;
}

export interface AlertRule {
  id: string;
  asset: string;
  direction: AlertDirection;
  priceUsd: number;
  enabled: boolean;
  lastTriggered: string;
  scopeLabel: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "rebalance" | "review" | "tax" | "earnings";
  relatedEntityType: "wallet" | "group";
  relatedEntityId: string;
  notes: string;
}

export interface SearchResult {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle: string;
  route: string;
}

export interface ImportPreviewResult {
  targetGroupId: string;
  network: ChainType;
  summary: {
    scanned: number;
    valid: number;
    duplicates: number;
    existing: number;
    invalid: number;
  };
  rows: Array<{
    id: string;
    address: string;
    status: "valid" | "duplicate" | "existing" | "invalid";
    label: string;
  }>;
}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface AssistantReply {
  reply: string;
  suggestions: string[];
}

export interface RecentActivityItem {
  id: string;
  title: string;
  subtitle: string;
  amountLabel: string;
  tone: "positive" | "neutral" | "negative";
}

export interface DemoSeed {
  summary: PortfolioSummary;
  portfolioChart: ChartPoint[];
  wallets: Wallet[];
  walletCharts: Record<string, ChartPoint[]>;
  holdings: Holding[];
  transfers: Transfer[];
  groups: Group[];
  groupCharts: Record<string, ChartPoint[]>;
  alerts: AlertRule[];
  calendarEvents: CalendarEvent[];
  notes: Record<string, string>;
  importPreview: ImportPreviewResult;
  assistantInitialMessages: AssistantMessage[];
  assistantReplies: Record<string, AssistantReply>;
  recentActivity: RecentActivityItem[];
}
