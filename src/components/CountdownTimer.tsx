import { useState, useEffect } from "react";

interface CountdownTimerProps {
  endTime: Date;
  compact?: boolean;
}

const CountdownTimer = ({ endTime, compact = false }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = endTime.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (compact) {
    return (
      <span className="font-display font-semibold text-sm text-primary">
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    );
  }

  return (
    <div className="flex gap-2">
      {[
        { val: timeLeft.hours, label: "HRS" },
        { val: timeLeft.minutes, label: "MIN" },
        { val: timeLeft.seconds, label: "SEC" },
      ].map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="bg-secondary rounded-lg px-3 py-2 min-w-[48px] text-center">
            <span className="font-display text-xl font-bold text-foreground">{pad(unit.val)}</span>
          </div>
          <span className="text-[10px] text-muted-foreground mt-1 font-medium tracking-wider">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
