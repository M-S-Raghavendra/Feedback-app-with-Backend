import { createContext, useState, useEffect } from "react";
import FeedbackData from "../data/FeedbackData"

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  const addFeedbackItem = async (newFeedback) => {
    // Proxy added, so no need of specifying http://localhost:5000
    // POST method
    const response = await fetch('/feedback', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await response.json()
    setFeedback([data, ...feedback]);
  };
  
  const deleteFeedbackItem = async (id) => {
    if (window.confirm("Are you sure you want to delete Feedback?")) {
      await fetch(`/feedback/${id}`, {method: 'DELETE'})

      setFeedback(
        feedback.filter((prev) => {
          return prev.id !== id;
        })
      );
    }
  };

  const updateFeedbackItem = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json()

    setFeedback(feedback.map((item) => {
      return (item.id === id) ? data : item
    }))
    setFeedbackEdit({
      item: {},
      edit: false
    })
  }
  
  const editFeedbackItem = (item) => {
    setFeedbackEdit({
        item,
        edit: true
    })
  }
  
  return (
    <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
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