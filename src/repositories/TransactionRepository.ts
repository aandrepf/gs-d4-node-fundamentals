import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    if (this.transactions.length === 0)
      throw Error('Nenhuma transação encontrada!');
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeFiltered = this.transactions.filter(t => t.type === 'income');
    const outcomeFiltered = this.transactions.filter(t => t.type === 'outcome');

    const income =
      incomeFiltered.length > 0
        ? incomeFiltered.map(t => t.value).reduce((acc, curr) => acc + curr)
        : 0;

    const outcome =
      outcomeFiltered.length > 0
        ? outcomeFiltered.map(t => t.value).reduce((acc, curr) => acc + curr)
        : 0;

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
