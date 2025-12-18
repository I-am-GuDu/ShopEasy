'use client';

import { useState, useEffect } from 'react';

/**
 * Props for the FlashSaleTimer component
 */
interface FlashSaleTimerProps {
  /** The target date/time when the flash sale ends */
  targetDate: Date;
}

/**
 * Represents the time remaining in the countdown
 */
interface TimeLeft {
  /** Number of days remaining */
  days: number;
  /** Number of hours remaining */
  hours: number;
  /** Number of minutes remaining */
  minutes: number;
  /** Number of seconds remaining */
  seconds: number;
}

/**
 * FlashSaleTimer Component
 * 
 * Displays a countdown timer for flash sales showing days, hours, minutes, and seconds.
 * Updates every second and automatically cleans up on unmount.
 * 
 * Features:
 * - Real-time countdown updates
 * - Formatted time display (2-digit padding)
 * - Animated timer boxes with staggered float effect
 * - Automatic cleanup of intervals
 * 
 * @param {FlashSaleTimerProps} props - Component props
 * @returns {JSX.Element} The rendered timer component
 * 
 * @example
 * ```tsx
 * const saleEndDate = new Date('2024-12-31');
 * <FlashSaleTimer targetDate={saleEndDate} />
 * ```
 */
export default function FlashSaleTimer({ targetDate }: FlashSaleTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="timer">
      <div className="timer-box">
        <div className="timer-value">{formatTime(timeLeft.days)}</div>
        <div className="timer-label">Days</div>
      </div>
      <div className="timer-box">
        <div className="timer-value">{formatTime(timeLeft.hours)}</div>
        <div className="timer-label">Hours</div>
      </div>
      <div className="timer-box">
        <div className="timer-value">{formatTime(timeLeft.minutes)}</div>
        <div className="timer-label">Minutes</div>
      </div>
      <div className="timer-box">
        <div className="timer-value">{formatTime(timeLeft.seconds)}</div>
        <div className="timer-label">Seconds</div>
      </div>
    </div>
  );
}