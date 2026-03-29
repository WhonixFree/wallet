import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout";
import { AlertsPage } from "@/pages/AlertsPage";
import { AssistantPage } from "@/pages/AssistantPage";
import { CalendarPage } from "@/pages/CalendarPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { GroupDetailPage } from "@/pages/GroupDetailPage";
import { GroupsPage } from "@/pages/GroupsPage";
import { ImportPage } from "@/pages/ImportPage";
import { SearchPage } from "@/pages/SearchPage";
import { WalletDetailPage } from "@/pages/WalletDetailPage";
import { WalletsPage } from "@/pages/WalletsPage";

export const App = () => (
  <Routes>
    <Route element={<AppLayout />} path="/">
      <Route index element={<DashboardPage />} />
      <Route element={<WalletsPage />} path="wallets" />
      <Route element={<WalletDetailPage />} path="wallets/:walletId" />
      <Route element={<GroupsPage />} path="groups" />
      <Route element={<GroupDetailPage />} path="groups/:groupId" />
      <Route element={<AlertsPage />} path="alerts" />
      <Route element={<CalendarPage />} path="calendar" />
      <Route element={<SearchPage />} path="search" />
      <Route element={<ImportPage />} path="import" />
      <Route element={<AssistantPage />} path="assistant" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Route>
  </Routes>
);
