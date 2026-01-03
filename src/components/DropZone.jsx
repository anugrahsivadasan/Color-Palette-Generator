const DropZone = ({ onSelect }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // 🔑 REQUIRED
    e.stopPropagation();
  };

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col items-center justify-center gap-2 p-6
                 border-2 border-dashed rounded-xl cursor-pointer
                 text-gray-500 hover:border-blue-500
                 transition"
    >
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => onSelect(e.target.files[0])}
      />

      <span className="text-sm">Click or drag image here</span>
    </label>
  );
};

export default DropZone;
