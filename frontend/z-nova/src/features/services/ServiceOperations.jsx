import Operations from '../../ui/Operations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import { useServiceCategories } from '../serviceCategories/useServiceCategories';
import { categoriesToOptions } from '../../utils/multiSelectTagUtils';

function ServiceOperations() {
  const { serviceCategories } = useServiceCategories();
  return (
    <Operations>
      <Filter
        filterField="category"
        options={categoriesToOptions(serviceCategories)}
      />

      <SortBy
        filterField="sort"
        options={[
          { value: 'createdAt-desc', label: 'Sort by date ( new first )' },
          { value: 'createdAt-asc', label: 'Sort by date ( old first )' },
          { value: 'price-asc', label: 'Sort by price ( low first )' },
          { value: 'price-desc', label: 'Sort by price ( high first )' },
          {
            value: 'ratingsAverage-asc',
            label: 'Sort by ratings ( low first )',
          },
          {
            value: 'ratingsAverage-desc',
            label: 'Sort by ratings ( high first )',
          },
          { value: 'duration-asc', label: 'Sort by duration ( low first )' },
          { value: 'duration-desc', label: 'Sort by duration ( high first )' },
        ]}
      />
    </Operations>
  );
}

export default ServiceOperations;
