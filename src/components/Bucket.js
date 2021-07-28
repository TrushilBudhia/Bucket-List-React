import React, { useState } from 'react';
import BucketForm from './BucketForm';

function Bucket(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    eagerness: '',
  });

  console.log('props', props);
  console.log('props.bucket', props.bucket);

  const submitUpdate = (value) => {
    // TODO: Write logic to update the `edit` value in state after a user updates an entry in the list
    // TODO: Set the key:value pairs in the `edit` object back to empty strings
    console.log('value', value);
    setEdit(value);
    setEdit({
      id: null,
      value: '',
      eagerness: '',
    })
  };

  // If the user is attempting to edit an item, render the bucket form with the edit variable passed as a prop
  if (edit.id) {
    console.log('Edit if statement entered');
    return <BucketForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.bucket.map((item, index) => (
    // TODO: Add a className of `bucket row complete ${item.eagerness}` for completed items, and `bucket-row ${item.eagerness}` for non-completed items
    // TODO: Add a key attribute set to the value of the index position
    // Hint: use a ternary operator
    < div className={item.status === `complete` ? `bucket row complete ${item.eagerness}` : `bucket-row ${item.eagerness}`} key={index} >
      {console.log('status', item.status)}
      {console.log('eagerness', item.eagerness)}
      {console.log('id', item.id)}
      {console.log('value', item.text)}
      {/* // TODO: Add an onClick event that invokes the `completeBucketItem` method passing the item id as a argument */}
      <div key={index} onClick={() => props.completeBucketItem(item.id)}>
        {/* TODO: Add the item text here */}
        {item.text}
      </div>
      <div className="icons">
        {/* // TODO: Add an onClick event update the `edit` object with the `id`, `value`, and `eagerness` properties */}
        <p onClick={() => props.editBucketItem({ id: item.id }, { text: item.text }, { eagerness: item.eagerness })}> ✏️</p>
        {/* TODO: Add an onClick event that will invoke the removeBucketItem method passing in the `item.id` */}
        <p onClick={() => props.removeBucketItem(item.id)}> 🗑️</p>
      </div>
    </div >
  ));
}

export default Bucket;
