import { ScrollableSlides } from "~/slides/chapter789/ScrollableSlides";

export default function Chapter789Slides() {
  return (
    <div>
      <div className="fixed top-4 left-4 z-10">
        <a href="/" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          ← 返回首页
        </a>
      </div>
      <ScrollableSlides />
    </div>
  );
}