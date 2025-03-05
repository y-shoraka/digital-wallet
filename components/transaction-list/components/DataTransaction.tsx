import { ApiTransaction, CombinedTransaction } from "@/types/transaction";
import { formatDate } from "@/utils/format-date";
import React from "react";

const DataTransaction = ({ transaction }: { transaction: ApiTransaction }) => {
  return (
    <div
      key={`api-${transaction.transaction_date}-${transaction.amount}`}
      className="border-b pb-3"
    >
      <div className="flex justify-between items-center">
        <div>دریافت</div>
        <div className="text-lg font-medium">
          +{transaction.amount}
          <span className="text-sm mr-1">
            {transaction.crypto_currency_symbol}
          </span>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-1">
        <div>تاریخ: {formatDate(transaction.transaction_date)}</div>
      </div>
    </div>
  );
};

export default DataTransaction;
