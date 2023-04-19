import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(null);

  const {addFeedbackItem, feedbackEdit, updateFeedbackItem} = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if (e.target.value === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (e.target.value !== "" && e.target.value.trim().length < 10) {
      setBtnDisabled(true)
      setMessage("Review must be atleast 10 characters long");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    // text has a delay of 1 character, so I have used e.target.value everywhere
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length >= 10 && rating !== null) {
      const newFeedback = {
        text: text,
        rating: rating,
      };

      if(feedbackEdit.edit === true) {
        updateFeedbackItem(feedbackEdit.item.id, newFeedback)
      }
      else {
        addFeedbackItem(newFeedback);
      }

      setText("");
      setRating(null);
      setBtnDisabled(true);
      setMessage(null);
    } else if (text.trim().length >= 10 && rating === null) {
      setMessage("Please select the rating");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating} />
        <div className="input-group">
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Write a Review"
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
