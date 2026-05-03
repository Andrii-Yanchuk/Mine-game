import { memo } from "react";

type BalanceProps = {
  balanceLabel: string;
};

function BalanceComponent({ balanceLabel }: BalanceProps) {
  return (
    <div className="balance">
      <p className="balance__title">Balance</p>
      <span className="balance__value">{balanceLabel}</span>
    </div>
  );
}

export const Balance = memo(BalanceComponent);
