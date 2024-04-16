import Operations from '../../ui/Operations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function PostOperations() {
  return (
    <Operations>
      <Filter
        filterField="category"
        options={[
          { value: 'all', label: 'All' },
          { value: 'web-development11', label: 'Web Development' },
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
        ]}
      />
    </Operations>
  );
}

export default PostOperations;
