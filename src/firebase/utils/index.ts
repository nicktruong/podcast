import {
  getDoc as getDocFirestore,
  DocumentReference,
} from "firebase/firestore";

export const getDoc = async <T>(reference: DocumentReference) => {
  const snapshot = await getDocFirestore(reference);

  return { id: snapshot.id, ...snapshot.data() } as T;
};
