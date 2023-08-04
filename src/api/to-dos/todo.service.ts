import { assign } from 'lodash';
import { Todos as TodoModel } from './todo.model';
import { NotFoundError } from '../../errors/not-found';
import { Todo } from './todo.entity';
import { MissingTokenError } from '../../errors/missing-token';


export class TodoService {
  
  async find(userId: string, valueCompleted: boolean): Promise<Todo[]>;
  async find(userId: string): Promise<Todo[]>;
  async find(userId: string, valueCompleted: boolean = false): Promise<Todo[]> {
    const query = TodoModel.find({
      $or: [{createdBy: userId}, {assignedTo: userId}]
    }).sort({dueDate: 1}).populate('createdBy assignedTo');

    if(!valueCompleted){
      query.where('completed').equals(valueCompleted);
    }
    
    return query;
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
}

export default new TodoService();