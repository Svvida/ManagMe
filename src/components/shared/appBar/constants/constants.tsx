import { AccessTime, ErrorOutline, WarningAmber } from '@mui/icons-material';

export enum TimerStatesEnum {
  Critical = 'critical',
  Warning = 'warning',
  Normal = 'normal',
}

export interface ITimerStylesKeys {
  color: 'success' | 'warning' | 'error';
  icon: JSX.Element;
}

export const timerStylesByState: Record<TimerStatesEnum, ITimerStylesKeys> = {
  [TimerStatesEnum.Critical]: { color: 'error', icon: <ErrorOutline /> },
  [TimerStatesEnum.Warning]: { color: 'warning', icon: <WarningAmber /> },
  [TimerStatesEnum.Normal]: { color: 'success', icon: <AccessTime /> },
};

export const timeThresholds = [
  { minutes: 5, state: TimerStatesEnum.Critical },
  { minutes: 10, state: TimerStatesEnum.Warning },
];
