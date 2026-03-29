import type { DemoSeed } from "@/types/demo";

export const demoSeed: DemoSeed = {
  summary: {
    totalValue: 1842386.18,
    dayChangeUsd: 28654.13,
    dayChangePct: 1.58,
    weekChangeUsd: 103221.42,
    weekChangePct: 5.94,
    syncState: "healthy",
    lastUpdated: "2026-03-27T08:42:00Z",
    allocation: [
      { asset: "BTC", value: 781220, pct: 42.4, color: "#f4a53a" },
      { asset: "ETH", value: 498760, pct: 27.1, color: "#5c7cff" },
      { asset: "SOL", value: 219140, pct: 11.9, color: "#45d4a4" },
      { asset: "USDT", value: 188600, pct: 10.2, color: "#2acb8a" },
      { asset: "USDC", value: 102886.18, pct: 5.6, color: "#67b6ff" },
      { asset: "Other", value: 51780, pct: 2.8, color: "#b37cff" }
    ]
  },
  portfolioChart: [
    { label: "Mar 20", value: 1691200 },
    { label: "Mar 21", value: 1715400 },
    { label: "Mar 22", value: 1708300 },
    { label: "Mar 23", value: 1736200 },
    { label: "Mar 24", value: 1769100 },
    { label: "Mar 25", value: 1794400 },
    { label: "Mar 26", value: 1815200 },
    { label: "Mar 27", value: 1842386.18 }
  ],
  wallets: [
    {
      id: "wallet-main-treasury",
      name: "Main Treasury",
      chainType: "Bitcoin",
      normalizedAddress: "bc1q9e5s4w0k7f2h8m6v3p4l1r8n2z5j7c9d0x1k2m",
      shortAddress: "bc1q9e5...1k2m",
      valueUsd: 652418.22,
      dayChangePct: 2.12,
      weekChangePct: 6.61,
      holdingsCount: 3,
      archived: false,
      syncState: "healthy",
      lastSyncedAt: "2026-03-27T08:40:00Z",
      groupIds: ["group-high-conviction"],
      noteSnippet: "Cold storage core allocation. Keep exposure above 30% unless BTC dominance breaks."
    },
    {
      id: "wallet-eth-ops",
      name: "ETH Ops",
      chainType: "Ethereum",
      normalizedAddress: "0x4a11db31f4af95d573c6de12a4f4c1ac0b77b9d2",
      shortAddress: "0x4a11...b9d2",
      valueUsd: 418205.42,
      dayChangePct: 1.18,
      weekChangePct: 4.02,
      holdingsCount: 5,
      archived: false,
      syncState: "syncing",
      lastSyncedAt: "2026-03-27T08:28:00Z",
      groupIds: ["group-high-conviction", "group-watchlist"],
      noteSnippet: "Operational wallet for ETH staking receipts and stable routing."
    },
    {
      id: "wallet-sol-active",
      name: "SOL Active",
      chainType: "Solana",
      normalizedAddress: "9SzsX2Z1gG6m8aPHs3kT8Bv1vC7yLe4mZ6s7vN4gM2jk",
      shortAddress: "9SzsX2...M2jk",
      valueUsd: 236404.85,
      dayChangePct: 4.63,
      weekChangePct: 9.21,
      holdingsCount: 4,
      archived: false,
      syncState: "healthy",
      lastSyncedAt: "2026-03-27T08:41:00Z",
      groupIds: ["group-watchlist"],
      noteSnippet: "High velocity DeFi and liquid staking wallet. Monitor bridge exposure."
    },
    {
      id: "wallet-stable-reserve",
      name: "Stable Reserve",
      chainType: "Base",
      normalizedAddress: "0x2d7148344b5242aafb5a6b0e82797c1d21c5f800",
      shortAddress: "0x2d71...f800",
      valueUsd: 359221.54,
      dayChangePct: -0.11,
      weekChangePct: 0.42,
      holdingsCount: 4,
      archived: false,
      syncState: "healthy",
      lastSyncedAt: "2026-03-27T08:36:00Z",
      groupIds: ["group-income-ladder"],
      noteSnippet: "Dry powder for staged deployments. Do not redeploy until CPI week passes."
    },
    {
      id: "wallet-legacy-arb",
      name: "Legacy Arb",
      chainType: "Arbitrum",
      normalizedAddress: "0xc0de58bb24b53f72964d176539ce5b0b0a07e501",
      shortAddress: "0xc0de...e501",
      valueUsd: 176136.15,
      dayChangePct: -1.42,
      weekChangePct: -2.34,
      holdingsCount: 6,
      archived: true,
      syncState: "attention",
      lastSyncedAt: "2026-03-26T22:15:00Z",
      groupIds: ["group-income-ladder"],
      noteSnippet: "Archived strategies and residual incentive positions. Review before quarter close."
    }
  ],
  walletCharts: {
    "wallet-main-treasury": [
      { label: "Mar 20", value: 612000 },
      { label: "Mar 21", value: 620200 },
      { label: "Mar 22", value: 618900 },
      { label: "Mar 23", value: 628400 },
      { label: "Mar 24", value: 635200 },
      { label: "Mar 25", value: 641800 },
      { label: "Mar 26", value: 646440 },
      { label: "Mar 27", value: 652418.22 }
    ],
    "wallet-eth-ops": [
      { label: "Mar 20", value: 401800 },
      { label: "Mar 21", value: 406300 },
      { label: "Mar 22", value: 399400 },
      { label: "Mar 23", value: 407250 },
      { label: "Mar 24", value: 411110 },
      { label: "Mar 25", value: 414900 },
      { label: "Mar 26", value: 416040 },
      { label: "Mar 27", value: 418205.42 }
    ],
    "wallet-sol-active": [
      { label: "Mar 20", value: 197500 },
      { label: "Mar 21", value: 206400 },
      { label: "Mar 22", value: 210320 },
      { label: "Mar 23", value: 215100 },
      { label: "Mar 24", value: 221480 },
      { label: "Mar 25", value: 224500 },
      { label: "Mar 26", value: 229420 },
      { label: "Mar 27", value: 236404.85 }
    ],
    "wallet-stable-reserve": [
      { label: "Mar 20", value: 358200 },
      { label: "Mar 21", value: 358960 },
      { label: "Mar 22", value: 359420 },
      { label: "Mar 23", value: 358780 },
      { label: "Mar 24", value: 359040 },
      { label: "Mar 25", value: 359780 },
      { label: "Mar 26", value: 359610 },
      { label: "Mar 27", value: 359221.54 }
    ],
    "wallet-legacy-arb": [
      { label: "Mar 20", value: 182500 },
      { label: "Mar 21", value: 181200 },
      { label: "Mar 22", value: 179840 },
      { label: "Mar 23", value: 178420 },
      { label: "Mar 24", value: 177950 },
      { label: "Mar 25", value: 177260 },
      { label: "Mar 26", value: 176880 },
      { label: "Mar 27", value: 176136.15 }
    ]
  },
  holdings: [
    { walletId: "wallet-main-treasury", asset: "Bitcoin", symbol: "BTC", balance: 7.42, priceUsd: 85350, valueUsd: 633147, allocationPct: 97.04, dayChangePct: 2.18 },
    { walletId: "wallet-main-treasury", asset: "Wrapped BTC", symbol: "WBTC", balance: 0.18, priceUsd: 85060, valueUsd: 15310.8, allocationPct: 2.35, dayChangePct: 2.02 },
    { walletId: "wallet-main-treasury", asset: "USD Coin", symbol: "USDC", balance: 3960.42, priceUsd: 1, valueUsd: 3960.42, allocationPct: 0.61, dayChangePct: 0 },
    { walletId: "wallet-eth-ops", asset: "Ethereum", symbol: "ETH", balance: 126.2, priceUsd: 3040, valueUsd: 383648, allocationPct: 91.74, dayChangePct: 1.11 },
    { walletId: "wallet-eth-ops", asset: "Lido Staked Ether", symbol: "stETH", balance: 6.4, priceUsd: 3052, valueUsd: 19532.8, allocationPct: 4.67, dayChangePct: 1.08 },
    { walletId: "wallet-eth-ops", asset: "USD Tether", symbol: "USDT", balance: 9400, priceUsd: 1, valueUsd: 9400, allocationPct: 2.25, dayChangePct: 0 },
    { walletId: "wallet-eth-ops", asset: "Rocket Pool ETH", symbol: "rETH", balance: 1.32, priceUsd: 3368, valueUsd: 4445.76, allocationPct: 1.06, dayChangePct: 0.95 },
    { walletId: "wallet-eth-ops", asset: "Aave", symbol: "AAVE", balance: 5.3, priceUsd: 222.39, valueUsd: 1178.67, allocationPct: 0.28, dayChangePct: 1.72 },
    { walletId: "wallet-sol-active", asset: "Solana", symbol: "SOL", balance: 1560, priceUsd: 138.4, valueUsd: 215904, allocationPct: 91.33, dayChangePct: 4.82 },
    { walletId: "wallet-sol-active", asset: "Jito Staked SOL", symbol: "JITOSOL", balance: 74, priceUsd: 151.1, valueUsd: 11181.4, allocationPct: 4.73, dayChangePct: 4.11 },
    { walletId: "wallet-sol-active", asset: "USD Coin", symbol: "USDC", balance: 7162.14, priceUsd: 1, valueUsd: 7162.14, allocationPct: 3.03, dayChangePct: 0 },
    { walletId: "wallet-sol-active", asset: "Pyth", symbol: "PYTH", balance: 5200, priceUsd: 0.414, valueUsd: 2152.8, allocationPct: 0.91, dayChangePct: 5.04 },
    { walletId: "wallet-stable-reserve", asset: "USD Tether", symbol: "USDT", balance: 112240, priceUsd: 1, valueUsd: 112240, allocationPct: 31.24, dayChangePct: 0 },
    { walletId: "wallet-stable-reserve", asset: "USD Coin", symbol: "USDC", balance: 98740, priceUsd: 1, valueUsd: 98740, allocationPct: 27.49, dayChangePct: 0 },
    { walletId: "wallet-stable-reserve", asset: "Ethereum", symbol: "ETH", balance: 31.2, priceUsd: 3040, valueUsd: 94848, allocationPct: 26.4, dayChangePct: 1.11 },
    { walletId: "wallet-stable-reserve", asset: "Ondo", symbol: "ONDO", balance: 43120, priceUsd: 1.24, valueUsd: 53468.8, allocationPct: 14.87, dayChangePct: -0.84 },
    { walletId: "wallet-legacy-arb", asset: "Ethereum", symbol: "ETH", balance: 18.6, priceUsd: 3040, valueUsd: 56544, allocationPct: 32.1, dayChangePct: 1.11 },
    { walletId: "wallet-legacy-arb", asset: "Arbitrum", symbol: "ARB", balance: 40200, priceUsd: 1.2, valueUsd: 48240, allocationPct: 27.39, dayChangePct: -2.6 },
    { walletId: "wallet-legacy-arb", asset: "GMX", symbol: "GMX", balance: 880, priceUsd: 38.2, valueUsd: 33616, allocationPct: 19.09, dayChangePct: -1.82 },
    { walletId: "wallet-legacy-arb", asset: "USD Coin", symbol: "USDC", balance: 18220, priceUsd: 1, valueUsd: 18220, allocationPct: 10.34, dayChangePct: 0 },
    { walletId: "wallet-legacy-arb", asset: "Pendle", symbol: "PENDLE", balance: 2140, priceUsd: 5.74, valueUsd: 12283.6, allocationPct: 6.97, dayChangePct: -0.64 },
    { walletId: "wallet-legacy-arb", asset: "Chainlink", symbol: "LINK", balance: 440, priceUsd: 25.53, valueUsd: 11233.2, allocationPct: 6.38, dayChangePct: 0.48 }
  ],
  transfers: [
    { id: "tx-1", walletId: "wallet-eth-ops", asset: "ETH", amount: 12.4, usdValue: 37696, direction: "incoming", status: "confirmed", timestamp: "2026-03-27T07:22:00Z", counterparty: "Kraken Custody", chainType: "Ethereum" },
    { id: "tx-2", walletId: "wallet-sol-active", asset: "USDC", amount: 5200, usdValue: 5200, direction: "outgoing", status: "confirmed", timestamp: "2026-03-26T18:04:00Z", counterparty: "MarginFi Deposit", chainType: "Solana" },
    { id: "tx-3", walletId: "wallet-main-treasury", asset: "BTC", amount: 0.82, usdValue: 69987, direction: "incoming", status: "confirmed", timestamp: "2026-03-26T13:47:00Z", counterparty: "Coinbase Prime", chainType: "Bitcoin" },
    { id: "tx-4", walletId: "wallet-stable-reserve", asset: "USDT", amount: 42000, usdValue: 42000, direction: "internal", status: "pending", timestamp: "2026-03-26T09:12:00Z", counterparty: "Base Settlement Vault", chainType: "Base" },
    { id: "tx-5", walletId: "wallet-legacy-arb", asset: "ARB", amount: 12000, usdValue: 14400, direction: "outgoing", status: "flagged", timestamp: "2026-03-25T22:11:00Z", counterparty: "Legacy Incentives Farm", chainType: "Arbitrum" },
    { id: "tx-6", walletId: "wallet-sol-active", asset: "SOL", amount: 88, usdValue: 12179.2, direction: "incoming", status: "confirmed", timestamp: "2026-03-25T14:31:00Z", counterparty: "Jupiter DCA", chainType: "Solana" }
  ],
  groups: [
    {
      id: "group-high-conviction",
      name: "High Conviction",
      description: "Core long-term BTC and ETH exposure with slow rebalance cadence.",
      walletIds: ["wallet-main-treasury", "wallet-eth-ops"],
      totalValueUsd: 1070623.64,
      dayChangePct: 1.74,
      weekChangePct: 5.89,
      noteSnippet: "Stay overweight BTC into halving narrative. ETH add only on strength.",
      reminders: 2
    },
    {
      id: "group-watchlist",
      name: "Watchlist",
      description: "Higher beta positioning and fast-moving ideas monitored daily.",
      walletIds: ["wallet-eth-ops", "wallet-sol-active"],
      totalValueUsd: 654610.27,
      dayChangePct: 2.91,
      weekChangePct: 7.86,
      noteSnippet: "Use for narratives with momentum, but avoid concentrated stable leakage.",
      reminders: 3
    },
    {
      id: "group-income-ladder",
      name: "Income Ladder",
      description: "Stable reserve and archived yield positions used for cash management.",
      walletIds: ["wallet-stable-reserve", "wallet-legacy-arb"],
      totalValueUsd: 535357.69,
      dayChangePct: -0.54,
      weekChangePct: -0.12,
      noteSnippet: "Prioritize capital protection. Exit dormant incentive positions before quarter end.",
      reminders: 1
    }
  ],
  groupCharts: {
    "group-high-conviction": [
      { label: "Mar 20", value: 1013800 },
      { label: "Mar 21", value: 1026500 },
      { label: "Mar 22", value: 1018300 },
      { label: "Mar 23", value: 1039200 },
      { label: "Mar 24", value: 1052800 },
      { label: "Mar 25", value: 1061400 },
      { label: "Mar 26", value: 1068800 },
      { label: "Mar 27", value: 1070623.64 }
    ],
    "group-watchlist": [
      { label: "Mar 20", value: 580420 },
      { label: "Mar 21", value: 592880 },
      { label: "Mar 22", value: 596320 },
      { label: "Mar 23", value: 610440 },
      { label: "Mar 24", value: 621850 },
      { label: "Mar 25", value: 633220 },
      { label: "Mar 26", value: 644320 },
      { label: "Mar 27", value: 654610.27 }
    ],
    "group-income-ladder": [
      { label: "Mar 20", value: 540700 },
      { label: "Mar 21", value: 539900 },
      { label: "Mar 22", value: 538420 },
      { label: "Mar 23", value: 537840 },
      { label: "Mar 24", value: 536940 },
      { label: "Mar 25", value: 536120 },
      { label: "Mar 26", value: 535910 },
      { label: "Mar 27", value: 535357.69 }
    ]
  },
  alerts: [
    { id: "alert-1", asset: "BTC", direction: "above", priceUsd: 88000, enabled: true, lastTriggered: "2026-03-25T17:21:00Z", scopeLabel: "High Conviction" },
    { id: "alert-2", asset: "ETH", direction: "below", priceUsd: 2900, enabled: true, lastTriggered: "2026-03-21T12:08:00Z", scopeLabel: "ETH Ops" },
    { id: "alert-3", asset: "SOL", direction: "above", priceUsd: 145, enabled: false, lastTriggered: "2026-03-18T09:12:00Z", scopeLabel: "Watchlist" }
  ],
  calendarEvents: [
    { id: "event-1", title: "Monthly treasury rebalance", date: "2026-03-29T17:00:00Z", type: "rebalance", relatedEntityType: "group", relatedEntityId: "group-high-conviction", notes: "Review BTC/ETH drift and stable dry powder." },
    { id: "event-2", title: "Legacy Arb exit review", date: "2026-04-01T16:00:00Z", type: "review", relatedEntityType: "wallet", relatedEntityId: "wallet-legacy-arb", notes: "Close remaining incentive farm exposure if liquidity holds." },
    { id: "event-3", title: "Quarterly tax lot export", date: "2026-04-05T19:00:00Z", type: "tax", relatedEntityType: "group", relatedEntityId: "group-income-ladder", notes: "Prepare archived wallets for accountant handoff." },
    { id: "event-4", title: "SOL momentum checkpoint", date: "2026-04-07T15:30:00Z", type: "review", relatedEntityType: "group", relatedEntityId: "group-watchlist", notes: "Evaluate SOL beta after validator release week." }
  ],
  notes: {
    "wallet:wallet-main-treasury": "# Main Treasury\n\nCore reserve wallet for long duration BTC. Use as demo anchor during walkthroughs.\n\n## Current stance\n- Hold above target weight while BTC structure remains intact.\n- Move excess inflows into staggered custody windows.\n- Keep stable buffer above $3k for fees.\n",
    "wallet:wallet-eth-ops": "# ETH Ops\n\nPrimary operating wallet for ETH-based positions.\n\n## Checklist\n- Review staking receipts weekly.\n- Keep at least 8k USDT available for opportunistic adds.\n- Confirm sync lag before showing recent transfers in demos.\n",
    "wallet:wallet-sol-active": "# SOL Active\n\nFast-moving ideas bucket with higher volatility tolerance.\n\n## Demo notes\n- Use this screen to show positive momentum.\n- Call out the transfer rail and chart acceleration.\n",
    "wallet:wallet-stable-reserve": "# Stable Reserve\n\nCapital preservation and routing layer.\n\nThis wallet supports deployment pacing, not directional trading.\n",
    "wallet:wallet-legacy-arb": "# Legacy Arb\n\nArchived positions with cleanup work still pending.\n\nUse attention state to show believable operational debt without breaking the product feel.\n",
    "group:group-high-conviction": "# High Conviction\n\nCore strategic exposure group.\n\n## Intent\nMaintain concentrated BTC and ETH exposure with a bias toward treasury stability.\n",
    "group:group-watchlist": "# Watchlist\n\nHigher-velocity basket for monitored ideas and tactically rotated exposure.\n",
    "group:group-income-ladder": "# Income Ladder\n\nDefensive capital stack blending stables with legacy carry positions.\n"
  },
  importPreview: {
    targetGroupId: "group-watchlist",
    network: "Ethereum",
    summary: {
      scanned: 14,
      valid: 8,
      duplicates: 2,
      existing: 2,
      invalid: 2
    },
    rows: [
      { id: "imp-1", address: "0x9d2f1f9bf975b3b4ccf472093ac2b26f0ac74c11", status: "valid", label: "Desk routing wallet" },
      { id: "imp-2", address: "0x4a11db31f4af95d573c6de12a4f4c1ac0b77b9d2", status: "existing", label: "ETH Ops" },
      { id: "imp-3", address: "0xfa1d3b8245f1fd73e33b9834a0c5b419da912073", status: "duplicate", label: "Repeated line item" },
      { id: "imp-4", address: "0xb91ce5a1d22403a2947e1188c5e3dd554ed2f23a", status: "valid", label: "L2 settlement vault" },
      { id: "imp-5", address: "sol:missing_prefix", status: "invalid", label: "Malformed import row" },
      { id: "imp-6", address: "0x2d7148344b5242aafb5a6b0e82797c1d21c5f800", status: "existing", label: "Stable Reserve" }
    ]
  },
  assistantInitialMessages: [
    {
      id: "assistant-seed-1",
      role: "assistant",
      content: "I can walk through the current portfolio story, highlight risk concentrations, or summarize what changed over the last week.",
      timestamp: "2026-03-27T08:44:00Z"
    }
  ],
  assistantReplies: {
    overview: {
      reply: "Portfolio remains concentrated in BTC and ETH, with SOL driving the strongest 7d momentum. Stable reserves are still elevated enough to fund the next rebalance cycle without touching core positions.",
      suggestions: ["Show top wallets", "Summarize alerts", "Review calendar"]
    },
    risk: {
      reply: "The biggest watch item is the archived Arbitrum wallet. It is small relative to total value, but it carries the highest operational drag and the oldest sync timestamp in the book.",
      suggestions: ["Open Legacy Arb", "Why is it archived?", "List pending reminders"]
    },
    week: {
      reply: "Over the last seven days, total portfolio value is up 5.94%, driven mostly by BTC trend continuation and a sharp rebound in SOL. Stable allocations stayed mostly flat and acted as a volatility buffer.",
      suggestions: ["Explain SOL move", "Open dashboard", "Show watchlist"]
    },
    default: {
      reply: "For this demo build, I’m using mocked analysis only. I can still summarize portfolio exposure, surface alerts, or suggest the next screen to show in a walkthrough.",
      suggestions: ["Portfolio overview", "Risk summary", "Upcoming reminders"]
    }
  },
  recentActivity: [
    { id: "activity-1", title: "ETH Ops received 12.4 ETH", subtitle: "Kraken Custody on Ethereum", amountLabel: "+$37,696", tone: "positive" },
    { id: "activity-2", title: "Stable Reserve internal settlement queued", subtitle: "Base settlement vault pending", amountLabel: "$42,000", tone: "neutral" },
    { id: "activity-3", title: "Legacy Arb transfer flagged", subtitle: "Outflow to legacy incentives farm", amountLabel: "-$14,400", tone: "negative" }
  ]
};
