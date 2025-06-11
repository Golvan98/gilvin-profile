// LoginModal.jsx
function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <p>This is a placeholder login modal.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
