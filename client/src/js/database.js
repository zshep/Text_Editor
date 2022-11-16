import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
   try{
    console.log('PutDb has started');
    const jatetDb = await openDB('jate', 1);
    // create new transaction 
    const tx = jatetDb.transaction('jate', 'readwrite');
    // open up the object
    const store = tx.objectStore('jate');
    const request = store.put({id: 1, value: content });

    // confirmation of the request.
    const result = await request;
    console.log(`The result type is:${typeof(result)}`);
    console.log('🚀 - data saved to the database', result);
    return result.values;

   }catch {
     console.error('putDb not implemented');}
   }




 // Export a function we will use to GET to the database.
  export const getDb = async () => {
    try {
    const jatetDb = await openDB('jate', 1);
        // create new transaction 
    const tx = jatetDb.transaction('jate', 'readonly');
      // open up the object
    const store = tx.objectStore('jate');
      //grab the first element in said object
    const request = store.get(1);
    
     // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result.value);
  return result.value;

    } catch {  
      console.error('getDb not implemented');
    }
} 
  

//start the database
initdb();
