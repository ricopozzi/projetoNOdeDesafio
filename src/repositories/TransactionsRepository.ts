import Transaction from '../models/Transaction';

interface createTransaction {
  type: "outcome" | "income"
  value: number
  title: string
}

interface Balance {
  income: number;
  outcome: number; //depósito ou retirada
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];

  }

   public all(): Transaction[] {
    return this.transactions
   }

   public getBalance(): Balance {

    const balance = this.transactions.reduce(
      (accumulator: Balance, currentValue: Transaction) => {
        if (currentValue.type === 'income') {
          accumulator.income += currentValue.value;
        } else {
          accumulator.outcome += currentValue.value;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    balance.total = balance.income - balance.outcome;

    return balance;

   }

   public create({type, title, value}:createTransaction): Transaction {
     const transaction = new Transaction({type, title, value})

    if(transaction.value <= 0){
      throw Error("Valor inserido Inválido")
    }

    if(transaction.type !== "income"  && transaction.type !== "outcome"){
      throw Error("Tipo Inválido")
    }

     this.transactions.push(transaction)

     return transaction
   }
}

export default TransactionsRepository
