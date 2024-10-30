import PropTypes from 'prop-types';

const SaveButton = ({ onSave }) => {
  return (
    <button
      onClick={onSave}
      className="w-full md:w-auto mb-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Save
    </button>
  );
};

SaveButton.propTypes = {
    onSave: PropTypes.func.isRequired,
};

export default SaveButton;
