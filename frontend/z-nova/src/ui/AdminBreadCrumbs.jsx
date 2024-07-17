import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiChevronRight } from 'react-icons/hi';

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;

  a {
    color: var(--color-grey-600);
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    border-radius: 0.3rem;
    transition: all 0.2s;

    &:hover {
      color: var(--color-brand-600);
      background-color: var(--color-grey-50);
    }

    &.active {
      background-color: var(--color-brand-600);
      color: white;
      font-weight: 500;
    }
  }
`;

const Separator = styled(HiChevronRight)`
  color: var(--color-grey-400);
  font-size: 1.4rem;
`;

export default function AdminBreadCrumbs({ items }) {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => (
        <span key={index}>
          <Link to={item.to} className={item.active ? 'active' : ''}>
            {item.label}
          </Link>
          {index < items.length - 1 && <Separator />}{' '}
          {/* Add separator between items */}
        </span>
      ))}
    </BreadcrumbContainer>
  );
}
