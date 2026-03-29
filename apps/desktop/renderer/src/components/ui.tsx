import { type PropsWithChildren, type ReactNode, useEffect } from "react";

export const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2
  });

export const formatPercent = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

export const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });

export const Card = ({ children, className = "" }: PropsWithChildren<{ className?: string }>) => (
  <section className={`card ${className}`.trim()}>{children}</section>
);

export const Badge = ({
  children,
  tone = "neutral"
}: PropsWithChildren<{ tone?: "neutral" | "positive" | "negative" | "warning" | "accent" }>) => (
  <span className={`badge badge-${tone}`}>{children}</span>
);

export const SectionTitle = ({ title, kicker }: { title: string; kicker?: string }) => (
  <div className="section-title">
    {kicker ? <span>{kicker}</span> : null}
    <h3>{title}</h3>
  </div>
);

export const EmptyState = ({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <Card className="empty-state">
    <h3>{title}</h3>
    <p>{description}</p>
    {action}
  </Card>
);

export const LoadingCard = ({ label = "Loading…" }: { label?: string }) => (
  <Card className="loading-card">
    <div className="loading-shimmer" />
    <span>{label}</span>
  </Card>
);

export const Modal = ({
  children,
  title,
  onClose
}: PropsWithChildren<{ title: string; onClose: () => void }>) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const Sparkline = ({ points }: { points: Array<{ label: string; value: number }> }) => {
  if (points.length === 0) {
    return null;
  }
  const max = Math.max(...points.map((point) => point.value));
  const min = Math.min(...points.map((point) => point.value));
  const range = Math.max(max - min, 1);
  const d = points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * 100;
      const y = 100 - ((point.value - min) / range) * 100;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg className="sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGradient" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#7ad7ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7ad7ff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d={`${d} L 100 100 L 0 100 Z`} fill="url(#lineGradient)" opacity="0.22" />
      <path d={d} fill="none" stroke="#89d9ff" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
};

export const TextInput = ({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <input
    className="text-input"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
  />
);

export const SelectInput = ({
  value,
  onChange,
  options
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}) => (
  <select className="text-input" value={value} onChange={(event) => onChange(event.target.value)}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
