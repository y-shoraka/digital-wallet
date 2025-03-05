import { LocalTransaction as LocalType } from "@/types/transaction";
import { formatDate } from "@/utils/format-date";
import React from "react";

const LocalTransaction = ({ transaction }: { transaction: LocalType }) => {
  const transactionType = {
    deposit: "افزایش موجودی",
    send: "ارسال به",
    receive: " دریافت از",
  };

  return (
    <div key={transaction.id} className="border-b pb-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {transactionType[transaction.type]}
          {transaction.address && (
            <div className="truncate max-w-[200px]">{transaction.address}</div>
          )}
        </div>
        <div className="text-lg font-medium">
          {transaction.type === "send" ? "-" : "+"}
          {transaction.amount}
          <span className="text-sm mr-1">ETH</span>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-1">
        <div>تاریخ: {formatDate(transaction.date)}</div>
      </div>
    </div>
  );
};

export default LocalTransaction;
