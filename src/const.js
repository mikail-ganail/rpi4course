const Status = {
    BACKLOG: `backlog`,
    PROCESSING: `processing`,
    DONE: `done`,
    BASKET: `basket`,
};
  
const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.PROCESSING]: `В процессе`,
    [Status.DONE]: `Готово`,
    [Status.BASKET]: `Корзина`,
};
  
export {Status, StatusLabel};
  
// User actions for model notifications
export const UserAction = {
    UPDATE_TASK: 'UPDATE_TASK',
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
};

// Update types for UI refresh levels
export const UpdateType = {
    INIT: 'INIT',
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
};
  