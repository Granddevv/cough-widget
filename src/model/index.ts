export type TCoughData = {
  coughs: number;
  session_time_s: number;
  time: string;
};

export enum ECoughStatus {
  MUCH_BETTER = "much_better",
  SOMEWHAT_BETTER = "somewhat_better",
  ABOUT_SAME = "about_same",
  SOMEWHAT_WORSE = "somewhat_worse",
  GETTING_WORSE = "getting_worse",
}

export type TCoughInsight = {
  coughs: number;
  status: ECoughStatus;
  comparison: number;
};
