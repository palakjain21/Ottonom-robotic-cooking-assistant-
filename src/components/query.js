import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from 'firebase/firestore';

export const getLastOrder = async (timestamp) => {
  const q = query(
    collection(db, 'order'),
    where('log_timestamp', '<=', timestamp),
    orderBy('log_timestamp', 'desc'),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0].data();
};

export const getlastweekOrder = async (timestamp) => {
  const start = timestamp - 86400000 * 7;
  const end = timestamp;

  const q = query(
    collection(db, 'order'),
    where('log_timestamp', '<=', end),
    where('log_timestamp', '>=', start)
  );

  const querySnapshot = await getDocs(q);
  const result = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    result.push(data);
  });
  return result;
};
