type Data = {
  id: number;
  pid: number;
  tid: number | null;
  uid: number;
  description: string;
  start: string;
  end: string;
  updated: string;
  dur: number;
  user: string;
  use_stop: boolean;
  client: string;
  project: string;
  task: string | null;
  billable: number;
  is_billable: boolean;
  cur: string;
  tags: string[];
};

export type DetailResponse = {
  total_grand: number;
  total_billable: number;
  total_count: number;
  per_page: number;
  total_currencies: {
    currency: string;
    amount: number;
  };
  data: Data[];
};
