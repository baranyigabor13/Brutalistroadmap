import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <ChevronRight size={20} className="text-gray-500 flex-shrink-0" />
          )}
          {index === items.length - 1 ? (
            <span className="bg-yellow-400 px-3 py-1 border-2 border-black">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:bg-yellow-400 px-3 py-1 border-2 border-black 
                       transition-colors duration-200 whitespace-nowrap"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;