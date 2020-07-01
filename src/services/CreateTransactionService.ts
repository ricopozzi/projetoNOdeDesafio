import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string
  type: "income" | "outcome"
  value: number
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type,value}: Request ): Transaction {

    const balance = this.transactionsRepository.getBalance()
    if (type === 'outcome' && balance.total < value) {
      throw Error('this transaction is not supported');
    }

      const transaction = this.transactionsRepository.create({
        title,
        type,
        value
      });

      return transaction
  }
}

export default CreateTransactionService;
