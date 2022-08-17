import { useMemo } from 'react';
import { collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../firebase';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { useMutation } from 'react-query';
import { getDocsDataFromSnapshot } from '../utils.js/firebaseUtils';

export default function useUsers() {
  const ref = collection(db, 'users');
  const { isLoading, data, error } = useFirestoreQuery(['users'], ref, {
    subscribe: true,
  });

  const { mutate: removeUser } = useMutation((id) => deleteDoc(doc(ref, id)), {
    onError: () => alert(`Could not remove user`),
  });

  const { mutate: updateUser } = useMutation(
    ({ id, newData }) => updateDoc(doc(ref, id), newData),
    {
      onError: () => alert(`Could not update user`),
    }
  );

  const usersData = useMemo(() => getDocsDataFromSnapshot(data), [data]);

  return {
    isLoading,
    data: usersData,
    error,
    removeUser,
    updateUser,
  };
}
