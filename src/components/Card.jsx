import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card Component
 *
 * A reusable container component for displaying content in a boxed layout.
 * Supports different variants for visual hierarchy and customizable styling.
 *
 * Features:
 * - Multiple variants (default, bordered, elevated)
 * - Optional header and footer sections
 * - Responsive padding and spacing
 * - Dark mode support
 * - Smooth hover animations
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content of the card
 * @param {React.ReactNode} props.header - Optional header content
 * @param {React.ReactNode} props.footer - Optional footer content
 * @param {string} props.variant - Visual variant (default, bordered, elevated)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hoverable - Enable hover effect
 * @returns {JSX.Element} - Card component
 *
 * @example
 * <Card variant="elevated" header={<h2>Title</h2>}>
 *   <p>Card content goes here</p>
 * </Card>
 */
const Card = ({
  children,
  header = null,
  footer = null,
  variant = 'default',
  className = '',
  hoverable = false,
  ...rest
}) => {
  /**
   * Base classes applied to all cards
   * - Rounded corners for modern look
   * - Overflow hidden to contain children
   * - Smooth transition for hover effects
   */
  const baseClasses = 'rounded-lg overflow-hidden transition-all duration-300';

  /**
   * Variant-specific styles
   * - default: Simple background with subtle shadow
   * - bordered: Prominent border with no shadow
   * - elevated: Larger shadow for emphasis
   */
  const variantClasses = {
    default:
      'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg',
    bordered:
      'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
    elevated:
      'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
  };

  /**
   * Hover effect classes
   * Adds subtle lift effect on hover if enabled
   */
  const hoverClasses = hoverable
    ? 'hover:-translate-y-1 cursor-pointer'
    : '';

  /**
   * Combine all classes
   */
  const cardClasses = `${baseClasses} ${
    variantClasses[variant] || variantClasses.default
  } ${hoverClasses} ${className}`;

  return (
    <div className={cardClasses} {...rest}>
      {/* Card Header (optional) */}
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {header}
        </div>
      )}

      {/* Card Body (main content) */}
      <div className="px-6 py-4">{children}</div>

      {/* Card Footer (optional) */}
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          {footer}
        </div>
      )}
    </div>
  );
};

/**
 * PropTypes for type checking
 * Ensures components are used correctly and provides documentation
 */
Card.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'bordered', 'elevated']),
  className: PropTypes.string,
  hoverable: PropTypes.bool,
};

export default Card;
