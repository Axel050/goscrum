import "../components/views/Tasks.css";
import React, { useState } from "react";

const Card = ({
  deleteCard,
  editStatus,
  data: { _id, title, createdAt, user, description, status, importance },
  data,
}) => {
  const [showMore, setShowMore] = useState(false);
  const datetime = new Date(createdAt).toLocaleString() + "hs.";
  const limitString = (str) => {
    if (str.length > 100)
      return { string: str.slice(0, 97).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  return (
    <div className="card">
      <div className="close" onClick={() => deleteCard(_id)}>
        X
      </div>
      <h3>{title}</h3>
      <h6>{datetime}</h6>
      <h5>{user?.userName}</h5>
      <button className={status.toLowerCase()} onClick={() => editStatus(data)}>
        {status.toLowerCase()}
      </button>
      <button className={importance.toLowerCase()}>
        {importance.toLowerCase()}
      </button>
      {!showMore && <p>{limitString(description).string}</p>}
      {showMore && (
        <>
          <p>{description}</p>
          <button type="button" onClick={() => setShowMore(false)}>
            Ver menos
          </button>
        </>
      )}
      {!showMore && limitString(description).addButton && (
        <button type="button" onClick={() => setShowMore(true)}>
          Ver mas
        </button>
      )}
    </div>
  );
};

export default Card;
