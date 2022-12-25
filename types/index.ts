export interface Events {
  date: string;
  events: EventItem[];
}

interface EventItem {
  id: string | number;
  color: string;
  name?: string;
  progress?: string;
  date: string;
  icon: string;
}

export type MonthSelected = {
  month: number;
  year: number;
};
