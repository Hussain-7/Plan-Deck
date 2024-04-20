import { databases, storage, ID } from "../config/appwrite";
export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const columns = data.documents.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, { id: todo.status, todos: [] });
    }

    // Push todos
    acc.get(todo.status)?.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      description: todo?.description,
      image: todo?.image ? JSON.parse(todo.image) : null,
    });
    return acc;
  }, new Map<TypedColumn, Column>());

  // if columns doesnt have inprogress ,done or todo add them with empty todos
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  columnTypes.forEach((column) => {
    if (!columns.get(column)) {
      columns.set(column, { id: column, todos: [] });
    }
  });

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  return {
    columns: sortedColumns,
  };
};

export const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);
  console.log("Formated todos", todos);
  const response = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });
  const GPTdata = await response.json();
  console.log("GPTdata", GPTdata);
  const { content } = GPTdata;
  return content;
};

const formatTodosForAI = (board: Board) => {
  const todos = Array.from(board.columns.entries());
  const flatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in TypedColumn]: Todo[] });

  const flatArrayCounted = Object.entries(flatArray).reduce(
    (map, [key, value]) => {
      map[key as TypedColumn] = value.length;
      return map;
    },
    {} as { [key in TypedColumn]: number }
  );

  return flatArrayCounted;
};

// Upload image to appwrite
export const uploadImage = async (file: File) => {
  if (!file) return null;
  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_BUCKET_ID!,
    ID.unique(),
    file
  );

  return fileUploaded;
};
