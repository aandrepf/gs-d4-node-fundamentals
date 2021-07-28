import TransactionsRepository from '../repositories/TransactionRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (title === '' || title === undefined || title === null) {
      throw Error('Necessário informar a descrição da transação');
    }

    if (value === null || value === undefined) {
      throw Error('Necessário informar o valor da transação');
    }

    if (type === '' || type === undefined || type === null) {
      throw Error('Necessário definir o tipo de transação');
    }

    if (
      type === 'outcome' &&
      value > this.transactionsRepository.getBalance().total
    ) {
      throw Error('Valor da transação maior que o saldo total!');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
