import { FaTimes, FaEdit } from 'react-icons/fa'
import { useContext } from 'react';
import Card from "./shared/Card";
import PropTypes from 'prop-types'
import FeedbackContext from '../context/FeedbackContext';

function FeedbackItem({item}) {
  const {deleteFeedbackItem, editFeedbackItem} = useContext(FeedbackContext)

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => editFeedbackItem(item)} className="edit">
        <FaEdit color='purple' />
      </button>
      <button onClick={() => deleteFeedbackItem(item.id)} className="close">
        <FaTimes color='purple' />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default FeedbackItem;
