// src/components/Card.jsx
export default function Card({ imgUrl, title, description }) {
  return (
    <div className="w-72 h-80 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="relative h-3/4">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
