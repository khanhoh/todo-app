import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db } from "../firebase";

const todosCollectionRef = collection(db, "todos");

export const todoApi = {
  // 1. GET ALL
  getAll: async () => {
    const data = await getDocs(todosCollectionRef);
    // Firebase separates ID from data, so we merge them:
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },

  // 2. ADD
  add: async (todo) => {
    // Firestore generates a unique ID automatically for us!
    const docRef = await addDoc(todosCollectionRef, todo);
    return { ...todo, id: docRef.id }; // Return the data with the new ID
  },

  // 3. UPDATE (Toggle checkbox or Edit title)
  update: async (todo) => {
    const todoDoc = doc(db, "todos", todo.id);
    await updateDoc(todoDoc, todo);
    return todo;
  },

  // 4. DELETE
  delete: async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    return id;
  }
};