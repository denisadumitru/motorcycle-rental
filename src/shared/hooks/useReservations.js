import { useMemo } from 'react';
import {
  collection,
  doc,
  deleteDoc,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { db } from '../../firebase';
import { useMutation, useQuery } from 'react-query';
import { getDocsDataFromSnapshot } from '../utils.js/firebaseUtils';

export default function useReservations(config = {}) {
  const { userId, motorcycleId } = config;

  const ref = collection(db, 'reservations');

  const reservationsByMotorcycleId = useQuery(
    ['reservations', motorcycleId],
    () => getDocs(query(ref, where('motorcycleId', '==', motorcycleId))),
    {
      enabled: !!motorcycleId,
    }
  );

  const reservationsByUserId = useQuery(
    ['userReservations', userId],
    () => getDocs(query(ref, where('userId', '==', userId))),
    {
      enabled: !!userId,
    }
  );

  const { mutate: createReservation } = useMutation(
    (values) => addDoc(ref, values),
    {
      onError: () => alert(`Could not create reservation`),
    }
  );

  const { mutate: removeReservation } = useMutation(
    (id) => deleteDoc(doc(ref, id)),
    {
      onError: () => alert(`Could not remove reservation`),
      onSuccess: () => reservationsByUserId.refetch(),
    }
  );

  const reservationsByMotorcycleIdData = useMemo(
    () => getDocsDataFromSnapshot(reservationsByMotorcycleId?.data),
    [reservationsByMotorcycleId]
  );
  const reservationsByUserIdData = useMemo(
    () => getDocsDataFromSnapshot(reservationsByUserId?.data),
    [reservationsByUserId?.data]
  );

  return {
    reservationsByMotorcycleId: {
      ...reservationsByMotorcycleId,
      data: reservationsByMotorcycleIdData,
    },
    reservationsByUserId: {
      ...reservationsByUserId,
      data: reservationsByUserIdData,
    },
    data: reservationsByMotorcycleIdData,
    userData: reservationsByUserIdData,
    removeReservation,
    createReservation,
  };
}
