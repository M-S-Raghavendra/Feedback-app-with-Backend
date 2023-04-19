import { createContext, useState } from "react";
import FeedbackData from "../data/FeedbackData"

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  const addFeedbackItem = (newFeedback) => {
    newFeedback.id = feedback[0].id + 1;
    setFeedback([newFeedback, ...feedback]);
  };
  
  const deleteFeedbackItem = (id) => {
    if (window.confirm("Are you sure you want to delete Feedback?")) {
      setFeedback(
        feedback.filter((prev) => {
          return prev.id !== id;
        })
      );
    }
  };

  const editFeedbackItem = (item) => {
    setFeedbackEdit({
        item,
        edit: true
    })
  }

  const updateFeedbackItem = (id, updItem) => {
    updItem.id = id
    setFeedback(feedback.map((item) => {
      return (item.id === id) ? updItem : item
    }))
    setFeedbackEdit({
      item: {},
      edit: false
    })
  }

  return (
    <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        setFeedback,
        deleteFeedbackItem,
        addFeedbackItem,
        editFeedbackItem,
        updateFeedbackItem,
    }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext