import { useMemo } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { db } from '../../firebase';
import { auth } from '../../firebase';
import { useAuthUser } from '@react-query-firebase/auth';
import { useQuery } from 'react-query';

export default function useUser(id) {
  const user = useAuthUser(['user'], auth);
  const userId = id ?? user.data?.uid;
  const queryRef =
    userId && query(collection(db, 'users'), where('uid', '==', userId));

  const { isLoading, data, error } = useQuery(
    ['user', userId],
    () => getDocs(queryRef),
    {
      enabled: !!userId,
    }
  );

  const userData = useMemo(() => {
    if (!data) return null;
    return data.docs.map((docSnapshot) => ({
      ...docSnapshot.data(),
      id: docSnapshot.ref.id,
    }))[0];
  }, [data]);

  return {
    isLoading,
    userData,
    error,
  };
}
