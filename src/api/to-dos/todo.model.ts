import mongoose, { Schema } from "mongoose";
import { Todo } from "./todo.entity";
import checkIfExpired from "../../utils/checkdate";

const TodoSchema = new Schema<Todo>({
  title: String,
  dueDate: Date,
  completed: {type: Boolean, default: false},
  assignedTo: {type: Schema.Types.ObjectId, ref: 'User'},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
})

TodoSchema.virtual("expired").get(function() {
  return checkIfExpired(this.dueDate!, this.completed!);
})

TodoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Todos = mongoose.model<Todo>('Todo', TodoSchema);