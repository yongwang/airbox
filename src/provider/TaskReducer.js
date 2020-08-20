import {TASK_DELETED, TASK_EDITED, TASK_MARKER_HOVERED, TASKS_ADDED} from "./TaskActions";

const reducer = (state, action) =>
{
  switch (action.type)
  {
    case TASKS_ADDED:
      state.tasks =  action.tasks;
      break;
    case TASK_MARKER_HOVERED:
      state.tasks[action.index].isHovered = action.isHovered;
      break;
    case TASK_EDITED:
      for (let i = 0; i < state.tasks.length; i++)
      {
        if (state.tasks[i].AbxTaskId === action.task.AbxTaskId)
        {
          state.tasks[i] = action.task;
          break;
        }
      }
      break;
    case TASK_DELETED:
      state.tasks = state.tasks.filter(task => task.AbxTaskId !== action.task.AbxTaskId);
      break;
    default:
      return state;
  }

  return state;
};

export default reducer;