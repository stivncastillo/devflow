import { model, models, Schema, Types } from "mongoose";

interface IQuestion {
  title: string;
  content: string;
  author: Types.ObjectId;
  tags: Types.ObjectId[];
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Question = models?.question || model<IQuestion>("Question", QuestionSchema);

export default Question;