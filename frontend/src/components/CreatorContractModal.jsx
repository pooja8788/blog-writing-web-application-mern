// components/CreatorContractModal.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const CreatorContractModal = ({ isOpen, onClose, onAgree }) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Creator Agreement</h2>
        
        <div className="text-sm text-gray-700 mb-4">
          <p className="mb-2">
            By becoming a creator, you agree to post original, authentic, and non-offensive content.
            You take full responsibility for any content you publish. Violation of these terms may lead to account suspension or legal action.
          </p>
          <ul className="list-disc ml-5">
            <li>No hate speech or discriminatory content</li>
            <li>No plagiarism or copied content</li>
            <li>All posts must follow community guidelines and legal norms</li>
            <li>You are responsible for ensuring your content is original and lawful</li>
          </ul>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-sm text-gray-800">
            I agree to the terms and conditions.
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (agreed) onAgree();
            }}
            disabled={!agreed}
            className={`px-4 py-2 rounded text-white ${
              agreed ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Agree & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

CreatorContractModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAgree: PropTypes.func.isRequired,
};

export default CreatorContractModal;
