import { Schema, model, models, Types } from 'mongoose';

export interface ITransaction {
  userId: Types.ObjectId;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type:      { type: String, enum: ['income', 'expense'], required: true },
    description:{ type: String, required: true },
    amount:    { type: Number, required: true },
    date:      { type: Date,   required: true },
  },
  { timestamps: true }
);

export default models.Transaction || model<ITransaction>('Transaction', TransactionSchema);
