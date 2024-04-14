import { databases } from "./appwrite";

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const board = data.documents.reduce((acc, todo) => {
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

  return {
    columns: board,
  };
};
