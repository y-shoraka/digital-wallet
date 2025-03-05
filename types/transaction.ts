export type LocalTransaction = {
  id: string;
  type: "deposit" | "send" | "receive";
  amount: number;
  address?: string;
  date: string;
};

export type ApiTransaction = {
  amount: number;
  crypto_currency_symbol: string;
  transaction_date: string;
};

export type CombinedTransaction =
  | LocalTransaction
  | (ApiTransaction & { isApi: boolean });
