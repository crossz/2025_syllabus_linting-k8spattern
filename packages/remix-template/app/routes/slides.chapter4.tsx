import { ScrollableSlides } from "../slides/chapter4/ScrollableSlides";

export const meta = () => {
  return [
    { title: "Kubernetes Patterns - Chapter 4 Slides" },
    { name: "description", content: "Health Probe patterns in Kubernetes applications" },
  ];
};

export default function Chapter4Slides() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950">
      <div className="fixed top-4 left-4 z-10">
        <a href="/" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          ← 返回首页
        </a>
      </div>
      <ScrollableSlides />
    </div>
  );
}