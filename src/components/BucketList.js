import React, { useState, useEffect } from 'react';
import BucketForm from './BucketForm';
import Bucket from './Bucket';

function BucketList() {
  // Gets the saved items from local storage
  const saveditems = JSON.parse(localStorage.getItem('items'));
  const [bucket, setBucket] = useState(saveditems || []);

  // Function to add a bucket list item
  const addBucketItem = (item) => {
    if (!item.text) {
      return;
    }

    // Adds the new bucket item to the bucket state variable
    setBucket([...bucket, item]);
  };

  // Function to mark bucket list item as complete
  const completeBucketItem = (id) => {
    // If the ID passed to this function matches the ID of the item that was clicked, mark it as complete
    let updatedBucket = bucket.map((item) => {

      // Marks an item as complete or incomplete when invoked
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setBucket(updatedBucket);
  };

  // Function to remove bucket list item and update state
  const removeBucketItem = (id) => {
    // Returns an array of items that don't contain the ID passed to this function
    const itemsToRemoveFromBucket = [...bucket].filter((item) => item.id !== id);
    // Bucket state variable updated
    setBucket(itemsToRemoveFromBucket);
  };

  // Function to edit the bucket list item
  const editBucketItem = (itemId, newValue, eagernessLevel) => {
    // Make sure that the value isn't empty
    if (!newValue.text) {
      return;
    }
    // We use the "prev" argument provided with the useState hook to map through our list of items
    // We then check to see if the item ID matches the id of the item that was clicked and if so, we set it to a new value
    setBucket((prev) =>
      prev.map((item) => (item.id === itemId ? newValue : item))
    );
  };

  // useEffect hook used to save and get items from local storage
  // The items the user inputs to the list will persist
  useEffect(() => {
    const bucket = JSON.parse(localStorage.getItem('items'));
    if (bucket) {
      setBucket(bucket);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(bucket));
  }, [bucket]);

  return (
    <div>
      <h1 className="is-size-4">What is on your bucket list?</h1>
      <BucketForm onSubmit={addBucketItem} />
      <Bucket
        bucket={bucket}
        completeBucketItem={completeBucketItem}
        removeBucketItem={removeBucketItem}
        editBucketItem={editBucketItem}
      ></Bucket>
    </div>
  );
}

export default BucketList;
