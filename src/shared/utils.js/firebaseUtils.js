import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../config/date';

export const getDocsDataFromSnapshot = (data) => {
  if (!data) return null;

  return data.docs.map((docSnapshot) => ({
    ...docSnapshot.data(),
    id: docSnapshot.ref.id,
  }));
};

export const transformDatesFromItem = (
  item,
  fieldNames = ['availableTo', 'availableFrom']
) => {
  const newItem = item;
  fieldNames.forEach((fieldName) => {
    if (!item[fieldName]) return;
    newItem[fieldName] = dayjs(item[fieldName].toDate()).format(DATE_FORMAT);
  });
  return newItem;
};

export const transformDateFields = (data, fieldNames) => {
  if (!data) return null;

  const result = data.map((item) => transformDatesFromItem(item, fieldNames));
  return result;
};

export const transformDayJSStringValue = (value) => {
  if (!value) return value;
  return dayjs(value, DATE_FORMAT).toDate();
};
