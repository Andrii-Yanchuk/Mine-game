type BalanceProps = {
  balanceLabel: string;
};

export function Balance({ balanceLabel }: BalanceProps) {
  return (
    <div className="balance">
      <p className="balance__title">Balance</p>
      <span className="balance__value">{balanceLabel}</span>
    </div>
  );
}
