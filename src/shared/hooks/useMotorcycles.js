import { useMemo, useState } from 'react';
import {
  collection,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';

import { db } from '../../firebase';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { useMutation, useQuery } from 'react-query';
import {
  getDocsDataFromSnapshot,
  transformDateFields,
  transformDatesFromItem,
  transformDayJSStringValue,
} from '../utils.js/firebaseUtils';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../config/date';

const generateFilteredQuery = (selectedFiltersRaw, ref) => {
  const selectedFilters = {
    ...selectedFiltersRaw,
    availableFrom: transformDayJSStringValue(selectedFiltersRaw.availableFrom),
    availableTo: transformDayJSStringValue(selectedFiltersRaw.availableTo),
  };

  const multipleChoiceFilters = ['color', 'location', 'model']
    .filter((filter) => selectedFilters[filter].length)
    .map((filter) => where(filter, 'in', selectedFilters[filter]));

  const minValueFilters = ['rating']
    .filter((filter) => selectedFilters[filter])
    .map((filter) => where(filter, '>=', selectedFilters[filter]));

  return query(ref, ...multipleChoiceFilters, ...minValueFilters);
};

export default function useMotorcycles(motorcycleId) {
  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    location: [],
    model: [],
    rating: 0,
    availableFrom: null,
    availableTo: null,
  });

  const ref = collection(db, 'bikes');
  const allMotorcycles = useFirestoreQuery(['motorcycles'], ref, {
    subscribe: true,
  });
  const docRef = motorcycleId && doc(db, 'bikes', motorcycleId);

  const filteredMotorcycles = useQuery(
    ['filteredMotorcycles', selectedFilters],
    () => getDocs(generateFilteredQuery(selectedFilters, ref))
  );

  const motorcycle = useQuery(
    ['motorcycle', motorcycleId],
    () => getDoc(docRef),
    {
      enabled: !!motorcycleId,
    }
  );

  const { mutate: createMotorcycle } = useMutation(
    (values) => addDoc(ref, values),
    {
      onError: () => alert(`Could not create motorcycle`),
    }
  );

  const { mutate: removeMotorcycle } = useMutation(
    (id) => deleteDoc(doc(ref, id)),
    {
      onError: () => alert(`Could not remove motorcycle`),
    }
  );

  const { mutate: updateMotorcycle } = useMutation(
    ({ id, newData }) => updateDoc(doc(ref, id), newData),
    {
      onSuccess: () => {
        filteredMotorcycles.refetch();
      },
      onError: () => alert(`Could not update motorcycle`),
    }
  );

  const motorcyclesData = useMemo(
    () => transformDateFields(getDocsDataFromSnapshot(allMotorcycles.data)),
    [allMotorcycles.data]
  );

  const motorcycleData = useMemo(
    () =>
      motorcycle.data &&
      motorcycle.data.exists() &&
      transformDatesFromItem(motorcycle.data.data()),
    [motorcycle.data]
  );

  const filteredMotorcyclesData = useMemo(() => {
    const transformedItems = transformDateFields(
      getDocsDataFromSnapshot(filteredMotorcycles.data)
    );
    return (
      transformedItems &&
      transformedItems.filter((item) => {
        if (
          (selectedFilters.availableTo && !item.availableTo) ||
          (selectedFilters.availableFrom && !item.availableFrom)
        )
          return false;

        if (
          item.availableTo &&
          dayjs(selectedFilters.availableTo, DATE_FORMAT).isAfter(
            dayjs(item.availableTo, DATE_FORMAT)
          )
        ) {
          return false;
        }
        if (
          item.availableFrom &&
          dayjs(selectedFilters.availableFrom, DATE_FORMAT).isBefore(
            dayjs(item.availableFrom, DATE_FORMAT)
          )
        ) {
          return false;
        }
        return true;
      })
    );
  }, [
    filteredMotorcycles.data,
    selectedFilters.availableTo,
    selectedFilters.availableFrom,
  ]);

  const availableFilters = useMemo(() => {
    if (!motorcyclesData) return null;

    const [colorSet, locationSet, modelSet] = new Array(3)
      .fill()
      .map(() => new Set());
    motorcyclesData.forEach((motorcycle) => {
      colorSet.add(motorcycle.color);
      locationSet.add(motorcycle.location);
      modelSet.add(motorcycle.model);
    });
    return {
      color: Array.from(colorSet),
      location: Array.from(locationSet),
      model: Array.from(modelSet),
    };
  }, [motorcyclesData]);

  return {
    allMotorcycles: {
      ...allMotorcycles,
      data: motorcyclesData,
    },
    filteredMotorcycles: {
      ...filteredMotorcycles,
      data: filteredMotorcyclesData,
    },
    motorcycle: {
      ...motorcycle,
      data: motorcycleData,
    },
    availableFilters,
    selectedFilters,
    setSelectedFilters,
    removeMotorcycle,
    updateMotorcycle,
    createMotorcycle,
  };
}
