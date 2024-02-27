import Operations from '../../ui/Operations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function ServiceOperations() {
  return (
    <Operations>
      <Filter
        filterField="category"
        options={[
          { value: 'all', label: 'All' },
          { value: 'web-development', label: 'Web Development' },
          { value: 'app-development', label: 'App Development' },
          { value: 'cyber-security', label: 'Cyber Security' },
          { value: 'graphic-designing', label: 'Graphic Designing' },
        ]}
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
