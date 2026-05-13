import "./ControlPanel.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { getBalance } from "../../api/client";
import { BOARD_CELLS_COUNT, MAX_BET_AMOUNT } from "../../constants/game";
import { useGameStore } from "../../store/gameStore";
import {
  formatCurrencyAmount,
  formatTwoDecimalPlaces,
} from "../../utils/currency";
import { ActiveGameStats } from "./ActiveGameStats";
import { Balance } from "./Balance";
import { BetAmountControl } from "./BetAmountControl";
import { MinesControl } from "./MinesControl";
import { MainButton } from "../MainButton/MainButton";

type BalanceLabelState = {
  balance?: number;
  isError: boolean;
  isLoading: boolean;
};

function getBalanceLabel({
  balance,
  isError,
  isLoading,
}: BalanceLabelState) {
  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Error";
  }

  return `💰 $${formatCurrencyAmount(balance ?? 0, { trimInteger: true })}`;
}

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
  } = useGameStore(
    useShallow((state) => ({
      betAmount: state.betAmount,
      minesCount: state.minesCount,
      currentMultiplier: state.currentMultiplier,
      nextMultiplier: state.nextMultiplier,
      gemsFound: state.gemsFound,
      isGameActive: state.isGameActive,
      setBetAmount: state.setBetAmount,
      setMinesCount: state.setMinesCount,
    })),
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });
  const balance = data?.balance;
  const availableMaxBet = balance ?? MAX_BET_AMOUNT;
  const profit = betAmount * currentMultiplier - betAmount;
  const balanceLabel = getBalanceLabel({ balance, isError, isLoading });
  const totalGems = BOARD_CELLS_COUNT - minesCount;
  const maxBetAmount = Number(
    formatTwoDecimalPlaces(Math.min(availableMaxBet, MAX_BET_AMOUNT)),
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
