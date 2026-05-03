import "./ControlPanel.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../../api/client";
import { MAX_BET_AMOUNT } from "../../constants/game";
import { useGameStore } from "../../store/gameStore";
import { formatCurrencyAmount } from "../../utils/currency";
import { ActiveGameStats } from "./ActiveGameStats";
import { Balance } from "./Balance";
import { BetAmountControl } from "./BetAmountControl";
import { MinesControl } from "./MinesControl";
import { MainButton } from "../MainButton/MainButton";

export function ControlPanel() {
  const {
    betAmount,
    minesCount,
    currentMultiplier,
    nextMultiplier,
    gemsFound,
    isGameActive,
    setBetAmount,
    setMinesCount,
  } = useGameStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });
  const balance = data?.balance;
  const availableMaxBet = balance ?? MAX_BET_AMOUNT;
  const profit = betAmount * currentMultiplier - betAmount;
  const balanceLabel = isLoading
    ? "Loading..."
    : isError
      ? "Error"
      : `💰 $${formatCurrencyAmount(balance ?? 0, { trimInteger: true })}`;
  const totalGems = 25 - minesCount;
  const maxBetAmount = Number(
    Math.min(availableMaxBet, MAX_BET_AMOUNT).toFixed(2),
  );

  useEffect(() => {
    if (isGameActive || betAmount <= maxBetAmount) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setBetAmount(maxBetAmount);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [betAmount, isGameActive, maxBetAmount, setBetAmount]);

  return (
    <aside
      className={`container control-panel ${
        isGameActive ? "control-panel--active-game" : ""
      }`}
    >
      <Balance balanceLabel={balanceLabel} />

      <BetAmountControl
        betAmount={betAmount}
        isGameActive={isGameActive}
        maxBetAmount={maxBetAmount}
        setBetAmount={setBetAmount}
      />

      <MinesControl
        minesCount={minesCount}
        isGameActive={isGameActive}
        setMinesCount={setMinesCount}
      />

      <MainButton />

      {isGameActive && (
        <ActiveGameStats
          currentMultiplier={currentMultiplier}
          gemsFound={gemsFound}
          nextMultiplier={nextMultiplier}
          profit={profit}
          totalGems={totalGems}
        />
      )}
    </aside>
  );
}
