interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  description?: string;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}

interface TaskType {
  title?: string;
  type?: TypedColumn;
  description?: string;
  image?: File;
  userId?: string;
}

interface TaskInput {
  title: string;
  type: TypedColumn;
  description?: string;
  image?: File;
  userId: string;
}
interface User {}
