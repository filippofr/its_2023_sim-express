import { assign } from 'lodash';
import { Todos as TodoModel } from './todo.model';
import { NotFoundError } from '../../errors/not-found';
import { Todo } from './todo.entity';

export class TodoService {
  
  async find(userId: string, valueCompleted: boolean = false) {
    const params: any = {}
    if(!valueCompleted){
      params.completed = false;
    }

    const queryWithDate: Todo[] = await TodoModel.find({
      ...params,
      $or: [{createdBy: userId}, {assignedTo: userId}],
      dueDate: {$ne: null}
    })
      .sort({dueDate: 1})
      .populate('createdBy assignedTo');

    const queryWithoutDate: Todo[] = await TodoModel.find({
      ...params,
      $or: [{createdBy: userId}, {assignedTo: userId}],
      dueDate: null
    })
      .populate('createdBy assignedTo');

    return queryWithDate.concat(queryWithoutDate);
  }

  async add(item: Todo, createdBy: string): Promise<Todo> {
    const newItem = await TodoModel.create({...item, createdBy: createdBy});
    await newItem.populate('createdBy assignedTo');
    return newItem;
  }

  private async _getById(id: string) {
    return TodoModel.findOne({ _id: id }).populate('createdBy assignedTo');
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    const item = await this._getById(id);
    if (!item) {
      throw new NotFoundError();
    }
    assign(item, data);
    await item.save();

    return item.populate('createdBy assignedTo');
  }

  async remove(id: string): Promise<void> {
    const item = await this._getById(id);
    if (!item) {
      throw new NotFoundError();
    }
    await item.deleteOne();
  }
}

export default new TodoService();