import { demoSeed } from "@/mocks/demoData";
import type {
  AlertRule,
  AssistantMessage,
  CalendarEvent,
  ChartPoint,
  Group,
  Holding,
  ImportPreviewResult,
  PortfolioSummary,
  RecentActivityItem,
  SearchResult,
  Transfer,
  Wallet
} from "@/types/demo";

type NoteKey = `${"wallet" | "group"}:${string}`;

const state = {
  alerts: [...demoSeed.alerts],
  calendarEvents: [...demoSeed.calendarEvents],
  notes: { ...demoSeed.notes }
};

const wait = async <T,>(value: T, ms = 420): Promise<T> =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(value), ms);
  });

const failSometimes = async () => {
  if (Math.random() < 0.03) {
    throw new Error("Demo service timeout. Retry to restore local mock state.");
  }
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export const demoApi = {
  async getPortfolioSummary(): Promise<PortfolioSummary> {
    await failSometimes();
    return wait(clone(demoSeed.summary), 380);
  },
  async getPortfolioChart(): Promise<ChartPoint[]> {
    return wait(clone(demoSeed.portfolioChart), 520);
  },
  async getTopWallets(): Promise<Wallet[]> {
    return wait(clone([...demoSeed.wallets].sort((a, b) => b.valueUsd - a.valueUsd).slice(0, 4)), 460);
  },
  async getRecentActivity(): Promise<RecentActivityItem[]> {
    return wait(clone(demoSeed.recentActivity), 540);
  },
  async getWallets(): Promise<Wallet[]> {
    await failSometimes();
    return wait(clone(demoSeed.wallets), 480);
  },
  async getWalletById(walletId: string): Promise<Wallet | null> {
    const wallet = demoSeed.wallets.find((item) => item.id === walletId) ?? null;
    return wait(clone(wallet), 320);
  },
  async getWalletHoldings(walletId: string): Promise<Holding[]> {
    const holdings = demoSeed.holdings.filter((item) => item.walletId === walletId);
    return wait(clone(holdings), 420);
  },
  async getWalletTransfers(walletId: string): Promise<Transfer[]> {
    const transfers = demoSeed.transfers.filter((item) => item.walletId === walletId);
    return wait(clone(transfers), 560);
  },
  async getWalletChart(walletId: string): Promise<ChartPoint[]> {
    return wait(clone(demoSeed.walletCharts[walletId] ?? []), 440);
  },
  async getGroups(): Promise<Group[]> {
    return wait(clone(demoSeed.groups), 500);
  },
  async getGroupById(groupId: string): Promise<Group | null> {
    const group = demoSeed.groups.find((item) => item.id === groupId) ?? null;
    return wait(clone(group), 340);
  },
  async getGroupWallets(groupId: string): Promise<Wallet[]> {
    const group = demoSeed.groups.find((item) => item.id === groupId);
    const wallets = demoSeed.wallets.filter((wallet) => group?.walletIds.includes(wallet.id));
    return wait(clone(wallets), 520);
  },
  async getGroupChart(groupId: string): Promise<ChartPoint[]> {
    return wait(clone(demoSeed.groupCharts[groupId] ?? []), 460);
  },
  async getAlerts(): Promise<AlertRule[]> {
    return wait(clone(state.alerts), 420);
  },
  async createAlert(input: Omit<AlertRule, "id" | "lastTriggered">): Promise<AlertRule> {
    const alert: AlertRule = {
      ...input,
      id: `alert-${crypto.randomUUID().slice(0, 8)}`,
      lastTriggered: "Never"
    };
    state.alerts = [alert, ...state.alerts];
    return wait(clone(alert), 480);
  },
  async updateAlert(alertId: string, input: Omit<AlertRule, "id" | "lastTriggered">): Promise<AlertRule> {
    state.alerts = state.alerts.map((item) =>
      item.id === alertId ? { ...item, ...input } : item
    );
    const alert = state.alerts.find((item) => item.id === alertId)!;
    return wait(clone(alert), 420);
  },
  async deleteAlert(alertId: string): Promise<void> {
    state.alerts = state.alerts.filter((item) => item.id !== alertId);
    return wait(undefined, 320);
  },
  async toggleAlert(alertId: string): Promise<AlertRule> {
    state.alerts = state.alerts.map((item) =>
      item.id === alertId ? { ...item, enabled: !item.enabled } : item
    );
    const alert = state.alerts.find((item) => item.id === alertId)!;
    return wait(clone(alert), 220);
  },
  async getCalendarEvents(): Promise<CalendarEvent[]> {
    return wait(clone(state.calendarEvents), 500);
  },
  async createCalendarEvent(input: Omit<CalendarEvent, "id">): Promise<CalendarEvent> {
    const event: CalendarEvent = {
      ...input,
      id: `event-${crypto.randomUUID().slice(0, 8)}`
    };
    state.calendarEvents = [...state.calendarEvents, event];
    return wait(clone(event), 460);
  },
  async updateCalendarEvent(eventId: string, input: Omit<CalendarEvent, "id">): Promise<CalendarEvent> {
    state.calendarEvents = state.calendarEvents.map((item) =>
      item.id === eventId ? { ...item, ...input } : item
    );
    const event = state.calendarEvents.find((item) => item.id === eventId)!;
    return wait(clone(event), 420);
  },
  async deleteCalendarEvent(eventId: string): Promise<void> {
    state.calendarEvents = state.calendarEvents.filter((item) => item.id !== eventId);
    return wait(undefined, 320);
  },
  async searchEntities(query: string): Promise<SearchResult[]> {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return wait([], 160);
    }

    const walletResults = demoSeed.wallets
      .filter((item) =>
        [item.name, item.chainType, item.shortAddress].some((value) =>
          value.toLowerCase().includes(needle)
        )
      )
      .map<SearchResult>((wallet) => ({
        id: wallet.id,
        type: "wallet",
        title: wallet.name,
        subtitle: `${wallet.chainType} • ${wallet.shortAddress}`,
        route: `/wallets/${wallet.id}`
      }));

    const groupResults = demoSeed.groups
      .filter((item) =>
        [item.name, item.description].some((value) => value.toLowerCase().includes(needle))
      )
      .map<SearchResult>((group) => ({
        id: group.id,
        type: "group",
        title: group.name,
        subtitle: `${group.walletIds.length} linked wallets`,
        route: `/groups/${group.id}`
      }));

    const alertResults = state.alerts
      .filter((item) =>
        [item.asset, item.scopeLabel].some((value) => value.toLowerCase().includes(needle))
      )
      .map<SearchResult>((alert) => ({
        id: alert.id,
        type: "alert",
        title: `${alert.asset} ${alert.direction} $${alert.priceUsd.toLocaleString()}`,
        subtitle: alert.scopeLabel,
        route: "/alerts"
      }));

    const reminderResults = state.calendarEvents
      .filter((item) =>
        [item.title, item.notes].some((value) => value.toLowerCase().includes(needle))
      )
      .map<SearchResult>((event) => ({
        id: event.id,
        type: "reminder",
        title: event.title,
        subtitle: new Date(event.date).toLocaleDateString(),
        route: "/calendar"
      }));

    return wait(clone([...walletResults, ...groupResults, ...alertResults, ...reminderResults]), 220);
  },
  async getNote(entityType: "wallet" | "group", entityId: string): Promise<string> {
    const key = `${entityType}:${entityId}` as NoteKey;
    return wait(state.notes[key] ?? "", 260);
  },
  async saveNote(entityType: "wallet" | "group", entityId: string, content: string): Promise<{ savedAt: string }> {
    const key = `${entityType}:${entityId}` as NoteKey;
    state.notes[key] = content;
    return wait({ savedAt: new Date().toISOString() }, 580);
  },
  async getImportPreview(
    targetGroupId = demoSeed.importPreview.targetGroupId,
    network = demoSeed.importPreview.network
  ): Promise<ImportPreviewResult> {
    return wait(clone({ ...demoSeed.importPreview, targetGroupId, network }), 640);
  },
  async sendAssistantMessage(input: string, history: AssistantMessage[]): Promise<{
    user: AssistantMessage;
    assistant: AssistantMessage;
    suggestions: string[];
  }> {
    const normalized = input.toLowerCase();
    const replyKey = normalized.includes("risk")
      ? "risk"
      : normalized.includes("week")
        ? "week"
        : normalized.includes("overview") || normalized.includes("portfolio")
          ? "overview"
          : "default";
    const reply = demoSeed.assistantReplies[replyKey];
    const user: AssistantMessage = {
      id: `user-${history.length + 1}`,
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };
    const assistant: AssistantMessage = {
      id: `assistant-${history.length + 2}`,
      role: "assistant",
      content: reply.reply,
      timestamp: new Date().toISOString()
    };
    return wait({ user, assistant, suggestions: reply.suggestions }, 820);
  }
};
