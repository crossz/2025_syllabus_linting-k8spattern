import type { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  id?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted';
}

export function ContentSection({ title, children, id, variant = 'default' }: ContentSectionProps) {
  // Define background colors for each variant
  const getBackgroundClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'secondary':
        return 'bg-purple-50 dark:bg-purple-900/20';
      case 'accent':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'muted':
        return 'bg-gray-50 dark:bg-gray-800/30';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  // Define border colors for each variant
  const getBorderClass = () => {
    switch (variant) {
      case 'primary':
        return 'border-blue-200 dark:border-blue-800';
      case 'secondary':
        return 'border-purple-200 dark:border-purple-800';
      case 'accent':
        return 'border-green-200 dark:border-green-800';
      case 'muted':
        return 'border-gray-200 dark:border-gray-700';
      default:
        return 'border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <section id={id} className={`mb-12 rounded-lg p-6 ${getBackgroundClass()} ${getBorderClass()} border`}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
}