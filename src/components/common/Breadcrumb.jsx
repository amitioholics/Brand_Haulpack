import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb__item">
          {index > 0 && <ChevronRight size={14} className="breadcrumb__sep" />}
          {item.to ? (
            <Link to={item.to} className="breadcrumb__link">{item.label}</Link>
          ) : (
            <span className="breadcrumb__current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
